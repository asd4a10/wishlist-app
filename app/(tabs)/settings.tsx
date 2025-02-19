import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SignOutButton } from "@/components/(auth)/SignOutButton";
import { useUser } from "@clerk/clerk-expo";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Link, useRouter } from "expo-router";

export default function SettingsScreen() {
	const { user } = useUser();
	const router = useRouter();

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Settings</Text>
			</View>

			<View style={styles.profileSection}>
				<View style={styles.profileInfo}>
					<IconSymbol name="person.circle.fill" size={60} color="#666" />
					<View style={styles.userInfo}>
						<Text style={styles.userName}>
							{user?.firstName} {user?.lastName}
						</Text>
						<Text style={styles.userEmail}>
							{user?.primaryEmailAddress?.emailAddress}
						</Text>
					</View>
				</View>
			</View>

			<View style={styles.settingsSection}>
				<TouchableOpacity style={styles.settingsItem}>
					<IconSymbol name="person.fill" size={24} color="#666" />
					<Text style={styles.settingsText}>Edit Profile</Text>
				</TouchableOpacity>

				<View style={styles.separator} />

				<TouchableOpacity style={styles.settingsItem}>
					<IconSymbol name="bell.fill" size={24} color="#666" />
					<Text style={styles.settingsText}>Notifications</Text>
				</TouchableOpacity>

				<View style={styles.separator} />

				<Link href="/(settings)/configuration" asChild>
					<TouchableOpacity style={styles.settingsItem}>
						<IconSymbol name="gearshape.fill" size={24} color="#666" />
						<Text style={styles.settingsText}>Configuration</Text>
					</TouchableOpacity>
				</Link>

				<View style={styles.separator} />

				<SignOutButton containerStyle={styles.settingsItem} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	header: {
		paddingTop: 60,
		paddingHorizontal: 20,
		marginBottom: 30,
	},
	title: {
		fontSize: 34,
		fontWeight: "bold",
		color: "white",
	},
	profileSection: {
		paddingHorizontal: 20,
		marginBottom: 30,
	},
	profileInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	userInfo: {
		flex: 1,
	},
	userName: {
		fontSize: 20,
		fontWeight: "600",
		color: "white",
		marginBottom: 4,
	},
	userEmail: {
		fontSize: 14,
		color: "#999",
	},
	settingsSection: {
		backgroundColor: "#111",
		borderRadius: 12,
		marginHorizontal: 20,
		padding: 8,
	},
	settingsItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		gap: 12,
	},
	settingsText: {
		fontSize: 16,
		color: "white",
	},
	separator: {
		height: 1,
		backgroundColor: "#333",
		marginHorizontal: 16,
	},
});
