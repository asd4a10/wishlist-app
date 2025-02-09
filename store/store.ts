import { configureStore } from "@reduxjs/toolkit";
import wishesReducer from "./features/wishes/wishesSlice";

export const store = configureStore({
	reducer: {
		wishes: wishesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
