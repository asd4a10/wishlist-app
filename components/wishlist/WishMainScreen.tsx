import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
	fetchWishes,
	createWish,
	updateWish,
} from "@/store/features/wishes/wishesSlice";
import { useUser } from "@clerk/clerk-expo";

import { WishModal } from "@/components/WishModal";
import { WishList } from "@/components/wishlist/WishList";
import { Wish } from "@/types/wish";

export default function WishlistScreen() {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useUser();
	const {
		items: wishList,
		status,
		error,
	} = useSelector((state: RootState) => state.wishes);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

	useEffect(() => {
		if (status === "idle" && user?.id) {
			dispatch(fetchWishes(user.id));
		}
	}, [dispatch, status, user?.id]);

	const handleEdit = (wish: Wish) => {
		setSelectedWish(wish);
		console.log("selected wish", wish);
		setIsModalVisible(true);
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.title}>Your Wishlist</ThemedText>
			{/* <ThemedView
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/> */}
			{status === "loading" && (
				<Text style={styles.loadingText}>Loading wishes...</Text>
			)}
			{status === "failed" && (
				<Text style={styles.errorText}>Error: {error}</Text>
			)}
			{/* TODO: Display wish list */}
			{status === "succeeded" && (
				<WishList
					wishes={wishList}
					onAddWish={() => setIsModalVisible(true)}
					onEditWish={handleEdit}
				/>
			)}
			{/* floating button */}
			<TouchableOpacity
				style={styles.floatingButton}
				onPress={() => {
					setIsModalVisible(true);
				}}
			>
				<Text style={styles.floatingButtonText}>+</Text>
			</TouchableOpacity>
			{/* TODO: Add wish modal */}
			<WishModal
				isVisible={isModalVisible}
				initialWish={selectedWish}
				onClose={() => {
					setIsModalVisible(false);
					setSelectedWish(null);
				}}
				onSave={(updatedWish) => {
					if (user?.id) {
						if (selectedWish) {
							dispatch(updateWish({ wish: updatedWish, username: user.id }));
						} else {
							dispatch(createWish({ wish: updatedWish, username: user.id }));
						}
						setIsModalVisible(false);
						setSelectedWish(null);
					}
				}}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 80,
		backgroundColor: "black",
		// justifyContent: "center",
	},
	title: {
		fontSize: 40,
		fontWeight: "bold",
		color: "white",
		lineHeight: 50,
	},
	separator: {
		marginTop: 5,
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
	loadingText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	errorText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
