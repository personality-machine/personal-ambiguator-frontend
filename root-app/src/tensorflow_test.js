import * as tf from '@tensorflow/tfjs';
 

const predict = (faces) => 
    async (dispatch) => {
        const model = await tf.loadLayersModel('../test/model.json');
        model.predict(faces).print();
}