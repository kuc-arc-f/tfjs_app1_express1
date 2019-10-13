// LibTrain
const tf = require('@tensorflow/tfjs-node');
const fetch = require('node-fetch');

/**
 * constructor
 */
var LibTrain = function()
{
//    this.aa = aa;
}
/******************************** 
*
*********************************/
LibTrain.prototype.getData  = async function () {
    const url  = 'https://raw.githubusercontent.com/kuc-arc-f/tfjs_start2/master/dat/outout_7.json';

    const carsDataReq = await fetch( url );  
    const carsData = await carsDataReq.json();  
//console.log(carsData)
    const cleaned = carsData.map(car => ({
        hnum: car.hnum,
        no: car.no,
    }))

    return cleaned;
}
/******************************** 
*
*********************************/
LibTrain.prototype.convertToTensor = function(data) {
    return tf.tidy(() => {
    //	tf.util.shuffle(data);	
        const inputs = data.map(d => d.no)   //X- axis
        const labels = data.map(d => d.hnum ); //Y-axis
    //	console.log(labels)
        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

        //  Normalize the data to the range 0 - 1 using min-max scaling
        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();  
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();

        const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

        return {
            inputs: normalizedInputs,
            labels: normalizedLabels,
            // Return the min/max bounds so we can use them later.
            inputMax,
            inputMin,
            labelMax,
            labelMin,
        }
    });  
}
/******************************** 
*
*********************************/
LibTrain.prototype.createModel = function()
{
	const model = tf.sequential(); 
    model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
    model.add(tf.layers.dense({units: 1, useBias: true}));
    return model;
}
/******************************** 
*
*********************************/
LibTrain.prototype.trainModel = async function(model, inputs, labels, tensorData,
	input_size, chart_dats) {
   const {inputMax, inputMin, labelMin, labelMax} = tensorData
//console.log( input_size );
   // Prepare the model for training.  
   const column_len = input_size
   model.compile({
	   optimizer: tf.train.adam(),
	   loss: tf.losses.meanSquaredError,
	   metrics: ['mse'],
   });
   const batchSize = column_len -5;
   const epochs = 100;
   //model.fit(inputs,labels,{epochs: epochs });
   return await model.fit(inputs, labels, {
	   batchSize,
	   epochs,
   });    

}
/******************************** 
*
*********************************/
LibTrain.prototype.testModel = function(model, inputData, tensorData, input_size) {
    const column_len = input_size
    const {inputMax, inputMin, labelMin, labelMax} = tensorData
    return tf.tidy(() => {
        const xs = tf.linspace(0, 1, column_len );      
        const preds = model.predict(xs.reshape([column_len , 1]));      

        const unNormXs = xs
            .mul(inputMax.sub(inputMin))
            .add(inputMin);
        const unNormPreds = preds
        .mul(labelMax.sub(labelMin))
        .add(labelMin);

        // Un-normalize the data
        return [unNormXs.dataSync(), unNormPreds.dataSync()];
    });
}
module.exports = LibTrain
