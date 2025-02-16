import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchWishes } from "@/store/features/wishes/wishesSlice";
import { useUser } from "@clerk/clerk-expo";

export function NetworkStatus() {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useUser();
	const { status } = useSelector((state: RootState) => state.wishes);
	const { isConnected } = useSelector((state: RootState) => state.network);

	const getStatusColor = () => {
		if (!isConnected) return "#FF4444"; // Red
		switch (status) {
			case "succeeded":
				return "#44FF44"; // Green
			case "loading":
				return "#FFFF44"; // Yellow
			case "failed":
				return "#FF4444"; // Red
			default:
				return "#FFFF44"; // Yellow
		}
	};

	const handleRetry = () => {
		if (user?.id) {
			dispatch(fetchWishes(user.id));
		}
	};

	return (
		<TouchableOpacity
			style={[styles.indicator, { backgroundColor: getStatusColor() }]}
			onPress={handleRetry}
		/>
	);
}

const styles = StyleSheet.create({
	indicator: {
		position: "absolute",
		top: 50,
		right: 20,
		width: 12,
		height: 12,
		borderRadius: 6,
		zIndex: 1000,
	},
});
