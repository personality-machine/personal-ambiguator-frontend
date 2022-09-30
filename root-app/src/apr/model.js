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
        let processed = imagePreprocessor == null ? result: imagePreprocessor(result);
        return processed.transpose([0, 3, 1, 2]);
    });
}


const loadModel = async (modelJsonPath, imagePreprocessor) => {
    console.log("Load model");
    const model = await tf.loadGraphModel(modelJsonPath);
    console.log("Model loaded");

    window.tf = tf;

    return {
        predict: async (image) => {
            /**
             * Input: HTMLImageElement of dimensions 224x224
             * Output: Array[5] of floats
             */
            let input = await imageToTensor(image, imagePreprocessor);
            let result = model.predict(input);
            let arr = result.array();
            tf.dispose([input, result]);
            return arr;
        }
    }
}

export { loadModel };
