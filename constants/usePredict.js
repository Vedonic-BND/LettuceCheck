// import * as FileSystem from "expo-file-system";
// import * as ImagePicker from "expo-image-picker";
// import * as tf from "@tensorflow/tfjs";
// import React, { useEffect, useRef, useState } from "react";
// import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
// import { useRouter } from "expo-router";

// import {
//   fetch,
//   decodeJpeg,
//   bundleResourceIO,
// } from "@tensorflow/tfjs-react-native";

// const usePredict = (image) => {
//   return new Promise((resolve, reject) => {
//     const [prediction, setPrediction] = useState(null);
//     const modelJson = require("../assets/lettuce_detection_model/model.json");
//     const modelWeights = require("../assets/lettuce_detection_model/weights.bin");
//     const metadataURL = require("../assets/lettuce_detection_model/metadata.json");

//     const init = async () => {
//       // console.log("this is image uri", image);
//       await tf.ready();
//       if (image != null) {
//         await imageClassification(image);
//       }
//     };

//     async function imageClassification(imageURI) {
//       const model = await tf.loadLayersModel(
//         bundleResourceIO(modelJson, modelWeights)
//       );

//       const imageBase64 = await FileSystem.readAsStringAsync(imageURI, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       const imgBuffer = tf.util.encodeString(imageBase64, "base64").buffer;
//       const raw = new Uint8Array(imgBuffer);
//       const decodedImage = decodeJpeg(raw);

//       const preprocessedImage = tf.image.resizeBilinear(
//         decodedImage,
//         [224, 224]
//       );
//       // console.log(preprocessedImage);

//       const final = tf.expandDims(preprocessedImage, 0);
//       // console.log(final);
//       const prediction = model.predict(final);
//       // console.log(prediction);

//       const predictionData = await prediction.data();

//       // console.log("Prediction Result:", predictionData);
//       setPrediction(predictionData);
//     }

//     useEffect(() => {
//       init();
//     }, []);

//     resolve({ prediction });
//   });
// };

// export default usePredict;
import * as FileSystem from "expo-file-system";
import * as tf from "@tensorflow/tfjs";
import { decodeJpeg, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { useState, useEffect } from "react";

const usePredict = (image) => {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await tf.ready();
        if (image != null) {
          await imageClassification(image);
        }
      } catch (error) {
        console.error("Error initializing TensorFlow:", error);
      }
    };

    const imageClassification = async (imageURI) => {
      try {
        const modelJson = require("../assets/lettuce_detection_model/model.json");
        const modelWeights = require("../assets/lettuce_detection_model/weights.bin");

        const model = await tf.loadLayersModel(
          bundleResourceIO(modelJson, modelWeights)
        );

        const imageBase64 = await FileSystem.readAsStringAsync(imageURI, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const imgBuffer = tf.util.encodeString(imageBase64, "base64").buffer;
        const raw = new Uint8Array(imgBuffer);
        const decodedImage = decodeJpeg(raw);

        const preprocessedImage = tf.image.resizeBilinear(
          decodedImage,
          [224, 224]
        );

        const final = tf.expandDims(preprocessedImage, 0);

        const prediction = model.predict(final);
        const predictionData = await prediction.data();

        // Set the prediction state
        setPrediction(predictionData);
      } catch (error) {
        console.error("Error during image classification:", error);
      }
    };

    init();
  }, [image]);

  // Return the prediction state
  return prediction;
};

export default usePredict;
