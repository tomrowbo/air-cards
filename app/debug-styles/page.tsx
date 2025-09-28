'use client';

export default function DebugStyles() {
  return (
    <div className="p-8 bg-red-500">
      <h1 className="text-4xl text-white mb-4">Debug: Basic Tailwind Test</h1>

      <div className="bg-blue-500 p-4 rounded mb-4">
        <p className="text-white">This should have blue background</p>
      </div>

      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Basic Button
      </button>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-yellow-400 p-4">Box 1</div>
        <div className="bg-purple-500 p-4 text-white">Box 2</div>
      </div>
    </div>
  );
}