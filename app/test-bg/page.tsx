export default function TestBackground() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Tailwind CSS Test</h1>

      {/* Test Tailwind Classes */}
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Button Test</h2>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Test Button
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Background Image Test</h2>
          <div
            className="w-full h-48 bg-cover bg-center rounded-lg border-4 border-red-500"
            style={{backgroundImage: 'url(/background.png)'}}
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Card Test</h2>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-2">Test Card</h3>
            <p>This should have gradient background and proper styling</p>
          </div>
        </div>
      </div>
    </div>
  );
}