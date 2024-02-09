import React from "react";
import TopFacade from "../../assets/top_facade/top_facade.svg";
import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

const About = () => {
	return (
		<>
			<Stack.Screen options={{ title: "About" }} />
			<View className="w-full h-full bg-accent">
				<TopFacade />
				<View className="w-full h-[40vh]">
					<ScrollView className="w-11/12 mx-auto">
						<Text className="mt-5 mb-2 text-[17px]">
							"Lettuce Check" is a specialized plant disease identifier designed
							to assess the health of lettuce leaves, particularly focusing on
							detecting Downy Mildew, a common disease that affects lettuce
							crops. The primary function of Lettuce Check is to determine
							whether a lettuce leaf is healthy or if it shows signs of
							infection by Downy Mildew.
						</Text>
						<Text className="my-2 text-[17px]">
							The App utilizes machine learning algorithms to analyze images of
							lettuce leaves, identifying characteristic patterns and symptoms
							associated with Downy Mildew infection. By comparing these
							patterns against a trained dataset, Lettuce Check can provide
							accurate assessments of lettuce leaf health, indicating whether
							they are free from infection or potentially affected by Downy
							Mildew.
						</Text>
						<Text className="my-2 text-[17px]">
							It's important to note that Lettuce Check is specialized in
							detecting Downy Mildew and may not be suitable for diagnosing
							other diseases or issues affecting lettuce crops. Its focus on a
							specific disease enables it to provide precise and reliable
							results in identifying Downy Mildew infections, aiding farmers and
							growers in timely intervention and management of affected crops.
						</Text>
						<Text className="mt-5 text-[18px]">Research Members:</Text>
						<Text className="text-[18px]">King Arielle Catimbang</Text>
					</ScrollView>
				</View>
			</View>
		</>
	);
};

export default About;
