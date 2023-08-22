import { Stack, Tabs } from "expo-router";

export default () => {
	return (
		<>
			<Tabs>
				<Tabs.Screen
					name="About"
					options={{
						// This tab will no longer show up in the tab bar.
						href: "/(tabs)/About",
						headerStyle: { backgroundColor: "#798777" },
						headerTintColor: "#F8EDE3",
					}}
				/>
				<Tabs.Screen
					name="Home"
					options={{
						// This tab will no longer show up in the tab bar.
						href: "/(tabs)/Home",
						headerStyle: { backgroundColor: "#798777" },
						headerTintColor: "#F8EDE3",
					}}
				/>
				<Tabs.Screen
					name="History"
					options={{
						// This tab will no longer show up in the tab bar.
						href: "/(tabs)/History",
						headerStyle: { backgroundColor: "#798777" },
						headerTintColor: "#F8EDE3",
					}}
				/>
			</Tabs>
		</>
	);
};
