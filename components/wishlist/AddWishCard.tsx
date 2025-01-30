import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface AddWishCardProps {
	onPress: () => void;
}

export default function AddWishCard({ onPress }: AddWishCardProps) {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			{/* <MaterialIcons name="add-circle-outline" size={32} color="#666" /> */}
			<Text style={styles.text}>Tap add your first wish</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		minWidth: "100%",
		backgroundColor: "#111",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#333",
		borderStyle: "dashed",
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		minHeight: 150,
	},
	text: {
		color: "#666",
		fontSize: 24,
		fontWeight: "500",
	},
});
