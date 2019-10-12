//
// model保存サンプル
// https://www.tensorflow.org/js/guide/save_load
//
const tf = require('@tensorflow/tfjs-node');

//
async function test() {

   const model = tf.sequential();
   model.add(tf.layers.dense({units: 1, inputShape: [1]}));
   
   model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
   
   // トレーニング用の合成データを生成します。
   const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
   const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
   
   // データを使用してモデルをトレーニングします。
   await model.fit(xs, ys);
   model.predict(tf.tensor2d([5], [1, 1])).print();
   model_name = "file://my-model"
   await model.save(model_name);

   //load
   const load_model = await tf.loadLayersModel(model_name + '/model.json');
//   const load_model = await tf.loadLayersModel('file://test-model/model.json');
   load_model.predict(tf.tensor2d([10], [1, 1])).print();
}

/******************************** 
* main
*********************************/
test();

