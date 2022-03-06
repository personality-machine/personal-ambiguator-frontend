import * as tf from '@tensorflow/tfjs';
import { applyColorMap } from './utils';

const imageToTensor = async (image, imagePreprocessor = null) => {
    /**
     * Input: HTMLImageElement (ideally square dims)
     * Output: tf.Tensor4D[1, 224, 224, 3] (RGB, floats range [0, 255])
     */
    let input = await tf.browser.fromPixelsAsync(image);
    
    return tf.tidy(() => {
        let result = input
            .resizeBilinear([224, 224])
            .cast('float32')
            .reshape([1, 224, 224, 3]);
        tf.dispose(input);
        return imagePreprocessor == null ? result: imagePreprocessor(result);
    });
}

const constructGradCamModels = (model) => tf.tidy(() => {
    let input1 = tf.input({ shape: [224,224,3] });
    let output1 = model.layers[1].apply(input1);
    
    let input2 = tf.input({ shape: output1.shape.slice(1) });
    let output2 = model.layers[2].apply(input2);

    return [
        tf.model({inputs: input1, outputs: output1}),
        tf.model({inputs: input2, outputs: output2}),
    ];
});

const loadModel = async (modelJsonPath, imagePreprocessor) => {
    console.log("Load model");
    const model = await tf.loadLayersModel(modelJsonPath);
    console.log("Model loaded");

    const [model_prefix, model_suffix] = tf.tidy(() => constructGradCamModels(model));
    window.tf = tf;

    return {
        predict: async (image) => {
            /**
             * Input: HTMLImageElement of dimensions 224x224
             * Output: Array[6] of floats
             */
            let input = await imageToTensor(image, imagePreprocessor);
            let result = model.predict(input);
            let arr = result.array();
            tf.dispose([input, result]);
            return arr;
        },
        grad: async (image, overlayFactor = 2.0) => {
            /**
             * Input: HTMLImageElement of dimensions 224x224
             * Output: Array[6] of 224x224 canvas elements rendering saliency maps
             */
            let input = await imageToTensor(image);
            let res = new Array(6);
            
            for (let i = 0; i < 6; i++) {
                res[i] = tf.tidy(() => {
                    let last_conv_layer_output = model_prefix.apply(input);
                    let grads = tf.grad((x) => model_suffix.apply(x).gather([i], 1))(last_conv_layer_output);

                    // Pool the gradient values within each filter of the last convolutional
                    // layer, resulting in a tensor of shape [numFilters].
                    const pooledGradValues = tf.mean(grads, [0, 1, 2]);
                    // Scale the convolutional layer's output by the pooled gradients, using
                    // broadcasting.
                    const scaledConvOutputValues =
                        last_conv_layer_output.mul(pooledGradValues);

                    // Create heat map by averaging and collapsing over all filters.
                    let heatMap = scaledConvOutputValues.mean(-1);

                    // Discard negative values from the heat map and normalize it to the [0, 1]
                    // interval.
                    heatMap = heatMap.relu();
                    heatMap = heatMap.div(heatMap.max()).expandDims(-1);

                    // Up-sample the heat map to the size of the input image.
                    heatMap = tf.image.resizeBilinear(heatMap, [input.shape[1], input.shape[2]]);

                    // Apply an RGB colormap on the heatMap. This step is necessary because
                    // the heatMap is a 1-channel (grayscale) image. It needs to be converted
                    // into a color (RGB) one through this function call.
                    heatMap = applyColorMap(heatMap);

                    // To form the final output, overlay the color heat map on the input image.
                    heatMap = heatMap.mul(overlayFactor).add(input.div(255));
                    console.log(heatMap);
                    return heatMap.div(heatMap.max()).mul(255);
                });
            }
            tf.dispose(input);
            return res;
        }
    }
}

export { loadModel };
