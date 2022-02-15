import * as tf from '@tensorflow/tfjs';
 

const Predict =
    async (imgUri) => {
        var img = new Image;
        img.src = imgUri;
        const model = await tf.loadLayersModel('../test/model.json');
        var tensor = await tf.browser.fromPixelsAsync(img);
        model.predict(tensor).print();
    }

export default Predict