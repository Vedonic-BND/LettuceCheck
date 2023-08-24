import CameraButton from "../assets/camera/cameraButton.svg";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

const TakeAPicture = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const camera = useRef(null);
  const router = useRouter();

  const resetCaptureImage = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

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
    <View className="flex flex-1 bg-tertiary">
      {previewVisible && capturedImage ? (
        <View className="absolute top-0 w-full h-[97vh] mt-[3vh]">
          <ImageBackground
            source={{ uri: capturedImage.uri }}
            className="flex flex-1"
          >
            <View className="absolute bottom-0 flex-1 w-full flex-row">
              <View className="flex flex-row flex-1 w-full p-[20px] justify-between mx-[20px]">
                <TouchableOpacity
                  onPress={resetCaptureImage}
                  className="w-[70] h-[70] items-center justify-center shadow"
                >
                  <AntDesign name="closecircle" size={50} color={"#BDD2B6"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/Home")}
                  className="w-[70] h-[70] items-center justify-center shadow"
                >
                  <AntDesign name="checkcircle" size={50} color={"#BDD2B6"} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <Camera
          className="absolute top-0 w-full h-[97vh] mt-[3vh]"
          ref={camera}
          type={type}
        >
          <View className="flex flex-1 w-full bg-transparent flex-row">
            <View className="absolute top-0 flex flex-row flex-1 w-full pt-3 pl-2 justify-between">
              <View>
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="w-[50] h-[50] flex flex-1 justify-center items-center"
                >
                  <AntDesign name="left" size={42} color={"#BDD2B6"} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="absolute bottom-0 flex flex-row flex-1 w-full p-[20px] justify-between">
              <View className="w-[110] h-[110] self-center flex flex-1 items-center">
                <TouchableOpacity
                  onPress={_takePhoto}
                  className="w-[70] h-[70] m-5"
                >
                  <CameraButton />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default TakeAPicture;
