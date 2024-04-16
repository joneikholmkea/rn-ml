import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

let model=null
const App = () => {
  useEffect(() => {
    async function loadModels() {
      await tf.ready(); // Wait for TensorFlow.js to be ready
      console.log('TensorFlow.js is ready with backend:', tf.getBackend());
      model = await tf.loadLayersModel('https://joneikholm.dk/ml/model.json');
      console.log("model loaded successfully: " + model)
    }

    loadModels();
  }, []);
  
  // Example of using the model for inference
  async function predict() {
    const inputData = tf.tensor2d([1,1], [1, 2]);
    const prediction = model.predict(inputData);
    console.log('Prediction:', prediction.arraySync());
  }

  return (
    <View style={styles.container}>
      <Text>TensorFlow.js ready: {tf.getBackend() ? 'Yes' : 'No'}</Text>
    <Pressable onPress={predict}>
      <Text>Predict</Text>
    </Pressable>
    </View>
  );
};

export default App;
