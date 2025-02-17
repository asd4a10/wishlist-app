import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
	fetchWishes,
	syncPendingChanges,
} from "@/store/features/wishes/wishesSlice";
import { useUser } from "@clerk/clerk-expo";
import { checkConnection } from "@/utils/networkUtils";

export function NetworkStatus() {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useUser();
	const { status } = useSelector((state: RootState) => state.wishes);
	const { isConnected } = useSelector((state: RootState) => state.network);
	const { pendingChanges } = useSelector((state: RootState) => state.wishes);

	// Check connection status when component mounts or when status changes
	useEffect(() => {
		checkConnection(dispatch);
	}, [dispatch, status]); // Add status to dependencies to update on status changes

	const getStatusColor = () => {
		if (!isConnected) return "#FF4444"; // Red
		if (
			pendingChanges.creates.length > 0 ||
			pendingChanges.updates.length > 0
		) {
			return "#FFA500"; // Orange - has pending changes
		}
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

	const handleRetry = async () => {
		if (user?.id) {
			const isConnected = await checkConnection(dispatch);

			if (isConnected) {
				if (
					pendingChanges.creates.length > 0 ||
					pendingChanges.updates.length > 0
				) {
					dispatch(syncPendingChanges(user.id));
				} else {
					dispatch(fetchWishes(user.id));
				}
			}
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
