import * as tf from '@tensorflow/tfjs';
 

const Gradient =
    async (imgUri, pNum) => {
        console.assert(pNum >=0 && pNum < 6);
        var img = new Image();
        img.src = imgUri;
        const model = await tf.loadLayersModel('no_randomcrop/model.json');
        var tensor = await tf.browser.fromPixelsAsync(img);
        tensor = tensor.slice([0,0,0], [224,224,3]).cast('float32').reshape([1,224,224,3]);

        // calculate gradient
        let f = x=> model.predict(x).slice([0,pNum],[1,1]);
        let g = tf.grad(f);
        var result = g(tensor);

        //normalize data
        const max = result.max();
        const min = result.min();
        result = result.sub(min).div(max.sub(min));

        return result.array();
    }


export default Gradient