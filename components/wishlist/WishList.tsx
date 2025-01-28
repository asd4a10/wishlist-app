import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Linking,
} from "react-native";
import { Wish } from "@/types/wish";

interface WishListProps {
	wishes: Wish[];
}

export function WishList({ wishes }: WishListProps) {
	return (
		<View style={styles.grid}>
			{wishes.map((wish) => (
				<View key={wish.id} style={styles.card}>
					{wish.imageUrl && (
						<Image source={{ uri: wish.imageUrl }} style={styles.image} />
					)}
					<Text style={styles.title}>{wish.title}</Text>
					{wish.description && (
						<Text style={styles.description}>{wish.description}</Text>
					)}
					{wish.price && <Text style={styles.price}>${wish.price}</Text>}
					{wish.targetDate && (
						<Text style={styles.date}>
							Target: {new Date(wish.targetDate).toLocaleDateString()}
						</Text>
					)}
					{wish.productUrl.length > 0 && (
						<TouchableOpacity
							onPress={() => Linking.openURL(wish.productUrl[0]!)}
						>
							<Text style={styles.link}>View Item</Text>
						</TouchableOpacity>
					)}
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 10,
		gap: 10,
	},
	card: {
		flex: 1,
		minWidth: "45%",
		borderWidth: 1,
		borderColor: "#e5e5e5",
		borderRadius: 8,
		padding: 10,
	},
	image: {
		width: "100%",
		height: 150,
		borderRadius: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginTop: 8,
	},
	description: {
		color: "#666",
		marginTop: 4,
	},
	price: {
		fontWeight: "500",
		marginTop: 8,
	},
	date: {
		color: "#666",
		marginTop: 8,
		fontSize: 14,
	},
	link: {
		color: "#007AFF",
		marginTop: 8,
	},
});
