import { AntDesign } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default () => {
	const router = useRouter();

	return (
		<>
			<Stack
				screenOptions={{
					headerStyle: { backgroundColor: "#798777" },
					headerTintColor: "#F8EDE3",
				}}
			>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="TakeAPicture"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Upload"
					options={{
						headerStyle: { backgroundColor: "#798777" },
						headerTintColor: "#F8EDE3",
					}}
				/>
				<Stack.Screen
					name="Diagnosis"
					options={{
						headerStyle: { backgroundColor: "#798777" },
						headerTintColor: "#F8EDE3",
						headerLeft: () => (
							<TouchableOpacity
								onPress={() => router.push("/(tabs)/Home")}
								className="ml-[-20] p-2 bg-transparent"
							>
								<AntDesign
									name="left"
									size={24}
									color={"#F8EDE3"}
								/>
							</TouchableOpacity>
						),
					}}
				/>
			</Stack>
		</>
	);
};
