import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Currency, setCurrency } from "@/store/settingsSlice";
import type { RootState } from "@/store/store";

export default function ConfigurationScreen() {
	const router = useRouter();
	const dispatch = useDispatch();
	const selectedCurrency = useSelector(
		(state: RootState) => state.settings.currency
	);

	const handleCurrencyPress = (currency: Currency) => {
		dispatch(setCurrency(currency));
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => router.back()}
					style={styles.backButton}
				>
					<IconSymbol name="chevron.left" size={24} color="white" />
					<Text style={styles.backText}>Settings</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Configuration</Text>
			</View>

			<View style={styles.settingsSection}>
				<Text style={styles.settingsSectionTitle}>Currency</Text>
				<TouchableOpacity
					style={styles.settingsItem}
					onPress={() => handleCurrencyPress("USD")}
				>
					<IconSymbol name="dollarsign.circle" size={24} color="white" />
					<Text style={styles.settingsText}>USD</Text>
					{selectedCurrency === "USD" && (
						<IconSymbol name="checkmark" size={20} color="white" />
					)}
				</TouchableOpacity>

				<View style={styles.separator} />

				<TouchableOpacity
					style={styles.settingsItem}
					onPress={() => handleCurrencyPress("GBP")}
				>
					<IconSymbol name="sterlingsign.circle" size={24} color="white" />
					<Text style={styles.settingsText}>GBP</Text>
					{selectedCurrency === "GBP" && (
						<IconSymbol name="checkmark" size={20} color="white" />
					)}
				</TouchableOpacity>

				<View style={styles.separator} />

				<TouchableOpacity
					style={styles.settingsItem}
					onPress={() => handleCurrencyPress("KZT")}
				>
					<IconSymbol name="tengesign.circle" size={24} color="white" />
					<Text style={styles.settingsText}>KZT</Text>
					{selectedCurrency === "KZT" && (
						<IconSymbol name="checkmark" size={20} color="white" />
					)}
				</TouchableOpacity>
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
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	backText: {
		color: "white",
		fontSize: 16,
	},
	title: {
		fontSize: 34,
		fontWeight: "bold",
		color: "white",
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
		flex: 1,
	},
	settingsSectionTitle: {
		fontSize: 20,
		color: "white",
		marginBottom: 10,
		marginLeft: 16,
	},
	currentValue: {
		fontSize: 16,
		color: "#666",
	},
	separator: {
		height: 1,
		backgroundColor: "#333",
		marginHorizontal: 16,
	},
});
