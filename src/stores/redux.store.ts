import { configureStore, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
	value: number;
	title: string;
}

const initialState: CounterState = {
	value: 0,
	title: "Не має тайтлу",
};

export const fetchToDO = createAsyncThunk("counter/fetchToDO", async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

	return response.json();
});

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchToDO.fulfilled, (state, action: PayloadAction<{ title: string }>) => {
			state.title = action.payload.title;
		});
	},
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

export const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
