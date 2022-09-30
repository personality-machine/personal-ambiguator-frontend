import * as tf from '@tensorflow/tfjs';


const resnetPreprocessor = (imgTensor) => {
    /**
     * Input: tf.Tensor4D[1, 224, 224, 3] (RGB, floats range [0, 255])
     * Output: tf.Tensor4D[1, 224, 224, 3] (RGB, floats range [0, 1],
     * zero-centred wrt ImageNet dataset)
     */


    // zero-centre wrt ImageNet
    const mean = tf.tensor1d([0.485, 0.456, 0.406]);
    const std = tf.tensor1d([0.229, 0.224, 0.225]);
    return imgTensor.div(255).sub(mean).div(std);
}

export { resnetPreprocessor };
