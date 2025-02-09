import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Linking,
	ScrollView,
} from "react-native";
import { Wish } from "@/types/wish";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import WishListCard from "./WishListCard";
import AddWishCard from "./AddWishCard";

type ViewMode = "grid" | "list" | "timeline";

interface WishListProps {
	wishes: Wish[];
	onAddWish: () => void;
	onEditWish: (wish: Wish) => void;
}

export function WishList({ wishes, onAddWish, onEditWish }: WishListProps) {
	const [viewMode, setViewMode] = useState<ViewMode>("list");

	// Sort wishes by target date for timeline view
	const sortedWishes = [...wishes].sort((a, b) => {
		if (!a.targetDate) return 1;
		if (!b.targetDate) return -1;
		return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
	});

	const ViewModeSelector = () => (
		<View style={styles.viewModeContainer}>
			<TouchableOpacity
				style={[
					styles.viewModeButton,
					viewMode === "grid" && styles.activeViewMode,
				]}
				onPress={() => setViewMode("grid")}
			>
				<MaterialIcons
					name="grid-view"
					size={24}
					color={viewMode === "grid" ? "#00ff00" : "white"}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.viewModeButton,
					viewMode === "list" && styles.activeViewMode,
				]}
				onPress={() => setViewMode("list")}
			>
				<MaterialIcons
					name="list"
					size={24}
					color={viewMode === "list" ? "#00ff00" : "white"}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.viewModeButton,
					viewMode === "timeline" && styles.activeViewMode,
				]}
				onPress={() => setViewMode("timeline")}
			>
				<MaterialIcons
					name="timeline"
					size={24}
					color={viewMode === "timeline" ? "#00ff00" : "white"}
				/>
			</TouchableOpacity>
		</View>
	);

	const renderWishCard = (wish: Wish) => (
		<View
			style={[
				styles.card,
				viewMode === "list" && styles.listCard,
				{ minWidth: viewMode === "grid" ? "48%" : "100%" },
			]}
		>
			{wish.imageUrl && (
				<Image source={{ uri: wish.imageUrl }} style={styles.image} />
			)}
			<View
				style={viewMode === "list" ? styles.listContent : styles.cardContent}
			>
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
		</View>
	);

	const renderTimelineItem = (wish: Wish, index: number) => (
		<View key={wish.id} style={styles.timelineItem}>
			<View style={styles.connector}>
				<View style={styles.line} />
				<View style={styles.dot} />
			</View>
			<View
				style={[
					styles.contentContainer,
					index % 2 === 0 ? styles.contentRight : styles.contentLeft,
				]}
			>
				<Text
					style={[
						styles.date,
						index % 2 === 0 ? styles.dateLeft : styles.dateRight,
					]}
				>
					{wish.targetDate
						? new Date(wish.targetDate).toLocaleDateString()
						: "No date set"}
				</Text>
				{renderWishCard(wish)}
			</View>
		</View>
	);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.list}>
				{wishes.length == 0 && <AddWishCard onPress={onAddWish} />}
				{wishes.map((wish) => (
					<View key={wish.id}>
						<WishListCard wish={wish} onEdit={onEditWish} />
					</View>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	viewModeContainer: {
		width: "50%",
		marginHorizontal: "auto",
		flexDirection: "row",
		justifyContent: "center",
		padding: 10,
		gap: 10,
		backgroundColor: "#111",
		borderWidth: 1,
		borderColor: "#333",
		borderRadius: 15,
	},
	viewModeButton: {
		padding: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#333",
	},
	activeViewMode: {
		borderColor: "#00ff00",
		backgroundColor: "#1a1a1a",
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: "4%",
		paddingTop: 10,
	},
	list: {
		gap: 10,
		paddingTop: 10,
	},
	card: {
		flex: 1,
		minWidth: "100%",
		borderWidth: 1,
		borderColor: "#333",
		borderRadius: 8,
		padding: 10,
		backgroundColor: "#111",
	},
	listCard: {
		flexDirection: "row",
		gap: 10,
	},
	cardContent: {
		flex: 1,
	},
	listContent: {
		flex: 1,
		// marginLeft: 10,
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
		color: "white",
	},
	description: {
		color: "#999",
		marginTop: 4,
	},
	price: {
		fontWeight: "500",
		marginTop: 8,
		color: "#00ff00",
	},
	date: {
		color: "#999",
		marginTop: 8,
		fontSize: 14,
	},
	link: {
		color: "#3b82f6",
		marginTop: 8,
	},
	// Timeline specific styles
	timelineItem: {
		flexDirection: "row",
		flex: 1,
		minWidth: "100%",
		// borderWidth: 1,
		// borderColor: "#333",
		// borderRadius: 8,
		// padding: 10,
		// backgroundColor: "#111",
		// minHeight: 100,
		// marginBottom: 20,
	},
	connector: {
		width: 20,
		alignItems: "center",
		marginHorizontal: 10,
	},
	line: {
		flex: 1,
		width: 2,
		backgroundColor: "#333",
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: "#00ff00",
		position: "absolute",
		top: "50%",
		marginTop: -6,
	},
	contentContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		// paddingHorizontal: 10,
	},
	contentLeft: {
		flexDirection: "row",
	},
	contentRight: {
		flexDirection: "row-reverse",
	},
	dateLeft: {
		textAlign: "right",
		marginRight: 10,
	},
	dateRight: {
		textAlign: "left",
		marginLeft: 10,
	},
	timeline: {
		flexDirection: "column",
		// width: "100%",
		flex: 1,
		// padding: 10,
		gap: 10,
		// backgroundColor: "red",
	},
});

{
	/* <View style={styles.grid}>
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
</View> */
}
