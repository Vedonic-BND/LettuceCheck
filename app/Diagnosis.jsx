import React from "react";
import usePredict from "../constants/usePredict";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

const Diagnosis = () => {
	const image = useLocalSearchParams();
	const { prediction } = usePredict(image.uri);

	return (
		<View>
			<Text>Diagnosis</Text>
			{image && (
				<Image
					source={{ uri: image.uri }}
					style={{ width: 200, height: 200, marginVertical: 20 }}
				/>
			)}
			<View style={{ marginTop: 20 }}>
				{/* Labels will be populated here */}
				{prediction ? (
					prediction[0] > prediction[1] ? (
						<Text>Not Healthy</Text>
					) : (
						<Text>Healthy</Text>
					)
				) : (
					<Text>Loading...</Text>
				)}
			</View>
		</View>
	);
};

export default Diagnosis;
