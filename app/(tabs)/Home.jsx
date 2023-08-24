import React, { useEffect, useState } from "react";
import { Link, Stack, router } from "expo-router";
import { Text, View, Pressable } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";

const Home = () => {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState();
  const [forecast, setForecast] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: "http://api.weatherapi.com/v1/current.json",
      params: {
        key: "739e4e0ba0334aa6b05185804232208",
        q: "Baguio City",
      },
    }).then((res) => {
      setWeatherData(res.data.current);
    });
  }, []);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      router.push({
        pathname: "/Upload",
        params: { uri: "%4025" },
      });
    }
  };

  return (
    <>
      <View>
        <Stack.Screen options={{ title: "Home" }} />
        <View>
          <View className="flex flex-row flex-wrap gap-5 justify-center my-1">
            <Text className="text-[16px] border basis-2/5 p-4 rounded-md">
              Temperature: {weatherData ? weatherData.feelslike_c : "N/A"} C
            </Text>
            <Text className="text-[16px] border basis-2/5 p-4 rounded-md">
              Humidity: {weatherData ? weatherData.humidity : "N/A"} %
            </Text>
            <Text className="text-[16px] border basis-2/5 p-4 rounded-md">
              Windspeed: {weatherData ? weatherData.wind_kph : "N/A"} kph
            </Text>
            <Text className="text-[16px] border basis-2/5 p-4 rounded-md">
              Chance of Rain: {weatherData ? weatherData.wind_kph : "N/A"} %
            </Text>
          </View>
          <Link
            href="/TakeAPicture"
            className="text-[#FFF] mx-auto rounded-md bg-[#798777] px-4 py-[10px] mb-2 mt-5"
          >
            Take a Picture
          </Link>

          {/* <Link
            href="/Upload"
            className="text-[#FFF] mx-auto rounded-md bg-[#798777] px-10 py-[10px]"
          >
            Upload
          </Link> */}
          <Pressable
            className="mx-auto rounded-md bg-[#798777] px-[17px] py-[10px]"
            onPress={pickImage}
          >
            <Text className="text-[#FFF]">Upload Image</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Home;

// const styles = StyleSheet.create({
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: "black",
//   },
//   text: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: "bold",
//     letterSpacing: 0.25,
//     color: "white",
//   },
// });
