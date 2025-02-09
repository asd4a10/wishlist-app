import * as React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Platform,
	ImageBackground,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

const BG_IMAGE_URL =
	"https://external-preview.redd.it/ZT4ic2-4DzUDhPeiVyk7Br7HMfF0z6hxD8LCP7l4zVA.jpg?width=1080&crop=smart&auto=webp&s=72023798bdf1f54c823c1bc56ae6ec77cf33de3d";

export default function SignUpScreen() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();
	const [emailAddress, setEmailAddress] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [pendingVerification, setPendingVerification] = React.useState(false);
	const [code, setCode] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [error, setError] = React.useState("");

	const onSignUpPress = async () => {
		if (!isLoaded) return;
		setError("");

		try {
			await signUp.create({
				emailAddress,
				password,
			});
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
			setPendingVerification(true);
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "An error occurred");
		}
	};

	const onVerifyPress = async () => {
		if (!isLoaded) return;
		setError("");

		try {
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			});

			if (signUpAttempt.status === "complete") {
				await setActive({ session: signUpAttempt.createdSessionId });
				router.replace("/");
			}
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "Verification failed");
		}
	};

	if (pendingVerification) {
		return (
			<ImageBackground
				source={{ uri: BG_IMAGE_URL }}
				style={styles.backgroundImage}
			>
				<LinearGradient
					colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.9)"]}
					style={styles.gradient}
				>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={styles.container}
					>
						<View style={styles.formContainer}>
							<Text style={styles.title}>Verify your email</Text>
							<Text style={styles.subtitle}>
								Enter the verification code sent to your email
							</Text>

							<TextInput
								style={styles.input}
								value={code}
								placeholder="Enter verification code"
								placeholderTextColor="#666"
								onChangeText={setCode}
								keyboardType="number-pad"
								autoCapitalize="none"
							/>

							{error ? <Text style={styles.errorText}>{error}</Text> : null}

							<TouchableOpacity style={styles.button} onPress={onVerifyPress}>
								<Text style={styles.buttonText}>Verify Email</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</LinearGradient>
			</ImageBackground>
		);
	}

	return (
		<ImageBackground
			source={{ uri: BG_IMAGE_URL }}
			style={styles.backgroundImage}
		>
			<LinearGradient
				colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.9)"]}
				style={styles.gradient}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.container}
				>
					<View style={styles.formContainer}>
						<Text style={styles.title}>Create Account</Text>
						<Text style={styles.subtitle}>Sign up to get started</Text>

						<TextInput
							style={styles.input}
							value={emailAddress}
							placeholder="Email address"
							placeholderTextColor="#666"
							onChangeText={setEmailAddress}
							autoCapitalize="none"
							keyboardType="email-address"
						/>

						<View style={styles.passwordContainer}>
							<TextInput
								style={styles.passwordInput}
								value={password}
								placeholder="Password"
								placeholderTextColor="#666"
								secureTextEntry={!showPassword}
								onChangeText={setPassword}
							/>
							<TouchableOpacity
								style={styles.eyeIcon}
								onPress={() => setShowPassword(!showPassword)}
							>
								<MaterialIcons
									name={showPassword ? "visibility" : "visibility-off"}
									size={24}
									color="#666"
								/>
							</TouchableOpacity>
						</View>

						{error ? <Text style={styles.errorText}>{error}</Text> : null}

						<TouchableOpacity style={styles.button} onPress={onSignUpPress}>
							<Text style={styles.buttonText}>Sign Up</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.linkButton}
							onPress={() => router.push("/sign-in")}
						>
							<Text style={styles.linkText}>
								Already have an account? Sign in
							</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</LinearGradient>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: "100%",
	},
	gradient: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	formContainer: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		maxWidth: 500,
		width: "100%",
		alignSelf: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "white",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		marginBottom: 30,
	},
	input: {
		backgroundColor: "#111",
		borderRadius: 12,
		padding: 15,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: "#333",
		color: "white",
		fontSize: 16,
	},
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#111",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#333",
		marginBottom: 15,
	},
	passwordInput: {
		flex: 1,
		padding: 15,
		color: "white",
		fontSize: 16,
	},
	eyeIcon: {
		padding: 15,
	},
	button: {
		backgroundColor: "#00ff00",
		borderRadius: 12,
		padding: 15,
		alignItems: "center",
		marginTop: 10,
	},
	buttonText: {
		color: "black",
		fontSize: 16,
		fontWeight: "bold",
	},
	linkButton: {
		marginTop: 20,
		alignItems: "center",
	},
	linkText: {
		color: "#00ff00",
		fontSize: 16,
	},
	errorText: {
		color: "#ff4444",
		marginBottom: 10,
		fontSize: 14,
	},
});
