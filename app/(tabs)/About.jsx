import React from "react";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

const About = () => {
	return (
		<>
			<Stack.Screen options={{ title: "About" }} />
			<View>
				<Text>About</Text>
			</View>
		</>
	);
};

export default About;
