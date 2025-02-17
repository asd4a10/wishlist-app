import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";
import { setNetworkStatus } from "@/store/features/network/networkSlice";

export function useNetworkStatus() {
	const dispatch = useDispatch();

	useEffect(() => {
		// Initial check
		const checkConnection = async () => {
			const netInfo = await NetInfo.fetch();
			console.log("checkConnection", netInfo.isConnected);
			dispatch(setNetworkStatus(netInfo.isConnected));
		};
		checkConnection();

		// Subscribe to network state updates
		const unsubscribe = NetInfo.addEventListener((state) => {
			dispatch(setNetworkStatus(state.isConnected));
		});

		return () => unsubscribe();
	}, [dispatch]);
}
