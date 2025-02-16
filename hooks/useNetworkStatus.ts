import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";
import { setNetworkStatus } from "@/store/features/network/networkSlice";

export function useNetworkStatus() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			dispatch(setNetworkStatus(state.isConnected));
		});

		return () => unsubscribe();
	}, [dispatch]);
}
