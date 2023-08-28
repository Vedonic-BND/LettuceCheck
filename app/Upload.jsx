import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { Link, useRouter } from "expo-router";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";

const Upload = () => {
	const router = useRouter();
	const [image, setImage] = useState(null);

	const init = async () => {
		await pickImage();
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			const manipResult = await manipulateAsync(
				result.assets[0].uri,
				[{ rotate: 360 }],
				{ compress: 1, format: SaveFormat.JPEG }
			);
			console.log("manipResult", manipResult.uri);
			setImage(manipResult.uri);
		} else {
			navigateHome();
		}
	};

	const navigateHome = () => {
		router.push("/(tabs)/Home");
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<View className="flex flex-1 bg-tertiary">
			<View className="absolute top-0 w-full h-full">
				{image && (
					<ImageBackground
						source={{ uri: image }}
						className="flex flex-1"
					>
						<View className="absolute bottom-0 flex-1 w-full flex-row">
							<View className="flex flex-row flex-1 w-full p-[20px] justify-between mx-[20px]">
								<TouchableOpacity
									onPress={pickImage}
									className="w-[70] h-[70] items-center justify-center shadow"
								>
									<AntDesign
										name="closecircle"
										size={50}
										color={"#BDD2B6"}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										router.push({
											pathname: "/Diagnosis",
											params: { uri: image },
										})
									}
									className="w-[70] h-[70] items-center justify-center shadow"
								>
									<AntDesign
										name="checkcircle"
										size={50}
										color={"#BDD2B6"}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</ImageBackground>
				)}
			</View>
		</View>
	);
};

export default Upload;
