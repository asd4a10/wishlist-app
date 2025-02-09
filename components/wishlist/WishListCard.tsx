import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Linking,
} from "react-native";
import { Wish } from "@/types/wish";

interface WishListCardProps {
	wish: Wish;
}

const formatDate = (date: Date) => {
	return date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
};

export default function WishListCard({ wish }: WishListCardProps) {
	return (
		<View style={styles.card}>
			{/* {wish.imageUrl && (
				<View style={styles.imageContainer}>
					<Image source={{ uri: wish.imageUrl }} style={styles.image} />
				</View>
			)} */}
			<View style={styles.contentContainer}>
				<View style={styles.header}>
					<Text style={styles.title}>{wish.title}</Text>
					{wish.targetDate && (
						<Text style={styles.date}>
							{formatDate(new Date(wish.targetDate))}
						</Text>
					)}
					{!wish.targetDate && <Text style={styles.date}>Any time</Text>}
				</View>
				{wish.description && (
					<Text style={styles.description} numberOfLines={2}>
						{wish.description}
					</Text>
				)}
				<View style={styles.footer}>
					{wish.price && <Text style={styles.price}>${wish.price}</Text>}
					{wish.productUrl && (
						<TouchableOpacity onPress={() => Linking.openURL(wish.productUrl)}>
							<Text style={styles.link}>View in Store →</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		minWidth: "100%",
		flexDirection: "column",
		backgroundColor: "#111",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#333",
		overflow: "hidden",
	},
	imageContainer: {
		width: 200,
		height: 200,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	placeholderImage: {
		width: "100%",
		height: "100%",
		backgroundColor: "#222",
	},
	contentContainer: {
		flex: 1,
		padding: 12,
		justifyContent: "space-between",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 4,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		color: "white",
		flex: 1,
		marginRight: 8,
	},
	date: {
		fontSize: 12,
		color: "#999",
		backgroundColor: "#222",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 8,
	},
	description: {
		color: "#999",
		fontSize: 14,
		marginBottom: 8,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	price: {
		fontSize: 16,
		fontWeight: "600",
		color: "#00ff00",
	},
	link: {
		color: "#3b82f6",
		fontSize: 14,
	},
});
