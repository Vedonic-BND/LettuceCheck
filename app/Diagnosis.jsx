import React from "react";
import usePredict from "../constants/usePredict";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

const Diagnosis = () => {
  const image = useLocalSearchParams();
  const { prediction } = usePredict(image.uri);

  return (
    <View>
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
            <Text className="mx-auto">Not Healthy</Text>
          ) : (
            <Text className="mx-auto">Healthy</Text>
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
