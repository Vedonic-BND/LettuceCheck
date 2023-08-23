import { Stack } from "expo-router";

export default () => {
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
						presentation: "modal",
						headerStyle: { backgroundColor: "#798777" },
						headerTintColor: "#F8EDE3",
					}}
				/>
			</Stack>
		</>
	);
};
