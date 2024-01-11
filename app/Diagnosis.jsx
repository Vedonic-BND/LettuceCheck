import React from "react";
import usePredict from "../constants/usePredict";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Diagnosis = () => {
  const image = useLocalSearchParams();
  const { prediction } = usePredict(image.uri);
  const transaction = prediction ? {
    image: image.uri,
    prediction: prediction[0] > prediction[1] ? "Not Healthy" : "Healthy",
    accuracy: prediction[0] > prediction[1] ? prediction[0] : prediction[1],
    date: new Date().toLocaleDateString(),
  } : ""
  const today = new Date(Date.now())
  AsyncStorage.setItem(`transaction-${today.toISOString()}`, JSON.stringify(transaction)).then(() => {
    console.log("saved")
  });
  return (
    <View className="mt-48">
      {image && (
        <Image
          className="mx-auto rounded-md"
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}
      <View style={{ marginTop: 20 }}>
        {/* Labels will be populated here */}
        {prediction ? (
          prediction[0] > prediction[1] ? (
            <Text className="mx-auto font-bold text-2xl">Not Healthy</Text>
          ) : (
            <Text className="mx-auto font-bold text-2xl">Healthy</Text>
          )
        ) : (
          <Image
            className="mx-auto"
            source={require("../assets/loading/load.gif")}
            style={{
              width: 200,
              height: 200,
              marginVertical: 20,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Diagnosis;
