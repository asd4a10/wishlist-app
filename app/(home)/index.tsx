import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { Link, Redirect, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { SocialSignInButtons } from "@/components/(auth)/SocialSignInButtons";

const BG_IMAGE_URL =
	// "https://w0.peakpx.com/wallpaper/294/128/HD-wallpaper-moon-night-stars-sky-full-moon.jpg";
	// "https://img.freepik.com/free-photo/beautiful-constellations-sky-full-stars_23-2149988813.jpg";
	"https://external-preview.redd.it/ZT4ic2-4DzUDhPeiVyk7Br7HMfF0z6hxD8LCP7l4zVA.jpg?width=1080&crop=smart&auto=webp&s=72023798bdf1f54c823c1bc56ae6ec77cf33de3d";
export default function HomeScreen() {
	return (
		<>
			<SignedIn>
				<Redirect href="/(tabs)" />
			</SignedIn>
			<SignedOut>
				<ImageBackground
					source={{ uri: BG_IMAGE_URL }}
					style={styles.container}
					resizeMode="cover"
					// blurRadius={1}
				>
					<LinearGradient
						colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
						style={styles.gradient}
					>
						<View style={styles.content}>
							<View style={styles.header}>
								<Text style={styles.title}>Wishify</Text>
								<Text style={styles.subtitle}>
									Track your dreams, achieve your goals
								</Text>
							</View>

							<View style={styles.buttonContainer}>
								<Link href="/(auth)/sign-in" asChild>
									<TouchableOpacity style={styles.signInButton}>
										<Text style={styles.signInText}>Sign In</Text>
									</TouchableOpacity>
								</Link>

								<Link href="/(auth)/sign-up" asChild>
									<TouchableOpacity style={styles.signUpButton}>
										<Text style={styles.signUpText}>Create Account</Text>
									</TouchableOpacity>
								</Link>

								<SocialSignInButtons />
							</View>

							<Text style={styles.terms}>
								By continuing, you agree to our Terms of Service and Privacy
								Policy
							</Text>
						</View>
					</LinearGradient>
				</ImageBackground>
			</SignedOut>
		</>
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
	content: {
		flex: 1,
		padding: 24,
		marginTop: "30%",
		justifyContent: "space-between",
	},
	header: {
		marginTop: "30%",
		alignItems: "center",
	},
	title: {
		fontSize: 48,
		fontWeight: "bold",
		color: "white",
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 18,
		color: "#E0E0E0",
		textAlign: "center",
		lineHeight: 24,
	},
	buttonContainer: {
		gap: 16,
		marginBottom: 24,
	},
	signInButton: {
		backgroundColor: "white",
		paddingVertical: 16,
		borderRadius: 30,
		alignItems: "center",
	},
	signInText: {
		color: "black",
		fontSize: 16,
		fontWeight: "600",
	},
	signUpButton: {
		backgroundColor: "transparent",
		paddingVertical: 16,
		borderRadius: 30,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "white",
	},
	signUpText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	terms: {
		color: "#999",
		textAlign: "center",
		fontSize: 12,
		marginBottom: 20,
	},
});
