import React, { useState } from "react";
import { toast } from "react-hot-toast";

const users = [
  "Abhay",
  "Amit",
  "Bhavna",
  "Chirag",
  "Divya",
  "Harsh",
  "Karan",
  "Neha",
  "Rohit",
  "Zoya",
];

const BinarySearch = () => {
  const [query, setQuery] = useState("");
  const [resultIndex, setResultIndex] = useState(null);
  const [showResultOnly, setShowResultOnly] = useState(false);

  const handleSearch = () => {
    const index = binarySearch(users, query.trim());

    if (index === -1) {
      toast.error("User not found");
    }

    setQuery("");
    setResultIndex(index);
    setShowResultOnly(true);
  };

  const binarySearch = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;
    target = target.toLowerCase();

    while (start <= end) {
      let mid = Math.floor(start + (end - start) / 2);
      const midValue = arr[mid].toLowerCase();

      if (target === midValue) return mid;
      if (target > midValue) start = mid + 1;
      else end = mid - 1;
    }

    return -1;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 cc">
      <div className="w-full h-[90vh] max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🔍 Binary Search User Finder
        </h1>

        <input
          type="text"
          placeholder="Enter user name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <button
          onClick={handleSearch}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            User List:
          </h2>
          <ul className="gap-4 overflow-y-auto h-[47vh] flex flex-col">
            {showResultOnly && resultIndex !== -1 ? (
              <li className="p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-blue-50 transition">
                {users[resultIndex]}
              </li>
            ) : (
              users.map((user, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-blue-50 transition"
                >
                  {user}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BinarySearch;
