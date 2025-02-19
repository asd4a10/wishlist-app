import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import wishesReducer from "./features/wishes/wishesSlice";
import networkReducer from "./features/network/networkSlice";
import settingsReducer from "./settingsSlice";

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	timeout: 10000,
	blacklist: ["network"], // Don't persist network status
};

const persistedWishesReducer = persistReducer(persistConfig, wishesReducer);
const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);

export const store = configureStore({
	reducer: {
		wishes: persistedWishesReducer,
		network: networkReducer,
		settings: persistedSettingsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
