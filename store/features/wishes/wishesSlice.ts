import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Wish } from "@/types/wish";

interface WishesState {
	items: Wish[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: WishesState = {
	items: [],
	status: "idle",
	error: null,
};

const API_URL = "https://wishify.kz/api/v1/wishes";

export const fetchWishes = createAsyncThunk(
	"wishes/fetchWishes",
	async (username: string) => {
		console.log("fetching wishes for", username);
		const response = await fetch(`${API_URL}?username=${username}`);
		if (!response.ok) {
			console.log(response);
			throw new Error("Failed to fetch wishes");
		}
		const data = await response.json();
		console.log("wishes", data);
		return data.map((wish: any) => ({
			...wish,
			targetDate: wish.targetDate, // API already returns ISO string
			createdAt: wish.createdAt, // API already returns ISO string
		}));
	}
);

export const createWish = createAsyncThunk(
	"wishes/createWish",
	async ({ wish, username }: { wish: Wish; username: string }) => {
		const wishData = {
			...wish,
			username,
		};
		console.log("createWish wishData", wishData);
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(wishData),
		});

		if (!response.ok) {
			console.log("createWish error response", response);
			throw new Error("Failed to create wish");
		}

		const data = await response.json();
		return data;
	}
);

export const deleteWish = createAsyncThunk(
	"wishes/deleteWish",
	async (wishId: string) => {
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
	async ({ wish, username }: { wish: Wish; username: string }) => {
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
	}
);

export const wishesSlice = createSlice({
	name: "wishes",
	initialState,
	reducers: {},
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
				state.error = action.error.message || "Failed to fetch wishes";
			})
			.addCase(createWish.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createWish.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items.push(action.payload);
			})
			.addCase(createWish.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to create wish";
			})
			.addCase(deleteWish.fulfilled, (state, action) => {
				state.items = state.items.filter((wish) => wish.id !== action.payload);
			})
			.addCase(deleteWish.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to delete wish";
			})
			.addCase(updateWish.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					(wish) => wish.id === action.payload.id
				);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			})
			.addCase(updateWish.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to update wish";
			});
	},
});

export default wishesSlice.reducer;
