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
			});
	},
});

export default wishesSlice.reducer;
