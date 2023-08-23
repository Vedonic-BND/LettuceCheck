import React, { useEffect, useState } from "react";
import { Link, Stack, router } from "expo-router";
import { Text, View, Pressable } from "react-native";
import axios from "axios";

const Home = () => {
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
            className="text-[#FFF] mx-auto rounded-md bg-[#000] px-4 py-[10px] mb-2 mt-5"
          >
            Take a Picture
          </Link>

          <Link
            href="/Upload"
            className="text-[#FFF] mx-auto rounded-md bg-[#000] px-10 py-[10px]"
          >
            Upload
          </Link>
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
