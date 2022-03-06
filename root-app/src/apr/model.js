import * as tf from '@tensorflow/tfjs';
import { applyColorMap } from './utils';

const imageToTensor = async (image, imagePreprocessor = null) => {
    /**
     * Input: HTMLImageElement (ideally square dims)
     * Output: tf.Tensor4D[1, 224, 224, 3] (RGB, floats range [0, 255])
     */
    let input = await tf.browser.fromPixelsAsync(image);
    input = input
        .resizeBilinear([224, 224])
        .cast('float32')
        .reshape([1, 224, 224, 3]);
    
    return imagePreprocessor == null ? input: imagePreprocessor(input);
}

const loadModel = async (modelJsonPath, imagePreprocessor) => {
    console.log("Load model");
    const model = await tf.loadLayersModel(modelJsonPath);
    console.log("Model loaded");
    return {
        predict: async (image) => {
            /**
             * Input: HTMLImageElement of dimensions 224x224
             * Output: Array[6] of floats
             */
            let input = await imageToTensor(image, imagePreprocessor);
            return model.predict(input).array();
        },
        grad: async (image, overlayFactor = 2.0) => {
            /**
             * Input: HTMLImageElement of dimensions 224x224
             * Output: Array[6] of 224x224 canvas elements rendering saliency maps
             */
            let input = await imageToTensor(image);
            let res = new Array(6);

            // https://github.com/tensorflow/tfjs-examples/blob/master/visualize-convnet/cam.js#L49

            // Try to locate the last conv layer of the model.
            // let layerIndex = model.layers[1].length - 1;
            let layerIndex = 153;
            console.log(model.layers[1]);
            while (layerIndex >= 0) {
                console.log(model.layers[1].getLayer(null, layerIndex).getClassName());
                if (model.layers[1].getLayer(null, layerIndex).getClassName().startsWith('Conv')) {
                    break;
                }
                layerIndex--;
            }
            tf.util.assert(
                layerIndex >= 0, `Failed to find a convolutional layer in model`);

            const lastConvLayer = model.layers[1].getLayer(null, layerIndex);
            console.log(
                `Located last convolutional layer of the model at ` +
                `index ${layerIndex}: layer type = ${lastConvLayer.getClassName()}; ` +
                `layer name = ${lastConvLayer.name}`);

            for (let i = 0; i < 6; i++) {

                const lastConvLayerOutput = lastConvLayer.output;
                const subModel1 =
                    tf.model({ inputs: model.inputs, outputs: lastConvLayerOutput });

                const newInput = tf.input({ shape: lastConvLayerOutput.shape.slice(1) });
                layerIndex++;
                let y = newInput;
                while (layerIndex < model.layers[1].length) {
                    y = model.layers[1].getLayer(null, layerIndex++).apply(y);
                }
                const subModel2 = tf.model({ inputs: newInput, outputs: y });

                res[i] = tf.tidy(() => {
                    const convOutput2ClassOutput = (input) =>
                        subModel2.apply(input, { training: true }).gather([i], 1);
                    const gradFunction = tf.grad(convOutput2ClassOutput);

                    // Calculate the values of the last conv layer's output.
                    const lastConvLayerOutputValues = subModel1.apply(input);

                    const gradValues = gradFunction(lastConvLayerOutputValues);

                    // Pool the gradient values within each filter of the last convolutional
                    // layer, resulting in a tensor of shape [numFilters].
                    const pooledGradValues = tf.mean(gradValues, [0, 1, 2]);
                    // Scale the convlutional layer's output by the pooled gradients, using
                    // broadcasting.
                    const scaledConvOutputValues =
                        lastConvLayerOutputValues.mul(pooledGradValues);

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
                    return heatMap.div(heatMap.max()).mul(255);
                });
            }

            return res;
        }
    }
}

export { loadModel };
