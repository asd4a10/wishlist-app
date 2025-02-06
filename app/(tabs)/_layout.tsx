import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RouteGuard } from "../../components/RouteGuard";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<RouteGuard>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: "#fff",
					tabBarInactiveTintColor: "#666",
					headerShown: false,
					tabBarButton: HapticTab,
					tabBarBackground: TabBarBackground,
					tabBarStyle: Platform.select({
						ios: {
							backgroundColor: "rgba(0,0,0,0.8)",
							position: "absolute",
							borderTopWidth: 0,
						},
						default: {
							backgroundColor: "#111",
							borderTopWidth: 0,
						},
					}),
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Wishlist",
						tabBarIcon: ({ color }) => (
							<IconSymbol size={28} name="star.fill" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="explore"
					options={{
						title: "Settings",
						tabBarIcon: ({ color }) => (
							<IconSymbol size={28} name="gearshape.fill" color={color} />
						),
					}}
				/>
			</Tabs>
		</RouteGuard>
	);
}
