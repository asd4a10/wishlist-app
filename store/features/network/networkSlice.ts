import { createSlice } from "@reduxjs/toolkit";

const networkSlice = createSlice({
	name: "network",
	initialState: {
		isConnected: true,
	},
	reducers: {
		setNetworkStatus: (state, action) => {
			state.isConnected = action.payload;
		},
	},
});

export const { setNetworkStatus } = networkSlice.actions;
export default networkSlice.reducer;
