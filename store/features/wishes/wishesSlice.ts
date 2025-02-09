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

export const wishesSlice = createSlice({
	name: "wishes",
	initialState,
	reducers: {
		addWish: (state, action) => {
			state.items.push(action.payload);
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
				state.error = action.error.message || "Failed to fetch wishes";
			});
	},
});

export const { addWish } = wishesSlice.actions;
export default wishesSlice.reducer;
