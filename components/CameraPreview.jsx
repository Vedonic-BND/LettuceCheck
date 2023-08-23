import { View, ImageBackground } from "react-native";
import React from "react";

const CameraPreview = (photo) => {
  //   console.log("sdsfds", photo);
  //   const cUri = photo.photo.uri;
  //   console.log(cUri);
  //   const uri = photo.uri.slice(7);
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.photo.uri }}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

export default CameraPreview;
