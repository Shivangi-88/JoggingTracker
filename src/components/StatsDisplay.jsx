import React from 'react'
import useGeolocation from '../hooks/useGeolocation'
import { calculateDistance } from '../utils/distance'

export default function StatsDisplay() {
  const { path } = useGeolocation()
  const distance = calculateDistance(path)
  return (
    <div className="w-full text-center p-4 text-lg bg-[#2a2a2a] mt-4">
      <p>Distance Covered: <span className="text-cyan-400 font-bold">{distance.toFixed(2)} km</span></p>
    </div>
  )
}
