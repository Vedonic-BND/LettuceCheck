import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TabArr = [
	{
		route: "/(tabs)/About",
		label: "About",
		bgColor: "#BDD2B6",
		headTint: "#F8EDE3",
		icon: "information",
	},
	{
		route: "/(tabs)/Home",
		label: "Home",
		bgColor: "#BDD2B6",
		headTint: "#F8EDE3",
		icon: "home",
	},
	{
		route: "/(tabs)/History",
		label: "History",
		bgColor: "#BDD2B6",
		headTint: "#F8EDE3",
		icon: "history",
	},
];

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#798777",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadpwRadius: 3.5,
		elevation: 5,
	},
});

function makeIconRender(name) {
	return ({ color, size }) => (
		<MaterialCommunityIcons
			name={name}
			color={color}
			size={size}
		/>
	);
}

export default () => {
	return (
		<>
			<Tabs>
				{TabArr.map((item, index) => {
					return (
						<Tabs.Screen
							key={index}
							name={item.label}
							options={{
								// This tab will no longer show up in the tab bar.
								href: item.route,
								headerStyle: { backgroundColor: item.bgColor },
								headerTintColor: "#BDD2B6",
								// headerTintColor: item.headTint,
								// headerTitleStyle: {
								// 	fontWeight: "bold",
								// 	fontSize: 32,
								// },
								tabBarActiveTintColor: "#52694f",
								tabBarShowLabel: false,
								tabBarStyle: {
									position: "absolute",
									bottom: 25,
									right: 20,
									left: 20,
									elevation: 0,
									height: 90,
									borderRadius: 15,
									backgroundColor: "#BDD2B6",
									...styles.shadow,
								},
								tabBarIcon: ({ size, focused }) => (
									<View>
										<View>
											{makeIconRender(item.icon)({
												color: focused ? "#52694f" : "#F8EDE3",
												size,
											})}
										</View>
										<Text style={{ color: focused ? "#52694f" : "#F8EDE3" }}>
											{item.label}
										</Text>
									</View>
								),
							}}
						/>
					);
				})}
			</Tabs>
		</>
	);
};
