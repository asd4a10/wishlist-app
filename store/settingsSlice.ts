import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Currency = "USD" | "GBP" | "KZT";

interface SettingsState {
	currency: Currency;
}

const initialState: SettingsState = {
	currency: "USD",
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setCurrency: (state, action: PayloadAction<Currency>) => {
			state.currency = action.payload;
		},
	},
});

export const { setCurrency } = settingsSlice.actions;
export default settingsSlice.reducer;
