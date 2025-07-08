// Build a simple counter with increment, decrement, and reset buttons.
// Bonus: Show whether the current count is even or odd.

import { useState } from "react";


const CounterApp = () => {
    const [counter, setCounter] = useState<number>(0);
    const isNegative = counter < 0 ? "text-red-700" : "text-green-700";
    const displayCounterLabel = counter % 2 === 0 ? "Even" : "Odd";
    const btn = "px-8 py-4  rounded-md border cursor-pointer";
    const handleIncrement = () => setCounter((prev: number) => prev + 1);
    const handleDecrement = () => setCounter((prev: number) => prev - 1);
    const handleReset = () => setCounter(0);


    return (
      <div className="m-8">
        <h1 className="text-4xl text-blue-900 text-center my-8">Counter App</h1>
        <div className="text-center">
          <h1 className={`text-2xl ${isNegative}`}>
            {counter} - {displayCounterLabel}
          </h1>
        </div>

        <div className="flex items-center gap-8 mt-4 justify-center">
          <button className={btn} onClick={handleIncrement}>
            Increment
          </button>
          <button className={btn} onClick={handleDecrement}>
            Decrement
          </button>
          <button className={btn} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    );
};
export default CounterApp;