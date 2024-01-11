import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, Text, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const History = () => {
	const [history, setHistory] = useState(null)

	function refresh() {
		AsyncStorage.getAllKeys().then((res) => {
			AsyncStorage.multiGet(res).then((res) => {
				setHistory(res)
				res.map((item, index) => {
					item[1] = JSON.parse(item[1])
					setHistory(history => [...history, item])
				})
			})
		})
	}
	useEffect(() => {
		refresh()
	},[])
	return (
		<>
			<Stack.Screen options={{ title: "History" }} />
			<ScrollView className="m-2">
				{history && history.map((item, index) => {
					console.log(item[1].accuracy)
					return (
						<View className="border p-2.5 rounded-md flex flex-row justify-around self-center w-full mb-2">
							<Text className="text-red-700 text-lg h-7 my-auto">{item[1].date}</Text>
							<Text className="text-red-700 text-lg h-7 my-auto">{parseFloat(item[1].accuracy *100).toFixed(2)}%</Text>
							<View className="rounded-md w-16 h-16 my-auto">
								<Image
								className="mx-auto rounded-md"
								source={{ uri: item[1].image }}
								style={{ width: 64, height: 64 }}
								/>
							</View>
						</View>
					)
				})}
			</ScrollView>
		</>
	);
};

export default History;
