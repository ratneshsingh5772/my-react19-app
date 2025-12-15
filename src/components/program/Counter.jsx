import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  
  return (
    <div className="counter-container bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-black">Counter: {count}</h2>
            <div className="button-group space-x-4">
                <button onClick={increment} className="bg-white text-green-600 border-2 border-green-600 px-4 py-2 rounded hover:bg-green-50 transition duration-300">Increment</button>
                <button onClick={decrement} className="bg-white text-red-600 border-2 border-red-600 px-4 py-2 rounded hover:bg-red-50 transition duration-300">Decrement</button>
                <button onClick={reset} className="bg-white text-gray-600 border-2 border-gray-600 px-4 py-2 rounded hover:bg-gray-50 transition duration-300">Reset</button>
            </div>
        </div>
  );
};

export default Counter;