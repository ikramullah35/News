import React, { useState, useEffect } from "react";

function Counter() {
  // ✅ Load from localStorage when app starts
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("counterValue");
    return saved ? parseInt(saved) : 0;
  });

  // ✅ Save to localStorage whenever count changes
  useEffect(() => {
    localStorage.setItem("counterValue", count);
  }, [count]);

  // Handlers
  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount(count - 1);
  const handleReset = () => setCount(0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-700 px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center">
        
        {/* Counter Number */}
        <div className="count text-5xl sm:text-7xl font-extrabold text-green-700 mb-8 drop-shadow-md text-center">
          {count}
        </div>

        {/* Buttons */}
        <div className="buttons flex flex-col sm:flex-row gap-4 w-full">
          <button 
            onClick={handleIncrease} 
            className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-3 rounded-xl hover:scale-105 transform transition shadow-lg font-semibold"
          >
            Increase
          </button>

          <button 
            onClick={handleReset}  
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-5 py-3 rounded-xl hover:scale-105 transform transition shadow-lg font-semibold"
          >
            Reset
          </button>

          <button 
            onClick={handleDecrease} 
            className="flex-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-5 py-3 rounded-xl hover:scale-105 transform transition shadow-lg font-semibold"
          >
            Decrease
          </button>
        </div>

      </div>
    </div>
  );
}

export default Counter;
