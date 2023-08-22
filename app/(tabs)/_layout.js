import { Stack, Tabs } from "expo-router";

const TabArr = [
	{
		route: "/(tabs)/About",
		label: "About",
		bgColor: "#798777",
		headTint: "#F8EDE3",
	},
	{
		route: "/(tabs)/Home",
		label: "Home",
		bgColor: "#798777",
		headTint: "#F8EDE3",
	},
	{
		route: "/(tabs)/History",
		label: "History",
		bgColor: "#798777",
		headTint: "#F8EDE3",
	},
];

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
								headerTintColor: item.headTint,
								tabBarShowLabel: false,
							}}
						/>
					);
				})}
			</Tabs>
		</>
	);
};
