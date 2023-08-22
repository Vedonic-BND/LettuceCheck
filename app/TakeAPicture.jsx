import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Text, TouchableOpacity, View } from "react-native";

const TakeAPicture = () => {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const ref = useRef(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	_takePhoto = async () => {
		const photo = await ref.current.takePictureAsync();
		console.debug(photo);
	};

	return (
		<View className="flex flex-1">
			<Camera
				className="flex flex-1"
				type={type}
				ref={ref}
			>
				<View className="flex flex-1 bg-transparent flex-row">
					{/* take */}
					<TouchableOpacity
						className="w-[80px] h-[80px] bg-tertiary items-center absolute bottom-[10%] left-[40.5%] rounded-full"
						onPress={_takePhoto}
					>
						<Text className="mb-2.5 text-[#000] text-[18]"> </Text>
					</TouchableOpacity>

					{/* flip */}
					<TouchableOpacity
						className="self-end items-center bg-tertiary"
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					>
						<Text className="mb-2.5 text-accent text-[18]"> Flip </Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
};

export default TakeAPicture;
