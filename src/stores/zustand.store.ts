import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface CounterStateZustand {
	value: number;
	title: string;
	fetchToDo: () => Promise<void>;
	increment: () => void;
	decrement: () => void;
	incrementByAmount: (amount: number) => void;
}

export const useCounterZustand = create<CounterStateZustand>()(
	devtools(
		(set) => ({
			value: 0,
			title: "Не має тайтлу",
			fetchToDo: async () => {
				const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
				const data = await response.json();
				set({ title: data.title });
			},
			increment: () => set((state) => ({ value: state.value + 1 }), false, "increment"),
			decrement: () => set((state) => ({ value: state.value - 1 }), false, "decrement"),
			incrementByAmount: (amount: number) =>
				set((state) => ({ value: state.value + amount }), false, "incrementByAmount"),
		}),
		{ name: "Zustand" }
	)
);
