import "expo-router/entry";
import { Redirect } from "expo-router";

function Page() {
	return <Redirect href={"/(tabs)/Home"} />;
}

export default Page;
