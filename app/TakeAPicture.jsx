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
		<View style={{ flex: 1 }}>
			<Camera
				style={{ flex: 1 }}
				type={type}
				ref={ref}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: "transparent",
						flexDirection: "row",
					}}
				>
					{/* take */}
					<TouchableOpacity
						style={{
							alignItems: "center",
							position: "absolute",
							bottom: "10%",
							left: "40.5%",
							borderRadius: 50,
							width: 80,
							height: 80,
							backgroundColor: "red",
						}}
						onPress={_takePhoto}
					>
						<Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
							{" "}
						</Text>
					</TouchableOpacity>

					{/* flip */}
					<TouchableOpacity
						style={{
							alignSelf: "flex-end",
							alignItems: "center",
							backgroundColor: "red",
						}}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					>
						<Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
							{" "}
							Flip{" "}
						</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
};

export default TakeAPicture;
