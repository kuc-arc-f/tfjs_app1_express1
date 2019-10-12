//
const tf = require('@tensorflow/tfjs-node');
var LibTrain = require('./include/LibTrain');
var LibTrainData = require('./include/LibTrainData');
var LibConst = require('./include/LibConst');

//
console.log('Hello TensorFlow, t3');

/******************************** 
* train > model-save
*********************************/
async function run_train() {
    const tr = new LibTrain( )
    const dTrain = new LibTrainData( )
    const appConst = new LibConst( )
//    console.log(appConst.model_name )
//return;
    const model = tr.createModel();  
    const data = await tr.getData();
    var chart_dats = dTrain.convert_chart_arr(data)
    console.log(chart_dats.lbl.length )
    const tensorData = tr.convertToTensor(data);
    const {inputs, labels} = tensorData;
    // Train the model  
    console.log('Training-start');
    await tr.trainModel(model, inputs, labels,
            tensorData, chart_dats.lbl.length
            ,chart_dats  );
    console.log('#fit-complete');    
       //pred
    const [xs, preds] = tr.testModel(model, data, tensorData, 
                    chart_dats.lbl.length);
console.log( preds );
    await model.save(appConst.model_name );

}
/******************************** 
* main
*********************************/
run_train()
