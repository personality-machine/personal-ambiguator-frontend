import * as tf from '@tensorflow/tfjs';
 

const Gradient =
    async (imgUri) => {
        var img = new Image();
        img.src = imgUri;
        const model = await tf.loadLayersModel('no_randomcrop/model.json');
        var tensor = await tf.browser.fromPixelsAsync(img);
        tensor = tensor.slice([0,0,0], [224,224,3]).cast('float32').reshape([1,224,224,3]);
        // calculate gradient
        let f = x=> model.predict(x);
        let g = tf.grad(f);
        var saliency = g(tensor);

        return saliency;
    }


export default Gradient