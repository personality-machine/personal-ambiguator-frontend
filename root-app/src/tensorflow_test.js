import * as tf from '@tensorflow/tfjs';

 

const Predict =
    async (imgUri) => {
        var img = new Image();
        img.src = imgUri;
        const model = await tf.loadLayersModel('no_randomcrop/model.json');
        var tensor = await tf.browser.fromPixelsAsync(img);
        tensor = tensor.slice([0,0,0], [224,224,3]).cast('float32');
        return model.predict(tensor.reshape([1,224,224,3])).predict;
    }

export default Predict
