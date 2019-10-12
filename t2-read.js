//
// model保存サンプル
// https://www.tensorflow.org/js/guide/save_load
//
const tf = require('@tensorflow/tfjs-node');

//
async function test() {

   //load
   const load_model = await tf.loadLayersModel('file://test-model/model.json');
//   load_model.predict(tf.tensor2d([10], [1, 1])).print();
   var v= load_model.predict(tf.tensor2d([10 ],[1,1])); 
   console.log("v= " + v.dataSync() );

}

/******************************** 
* main
*********************************/
test();

