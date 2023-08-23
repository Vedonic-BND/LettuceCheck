import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Text, TouchableOpacity, View } from "react-native";
import CameraPreview from "../components/CameraPreview";

const TakeAPicture = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  _takePhoto = async () => {
    const photo = await camera.current.takePictureAsync();
    if (photo) {
      console.log(photo.uri);
      setPreviewVisible(true);
      setCapturedImage(photo);
    }
  };

  return (
    <View className="flex flex-1">
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} />
      ) : (
        <Camera style={{ flex: 1 }} ref={camera} type={type}>
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                flex: 1,
                width: "100%",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={_takePhoto}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                  }}
                />
              </View>
            </View>
          </View>
        </Camera>
      )}

      {/* <Camera className="flex flex-1" type={type} ref={camera}>
        <View className="flex flex-1 bg-transparent flex-row"> */}
      {/* take */}
      {/* <TouchableOpacity
            className="w-[80px] h-[80px] bg-tertiary items-center absolute bottom-[10%] left-[40.5%] rounded-full"
            onPress={_takePhoto}
          >
            <Text className="mb-2.5 text-[#000] text-[18]"> </Text>
          </TouchableOpacity> */}

      {/* flip */}
      {/* <TouchableOpacity
            className="self-end items-center bg-tertiary"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text className="mb-2.5 text-accent text-[18]"> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera> */}
    </View>
  );
};

export default TakeAPicture;
