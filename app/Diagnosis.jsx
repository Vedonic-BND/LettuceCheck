import React, { useEffect, useState } from "react";
import usePredict from "../constants/usePredict";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View, ActivityIndicator } from "react-native";
import db from "../constants/database.js";

const Diagnosis = () => {
  const image = useLocalSearchParams();
  const [prediction, setPrediction] = useState([]);
  const fetchPrediction = usePredict(image.uri);

  useEffect(() => {
    if (fetchPrediction !== null) {
      setPrediction(fetchPrediction);
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO history (date, image, accuracy, prediction) VALUES (?, ?, ?, ?);",
          [
            Date.now(),
            image.uri,
            fetchPrediction[0] > fetchPrediction[1]
              ? fetchPrediction[0]
              : fetchPrediction[1],
            prediction[0] > prediction[1] ? "Not Healthy" : "Healthy",
          ],
          (_, resultSet) => {
            console.log("Item inserted:", resultSet);
          },
          (_, error) => {
            console.error("Error inserting item:", error);
          }
        );
      });
    }
  }, [image.uri, fetchPrediction]);

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
        {prediction.length > 0 ? (
          prediction[0] > prediction[1] ? (
            <Text className="mx-auto font-semibold text-lg">Not Healthy</Text>
          ) : (
            <Text className="mx-auto font-semibold text-lg">Healthy</Text>
          )
        ) : (
          <Text className="mx-auto">
            <ActivityIndicator size="large" color="#0073e6" />
          </Text>
        )}
      </View>
    </View>
  );
};

export default Diagnosis;
