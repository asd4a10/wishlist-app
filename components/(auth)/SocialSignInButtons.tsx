import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { IconSymbol } from "../ui/IconSymbol";
import { Text } from "react-native";

export function SocialSignInButtons() {
	const { startOAuthFlow: startGoogleFlow } = useOAuth({
		strategy: "oauth_google",
	});
	const { startOAuthFlow: startAppleFlow } = useOAuth({
		strategy: "oauth_apple",
	});

	const onGooglePress = async () => {
		try {
			const { createdSessionId, setActive } = await startGoogleFlow();
			if (createdSessionId && setActive) {
				await setActive({ session: createdSessionId });
			}
		} catch (err) {
			console.error("OAuth error:", err);
		}
	};

	const onApplePress = async () => {
		try {
			const { createdSessionId, setActive } = await startAppleFlow();
			if (createdSessionId && setActive) {
				await setActive({ session: createdSessionId });
			}
		} catch (err) {
			console.error("OAuth error:", err);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.orText}>or continue with</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.socialButton} onPress={onGooglePress}>
					<IconSymbol name="g.circle.fill" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.socialButton} onPress={onApplePress}>
					<IconSymbol name="apple.logo" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		gap: 16,
	},
	orText: {
		color: "#999",
		fontSize: 14,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 16,
	},
	socialButton: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#222",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#333",
	},
});
