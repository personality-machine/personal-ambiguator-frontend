import * as tf from '@tensorflow/tfjs';
 

const Predict =
    async (imgUri) => {
        var img = new Image();
        img.src = imgUri;
        console.log("Load model");
        const model = await tf.loadLayersModel('no_randomcrop/model.json');
        var tensor = await tf.browser.fromPixelsAsync(img);
        tensor = tensor.slice([0,0,0], [224,224,3]).cast('float32').reshape([1,224,224,3]);

        var result = model.predict(tensor);
        return result.array();
    }


export default Predict
