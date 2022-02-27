import * as tf from '@tensorflow/tfjs';
 

const Gradient =
    async (imgUri) => {
        var img = new Image();
        img.src = imgUri;
        const model = await tf.loadLayersModel('mobilenet/model.json');
        var tensor = await tf.browser.fromPixelsAsync(img);
        tensor = tensor.slice([0,0,0], [224,224,3]).cast('float32').reshape([1,224,224,3]);


        let res = new Array(6);
        for (var i = 0; i < 6; i++){
            // calculate gradient
            let f = x=> model.predict(x).slice([0,i],[1,1]);
            let g = tf.grad(f);
            var result = g(tensor);

            //normalize data
            const max = result.max();
            const min = result.min();
            result = result.sub(min).div(max.sub(min));
            
            //convert tensor to image
            const resTensor = tf.tensor(result.arraySync()[0]);
            const canvas = document.createElement('canvas');
            canvas.width = resTensor.width
            canvas.height = resTensor.height
            await tf.browser.toPixels(resTensor, canvas);
            const dataUrl = canvas.toDataURL();
            res[i] = dataUrl;

        }
        // return result.array();
        return res;
    }


export default Gradient