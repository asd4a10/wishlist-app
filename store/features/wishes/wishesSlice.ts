import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Wish } from "@/types/wish";

interface WishesState {
	items: Wish[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	pendingChanges: {
		creates: Wish[];
		updates: Wish[];
		deletes: string[];
	};
}

const initialState: WishesState = {
	items: [],
	status: "idle",
	error: null,
	pendingChanges: {
		creates: [],
		updates: [],
		deletes: [],
	},
};

const API_URL = "https://wishify.kz/api/v1/wishes";

export const fetchWishes = createAsyncThunk(
	"wishes/fetchWishes",
	async (username: string, { getState }) => {
		try {
			console.log("fetchWishes username", username);
			const response = await fetch(`${API_URL}?username=${username}`);
			if (!response.ok) {
				throw new Error("Failed to fetch wishes");
			}
			const data = await response.json();
			return data.map((wish: any) => ({
				...wish,
				targetDate: wish.targetDate,
				createdAt: wish.createdAt,
			}));
		} catch (error) {
			// If fetch fails, we'll use cached data
			const state = getState() as { wishes: WishesState };
			if (state.wishes.items.length > 0) {
				console.log("Using cached wishes");
				// Return cached data instead of rejecting
				return state.wishes.items;
			}
			throw error; // Only throw if we have no cached data
		}
	}
);

export const createWish = createAsyncThunk(
	"wishes/createWish",
	async (
		{ wish, username }: { wish: Wish; username: string },
		{ dispatch, rejectWithValue }
	) => {
		try {
			console.log("createWish wish", wish);
			const wishData = {
				...wish,
				username,
			};
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(wishData),
			});

			if (!response.ok) {
				throw new Error("Failed to create wish");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			// Store in pending changes if offline
			dispatch(addPendingCreate({ ...wish, id: `temp-${Date.now()}` }));
			return rejectWithValue("Stored wish for later sync");
		}
	}
);

export const deleteWish = createAsyncThunk(
	"wishes/deleteWish",
	async (wishId: string) => {
		console.log("deleteWish wishId", wishId);
		const response = await fetch(`${API_URL}/${wishId}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Failed to delete wish");
		}

		return wishId;
	}
);

export const updateWish = createAsyncThunk(
	"wishes/updateWish",
	async (
		{ wish, username }: { wish: Wish; username: string },
		{ dispatch, rejectWithValue }
	) => {
		try {
			console.log("updateWish wish", wish);
			const response = await fetch(`${API_URL}/${wish.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...wish, username }),
			});

			if (!response.ok) {
				throw new Error("Failed to update wish");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			// Store in pending changes if offline
			dispatch(addPendingUpdate(wish));
			return rejectWithValue("Stored update for later sync");
		}
	}
);

export const syncPendingChanges = createAsyncThunk(
	"wishes/syncPendingChanges",
	async (username: string, { getState, dispatch }) => {
		const state = getState() as { wishes: WishesState };
		const { pendingChanges } = state.wishes;

		// Process creates
		for (const wish of pendingChanges.creates) {
			if (wish.id.startsWith("temp-")) {
				const { id, ...wishWithoutTempId } = wish;
				await dispatch(createWish({ wish: wishWithoutTempId, username }));
			}
		}

		// Process updates
		for (const wish of pendingChanges.updates) {
			await dispatch(updateWish({ wish, username }));
		}

		dispatch(clearPendingChanges());
	}
);

export const wishesSlice = createSlice({
	name: "wishes",
	initialState,
	reducers: {
		addPendingCreate: (state, action) => {
			state.pendingChanges.creates.push(action.payload);
			state.items.push(action.payload); // Add to local items immediately
		},
		addPendingUpdate: (state, action) => {
			state.pendingChanges.updates.push(action.payload);
			const index = state.items.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.items[index] = action.payload; // Update local item immediately
			}
		},
		clearPendingChanges: (state) => {
			state.pendingChanges = {
				creates: [],
				updates: [],
				deletes: [],
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWishes.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchWishes.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = action.payload;
			})
			.addCase(fetchWishes.rejected, (state, action) => {
				state.status = "failed";
				state.error = "Failed to fetch wishes and no cached data available";
			})
			.addCase(createWish.fulfilled, (state, action) => {
				// Remove temp item if it exists
				state.items = state.items.filter(
					(item) => !item.id.startsWith("temp-")
				);
				state.items.push(action.payload);
			})
			.addCase(updateWish.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					(item) => item.id === action.payload.id
				);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			});
	},
});

export const { addPendingCreate, addPendingUpdate, clearPendingChanges } =
	wishesSlice.actions;
export default wishesSlice.reducer;
