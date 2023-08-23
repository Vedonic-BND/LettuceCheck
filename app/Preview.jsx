import { View, Text, Image } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";

const Preview = () => {
  const params = useGlobalSearchParams();
  console.log(params);
  return (
    <View className="p-5 border">
      <Text>Preview</Text>
      <Image source={{ uri: params.uri, width: 200, height: 200 }} />
      <Image
        source={{ uri: "https://picsum.photos/200", width: 200, height: 200 }}
      />
    </View>
  );
};

export default Preview;
