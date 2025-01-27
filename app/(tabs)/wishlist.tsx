import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

import { WishModal } from "@/components/WishModal";
import { Wish } from "@/types/wish";
export default function WishlistScreen() {
	const [wishList, setWishList] = useState<Wish[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleAddWish = () => {
		setIsModalVisible(true);
	};

	const handleSaveWish = (newWish: Wish) => {
		setWishList([...wishList, newWish]);
		setIsModalVisible(false);
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.title}>Wishlist & Roadmap</ThemedText>
			<ThemedView
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			{wishList.length == 0 && (
				<ThemedText>
					Your future features and wishes will appear here!
				</ThemedText>
			)}
			{/* TODO: Display wish list */}
			{wishList.map((wish) => (
				<View style={styles.wishItem} key={wish.id}>
					<ThemedText>{wish.title}</ThemedText>
				</View>
			))}
			{/* floating button */}
			<TouchableOpacity
				style={styles.floatingButton}
				onPress={() => {
					handleAddWish();
				}}
			>
				<Text style={styles.floatingButtonText}>+</Text>
			</TouchableOpacity>
			{/* TODO: Add wish modal */}
			<WishModal
				isVisible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onSave={handleSaveWish}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	floatingButton: {
		position: "absolute",
		bottom: 100,
		right: 20,
		width: 70,
		height: 70,
		borderRadius: "100%",
		backgroundColor: "purple",
		alignItems: "center",
		justifyContent: "center",
	},
	floatingButtonText: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		// flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		// color: "black",
	},
	input: {
		height: 40,
		width: "80%",
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 15,
		// marginBottom: 10,
		paddingHorizontal: 10,
		marginVertical: 10,
	},
	textArea: {
		height: 60,
		textAlignVertical: "top",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: "2%",
		width: "100%",
		paddingHorizontal: "10%",
	},
	addWishButton: {
		backgroundColor: "purple",
		borderRadius: 15,
		padding: 10,
		width: "50%",
		alignItems: "center",
	},
	closeButton: {
		backgroundColor: "lightgray",
		borderRadius: 15,
		padding: 10,
		width: "50%",
		alignItems: "center",
	},
	disabledButton: {
		backgroundColor: "red",
	},
	disabledText: {
		color: "#ECEFF1",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	wishItem: {
		backgroundColor: "lightgray",
		borderRadius: 15,
		padding: 10,
		width: "80%",
		marginVertical: 10,
		alignItems: "center",
	},
	datePicker: {
		paddingHorizontal: 50,
	},
	checkbox: {
		textDecorationLine: "none",
	},
});
