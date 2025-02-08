import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";

interface SignOutButtonProps {
	containerStyle?: ViewStyle;
}

export function SignOutButton({ containerStyle }: SignOutButtonProps) {
	const { signOut } = useAuth();

	const onSignOutPress = async () => {
		try {
			await signOut();
			// Redirect to home page instead of sign-in
			router.replace("/(home)");
		} catch (err) {
			console.error("Error signing out:", err);
		}
	};

	return (
		<TouchableOpacity
			onPress={onSignOutPress}
			style={[styles.container, containerStyle]}
		>
			<IconSymbol
				name="rectangle.portrait.and.arrow.right"
				size={24}
				color="#ff4444"
			/>
			<ThemedText style={styles.text}>Sign Out</ThemedText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	text: {
		color: "#ff4444",
		fontSize: 16,
	},
});
