import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
export function RouteGuard({ children }: { children: React.ReactNode }) {
	const { isSignedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isSignedIn) {
			router.replace("/sign-in");
		}
	}, [isSignedIn]);

	if (!isSignedIn) {
		return null;
	}

	return <View style={{ flex: 1 }}>{children}</View>;
}
