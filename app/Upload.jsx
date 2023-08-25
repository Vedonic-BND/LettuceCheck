import * as FileSystem from "expo-file-system";
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Button, Image, Text, View } from "react-native";

import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";

const Upload = () => {
  const local = useLocalSearchParams();
  const labelContainerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const modelJson = require("../assets/lettuce_detection_model/model.json");
  const modelWeights = require("../assets/lettuce_detection_model/weights.bin");
  const metadataURL = require("../assets/lettuce_detection_model/metadata.json");
  const init = async () => {
    await tf.ready();
  };

  const pickImage = async () => {
    console.log("imageURI", local.uri);
    setSelectedImage(local.uri);
    await imageClassification(local.uri);
  };

  async function imageClassification(imageURI) {
    const model = await tf.loadLayersModel(
      bundleResourceIO(modelJson, modelWeights)
    );

    const imageBase64 = await FileSystem.readAsStringAsync(imageURI, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const imgBuffer = tf.util.encodeString(imageBase64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);
    const decodedImage = decodeJpeg(raw);

    const preprocessedImage = tf.image.resizeBilinear(decodedImage, [224, 224]);
    console.log(preprocessedImage);

    const final = tf.expandDims(preprocessedImage, 0);
    console.log(final);
    const prediction = model.predict(final);
    console.log(prediction);

    const predictionData = await prediction.data();

    console.log("Prediction Result:", predictionData);
    setAccuracy(predictionData);

    // const predict = model.predict(tf.expandDims(preprocessedImage, 0));
    // console.log(predict);

    // // const tensorImage = tf.expandDims(preprocessedImage, 0);

    // const classificationResult = await model.predict(preprocessedImage);
    // console.log("classificationResult: ", classificationResult);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}
      <View ref={labelContainerRef} style={{ marginTop: 20 }}>
        {/* Labels will be populated here */}
        {accuracy ? (
          accuracy[0] > accuracy[1] ? (
            <Text>Healthy</Text>
          ) : (
            <Text>Not Healthy</Text>
          )
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </View>
  );
};

export default Upload;
