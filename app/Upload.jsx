import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Button, Image, Platform, View, Text } from "react-native";
import { usePathname, useLocalSearchParams } from "expo-router";

const Upload = () => {
  const local = useLocalSearchParams();

  return (
    <View className="flex flex-1 items-center justify-center">
      {local && (
        <Image source={{ uri: local.uri }} className="w-[300] h-[300]" />
      )}
    </View>
  );
};

export default Upload;
