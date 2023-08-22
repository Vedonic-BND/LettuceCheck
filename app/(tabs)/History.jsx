import React from "react";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

const History = () => {
	return (
		<>
			<Stack.Screen options={{ title: "History" }} />
			<View>
				<Text className="text-red-700 text-lg">history</Text>
			</View>
		</>
	);
};

export default History;
