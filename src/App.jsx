import React from 'react'
import CanvasMap from './components/CanvasMap'
import MotivationalCards from './components/MotivationalCards'
import StatsDisplay from './components/StatsDisplay'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Jogger Companion 🏃‍♀️</h1>
      <CanvasMap />
      <MotivationalCards />
      <StatsDisplay />
    </div>
  );
}
export default App;
