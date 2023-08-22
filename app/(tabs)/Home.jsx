import React from "react";
import { Link, Stack, router } from "expo-router";
import { Button, Text, View } from "react-native";

const Home = () => {
	return (
		<>
			<View>
				<Stack.Screen options={{ title: "Home" }} />
				<View>
					<Text className="text-[99px]">Hello World</Text>
					<Text>This is the first page of your app.</Text>
					<Link href="/TakeAPicture">Take a Picture</Link>
					<Link href="/Upload">Upload</Link>
				</View>
			</View>
		</>
	);
};

export default Home;
