import * as tf from '@tensorflow/tfjs';
const utils = require('./utils');

const imageToTensor = async (image, imagePreprocessor) => {
    /**
     * Input: HTMLImageElement (ideally square dims)
     * Output: tf.Tensor4D[1, 224, 224, 3] (RGB, floats range [0, 255])
     */
    let input = await tf.browser.fromPixelsAsync(image);
    input = input
        .resizeBilinear([224, 224])
        .cast('float32')
        .reshape([1, 224, 224, 3]);
    return imagePreprocessor(input);
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
        grad: async (image) => {
            /**
             * Input: HTMLImageElement of dimensions 224x224
             * Output: Array[6] of 224x224 canvas elements rendering saliency maps
             */
            let input = await imageToTensor(image, imagePreprocessor);
            let res = new Array(6);

            for (let i = 0; i < 6; i++) {
                console.log(model.summary());
                let lastConvLayerIndex = 0;

                const lastConvLayer = model.layers[lastConvLayerIndex];
                const lastConvLayerOutput = lastConvLayer.output

                const subModel1 = tf.model({
                inputs: model.inputs,
                outputs: lastConvLayerOutput
                });

                const subModel2Input: tf.SymbolicTensor = tf.input({
                      shape: lastConvLayerOutput.shape.slice(1)
                });
                lastConvLayerIndex++;
                let currentOutput: tf.SymbolicTensor = subModel2Input;

                while (lastConvLayerIndex < model.layers.length) {
                    currentOutput = model.layers[lastConvLayerIndex].apply(currentOutput);
                    lastConvLayerIndex++;
                }
                const subModel2 = tf.model({
                    inputs: subModel2Input,
                    outputs: currentOutput
                    });

                const convOutput2ClassOutput = (input: any) => subModel2.apply(input, { training: true }).gather([i], 1);
                const gradFunction = tf.grad(convOutput2ClassOutput);

                const lastConvLayerOutputValues = subModel1.apply(input);

                const gradValues = gradFunction(lastConvLayerOutputValues);

                // Calculate the weights of the feature maps
                const weights = tf.mean(gradValues, [0, 1, 2]);

                const weightedFeatures = lastConvLayerOutputValues.mul(weights);

                // apply ReLu to the weighted features
                var result: tf.Tensor<tensorflow.Rank> = weightedFeatures.relu();

                // result = result.div(result.max());
                console.log("hello");
                console.log(result.array());

                let colormap = require('colormap')
                let colors = colormap({
                  colormap: 'jet',
                  nshades: 10,
                  format: 'hex',
                  alpha: 1
                })


                // convert tensor to image
                const resTensor = tf.tensor(result.arraySync()[0]);
                const canvas = document.createElement('canvas');
                canvas.width = resTensor.width
                canvas.height = resTensor.height
                await tf.browser.toPixels(resTensor, canvas);
                const dataUrl = canvas.toDataURL();
                res[i] = dataUrl;
            }
            return res;
        }
    }
}

export { loadModel };
