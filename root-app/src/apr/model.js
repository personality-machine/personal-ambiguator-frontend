import * as tf from '@tensorflow/tfjs';

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
                // calculate gradient
                let grad_wrt_i = tf.grad(x => model.predict(x).slice([0, i], [1, 1]));
                var result = grad_wrt_i(input);

                // normalise data
                const max = result.max();
                const min = result.min();
                result = result.sub(min).div(max.sub(min));

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