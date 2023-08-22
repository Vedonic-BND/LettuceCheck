import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Button, Image, Platform, View } from "react-native";

const Upload = () => {
	const [image, setImage] = useState(null);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View className="flex flex-1 items-center justify-center">
			<Button
				title="Pick an image from camera roll"
				onPress={pickImage}
			/>
			{image && (
				<Image
					source={{ uri: image }}
					className="w-[200] h-[200]"
				/>
			)}
		</View>
	);
};

export default Upload;
