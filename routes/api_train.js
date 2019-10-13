var express = require('express');
var router = express.Router();

const tf = require('@tensorflow/tfjs-node');
var LibTrain = require('../include/LibTrain');
var LibTrainData = require('../include/LibTrainData');
var LibConst = require('../include/LibConst');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource-1234');
});
/******************************** 
* 
*********************************/
router.get('/index', async function(req, res) {
    console.log('Hello TensorFlow, index');
    const tr = new LibTrain( )
    const dTrain = new LibTrainData( )
    const appConst = new LibConst( )
    //
    const data = await tr.getData();
    var chart_dats = dTrain.convert_chart_arr(data)
    const tensorData = tr.convertToTensor(data);
    
    const model = await tf.loadLayersModel(appConst.model_name + '/model.json');
    //pred
    const [xs, preds] = tr.testModel(model, data, tensorData, 
    chart_dats.lbl.length);
    console.log('dat.len=' + data.length )
    var pred_dats = dTrain.convert_predArr(data, preds)
//console.log( pred_dats );    
    //out
   var param = {"docs": pred_dats };
   res.json(param);

});
/******************************** 
* 
*********************************/
router.get('/chart_items', async function(req, res) {
    console.log('Hello TensorFlow, t3-read');
    const tr = new LibTrain( )
    const dTrain = new LibTrainData( )
    const appConst = new LibConst( )
    //
    const data = await tr.getData();
    var chart_dats = dTrain.convert_chart_arr(data)
    console.log(chart_dats.lbl.length )
    const tensorData = tr.convertToTensor(data);
    
    const model = await tf.loadLayersModel(appConst.model_name + '/model.json');
    //pred
    const [xs, preds] = tr.testModel(model, data, tensorData, 
    chart_dats.lbl.length);
//console.log( preds );    
    //out
    var items = []
    preds.forEach( function (item) {
        items.push(item  );
    });
    var arr ={
        'pred' : items,
        'chart_dats' : chart_dats,
    }
    var param = {"docs": arr };
    res.json(param);
});

module.exports = router;
