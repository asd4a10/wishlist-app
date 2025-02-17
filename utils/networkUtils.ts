import NetInfo from "@react-native-community/netinfo";
import { AppDispatch } from "@/store/store";
import { setNetworkStatus } from "@/store/features/network/networkSlice";

export async function checkConnection(dispatch: AppDispatch) {
	const netInfo = await NetInfo.fetch();
	console.log("checkConnection", netInfo.isConnected);
	dispatch(setNetworkStatus(netInfo.isConnected));
	return netInfo.isConnected;
}

export function setupNetworkListener(dispatch: AppDispatch) {
	return NetInfo.addEventListener((state) => {
		console.log("Network state changed:", state.isConnected);
		dispatch(setNetworkStatus(state.isConnected));
	});
}
