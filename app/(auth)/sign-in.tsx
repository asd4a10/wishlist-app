import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";

const BG_IMAGE_URL =
	"https://external-preview.redd.it/ZT4ic2-4DzUDhPeiVyk7Br7HMfF0z6hxD8LCP7l4zVA.jpg?width=1080&crop=smart&auto=webp&s=72023798bdf1f54c823c1bc56ae6ec77cf33de3d";

export default function SignInScreen() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onSignInPress = async () => {
		if (!emailAddress || !password || !signIn) {
			setError("Please fill in all fields");
			return;
		}
		try {
			const result = await signIn.create({
				identifier: emailAddress,
				password,
			});
			if (result.createdSessionId) {
				await setActive({ session: result.createdSessionId });
			}
		} catch (err: any) {
			setError(err.errors[0].message);
		}
	};

	return (
		<ImageBackground
			source={{ uri: BG_IMAGE_URL }}
			style={styles.container}
			resizeMode="cover"
			// blurRadius={2}
		>
			<LinearGradient
				colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
				style={styles.gradient}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.keyboardView}
				>
					<View style={styles.content}>
						<View style={styles.header}>
							<Text style={styles.title}>Welcome Back</Text>
							<Text style={styles.subtitle}>Sign in to continue</Text>
						</View>

						<View style={styles.form}>
							<View style={styles.inputContainer}>
								<Text style={styles.label}>Email</Text>
								<TextInput
									style={styles.input}
									autoCapitalize="none"
									autoComplete="email"
									keyboardType="email-address"
									value={emailAddress}
									placeholder="Enter your email"
									placeholderTextColor="#666"
									onChangeText={setEmailAddress}
								/>
							</View>

							<View style={styles.inputContainer}>
								<Text style={styles.label}>Password</Text>
								<TextInput
									style={styles.input}
									secureTextEntry
									value={password}
									placeholder="Enter your password"
									placeholderTextColor="#666"
									onChangeText={setPassword}
								/>
							</View>

							{error && <Text style={styles.errorText}>{error}</Text>}

							<TouchableOpacity
								style={[styles.button, !isLoaded && styles.buttonDisabled]}
								onPress={onSignInPress}
								disabled={!isLoaded}
							>
								<Text style={styles.buttonText}>
									{isLoaded ? "Sign In" : "Signing in..."}
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.footer}>
							<Text style={styles.footerText}>Don't have an account?</Text>
							<Link href="/(auth)/sign-up" asChild>
								<TouchableOpacity>
									<Text style={styles.footerLink}>Create Account</Text>
								</TouchableOpacity>
							</Link>
						</View>
					</View>
				</KeyboardAvoidingView>
			</LinearGradient>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	gradient: {
		flex: 1,
	},
	keyboardView: {
		flex: 1,
	},
	content: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
	},
	header: {
		marginTop: "20%",
		marginBottom: 32,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "white",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#999",
	},
	form: {
		gap: 20,
	},
	inputContainer: {
		gap: 8,
	},
	label: {
		color: "#999",
		fontSize: 14,
		marginLeft: 4,
	},
	input: {
		backgroundColor: "#111",
		borderRadius: 12,
		padding: 16,
		color: "white",
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#333",
	},
	button: {
		backgroundColor: "white",
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 8,
	},
	buttonDisabled: {
		opacity: 0.7,
	},
	buttonText: {
		color: "black",
		fontSize: 16,
		fontWeight: "600",
	},
	errorText: {
		color: "#ff6b6b",
		fontSize: 14,
		textAlign: "center",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 8,
		marginTop: 24,
	},
	footerText: {
		color: "#999",
		fontSize: 14,
	},
	footerLink: {
		color: "white",
		fontSize: 14,
		fontWeight: "600",
	},
});
