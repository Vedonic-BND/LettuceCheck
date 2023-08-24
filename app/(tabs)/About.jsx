import React from "react";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

const About = () => {
  return (
    <>
      <Stack.Screen options={{ title: "About" }} />
      <View>
        <View className="w-11/12 mx-auto">
          <Text className="my-5 text-[16px]">
            Lettuce Check is a plant disease identifier that utilizes machine
            learning to detect Downy Mildew on Lettuce.
          </Text>
          <Text>Research Members:</Text>
          <Text>King Arielle Catimbang (POGI with a 🫰 with no 💵)</Text>
        </View>
      </View>
    </>
  );
};

export default About;
