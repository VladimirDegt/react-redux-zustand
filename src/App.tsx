import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, fetchToDO, increment, RootState } from "./stores/redux.store";
import { CounterStateZustand, useCounterZustand } from "./stores/zustand.store";

function App() {
	const count = useSelector((state: RootState) => state.counter.value);
	const title = useSelector((state: RootState) => state.counter.title);
	const dispatch: AppDispatch = useDispatch();

	const {
		value: countZustand,
		increment: incrementZustand,
		title: titleZustand,
		fetchToDo: fetchToDoZustand,
	}: CounterStateZustand = useCounterZustand();

	return (
		<>
			<button onClick={() => dispatch(increment())}>count is {count}</button>
			<button onClick={async () => await dispatch(fetchToDO())}>{title}</button>
			<button onClick={() => incrementZustand()}>countZustand is {countZustand}</button>
			<button onClick={() => fetchToDoZustand()}>{titleZustand}</button>
		</>
	);
}

export default App;
