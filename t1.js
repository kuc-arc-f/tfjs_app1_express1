//

//const tf = require('@tensorflow/tfjs');
const tf = require('@tensorflow/tfjs-node');

// Define a model for linear regression.
// 線形回帰のモデルを定義します。
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Prepare the model for training: Specify the loss and the optimizer.
// トレーニングのためのモデルを準備する：損失とオプティマイザを指定します。
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training.
// トレーニング用の合成データを生成します。
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data.
// データを使用してモデルをトレーニングします。
model.fit(xs, ys).then(() => {
   // Use the model to do inference on a data point the model hasn't seen before:
   // モデルが以前に見たことのないデータポイントの推論を行うためにモデルを使用する
   model.predict(tf.tensor2d([5], [1, 1])).print();
});

