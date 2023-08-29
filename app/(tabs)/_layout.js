import { Stack, Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TabArr = [
  {
    route: "/(tabs)/About",
    label: "About",
    bgColor: "#798777",
    headTint: "#F8EDE3",
    icon: "information",
  },
  {
    route: "/(tabs)/Home",
    label: "Home",
    bgColor: "#798777",
    headTint: "#F8EDE3",
    icon: "home",
  },
  {
    route: "/(tabs)/History",
    label: "History",
    bgColor: "#798777",
    headTint: "#F8EDE3",
    icon: "history",
  },
];

function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
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
                headerTintColor: item.headTint,
                tabBarIcon: makeIconRender(item.icon),
                tabBarActiveTintColor: "#52694f",
                // tabBarShowLabel: false,
              }}
            />
          );
        })}
      </Tabs>
    </>
  );
};
