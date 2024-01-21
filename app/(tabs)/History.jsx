import React, { useState, useEffect, useCallback } from "react";
import { Stack } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import db from "../../constants/database.js";
import useDate from "../../constants/useDate.js";

const History = () => {
  const [history, setHistory] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showImage, setShowImage] = useState(null);
  useEffect(() => {
    onRefresh();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const showSelected = (item) => {
    setShowDetails(true);
    setShowImage(item.image);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM history",
        [],
        (_, resultSet) => {
          // Handle the result set here
          const { rows } = resultSet;
          setHistory(rows._array);
          setRefreshing(false);
        },
        (_, error) => {
          console.error("Error fetching history:", error);
        }
      );
    });
  }, []);
  return (
    <>
      <SafeAreaView>
        <Stack.Screen options={{ title: "History" }} />
        <ScrollView
          className="m-2"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="p-2.5 rounded-md flex flex-row justify-around self-center w-full mb-2">
            <Text className="text-red-700 text-lg h-7 my-auto font-semibold">
              Datetime
            </Text>
            <Text className="text-red-700 text-lg h-7 my-auto font-semibold">
              Accuracy
            </Text>
            <Text className="text-red-700 text-lg h-7 my-auto font-semibold">
              Prediction
            </Text>
            <Text className="text-red-700 text-lg h-7 my-auto font-semibold">
              Image
            </Text>
          </View>
          {history.length > 0 ? (
            history.map((item, index) => {
              return (
                <View
                  className="border p-2.5 rounded-md flex flex-row justify-around self-center w-full mb-2"
                  key={index}
                >
                  <View className="flex my-auto">
                    <Text className="text-red-700 text-sm text-center">
                      {useDate(item.date).split(",")[0]}
                    </Text>
                    <Text className="text-red-700 text-sm text-center">
                      {useDate(item.date).split(",")[1]}
                    </Text>
                  </View>
                  <Text className="text-red-700 text-lg h-7 my-auto">
                    {parseFloat(item.accuracy * 100).toFixed(2)}%
                  </Text>
                  <Text className="text-red-700 text-lg h-7 my-auto">
                    {item.prediction}
                  </Text>
                  <TouchableOpacity onPress={() => showSelected(item)}>
                    <View className="rounded-md w-16 h-16 my-auto">
                      <Image
                        className="mx-auto rounded-md"
                        source={{ uri: item.image }}
                        style={{ width: 64, height: 64 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View className="mx-auto">
              <Text className="text-2xl">No History</Text>
            </View>
          )}
        </ScrollView>
        <Modal animationType="slide" transparent={true} visible={showDetails}>
          <View className="h-3/4 w-full bg-[#25292e] rounded-t-2xl absolute bottom-0">
            <View className="h-9 bg-[#464C55] rounded-t-xl px-5 items-center justify-between flex-row-reverse">
              <Pressable
                onPress={() => {
                  setShowDetails(false);
                }}
              >
                <Text className="text-[#FFFFFF] font-semibold">Close</Text>
              </Pressable>
            </View>
            <View className="h-full flex justify-center items-center rounded-b-xl px-8 pb-8">
              <Image
                className="rounded-md h-5/6 w-full"
                source={{ uri: showImage }}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default History;
