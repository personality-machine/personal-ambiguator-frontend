import * as tf from '@tensorflow/tfjs';

const resnetPreprocessor = (imgTensor) => {
    /**
     * Input: tf.Tensor4D[1, 224, 224, 3] (RGB, floats range [0, 255])
     * Output: tf.Tensor4D[1, 224, 224, 3] (BGR, floats range [0, 255],
     * zero-centred wrt ImageNet dataset)
     * 
     * see https://github.com/keras-team/keras/blob/d8fcb9d4d4dad45080ecfdd575483653028f8eda/keras/applications/imagenet_utils.py#L168
     * in `caffe' mode
     */

    // RGB to BGR
    imgTensor = imgTensor.reverse(-1);

    // zero-centre wrt ImageNet
    const mean = tf.tensor1d([103.939, 116.779, 123.68]);
    return imgTensor.sub(mean);
}

export { resnetPreprocessor };