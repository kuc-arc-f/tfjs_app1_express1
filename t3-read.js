//
const tf = require('@tensorflow/tfjs-node');
var LibTrain = require('./include/LibTrain');
var LibTrainData = require('./include/LibTrainData');
var LibConst = require('./include/LibConst');

//
console.log('Hello TensorFlow, t3-read');

 /******************************** 
 *
 *********************************/
async function test99() {
    const appConst = new LibConst( )
    const load_model = await tf.loadLayersModel(appConst.model_name + '/model.json');
    var v= load_model.predict(tf.tensor2d([5 ],[1,1])); 
    console.log("v= " + v.dataSync() );
 }

 /******************************** 
 *
 *********************************/
async function test() {
    const tr = new LibTrain( )
    const dTrain = new LibTrainData( )
    const appConst = new LibConst( )
    //
    const data = await tr.getData();
    var chart_dats = dTrain.convert_chart_arr(data)
    console.log(chart_dats.lbl.length )
    const tensorData = tr.convertToTensor(data);
    
    const model = await tf.loadLayersModel(appConst.model_name + '/model.json');
    var v= model.predict(tf.tensor2d([5 ],[1,1])); 
    //pred
    const [xs, preds] = tr.testModel(model, data, tensorData, 
    chart_dats.lbl.length);
console.log( preds );
 }
 
 /******************************** 
 * main
 *********************************/
 test();
 