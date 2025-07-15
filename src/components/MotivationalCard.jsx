import React, { useRef, useState } from 'react'
import useIntersection from '../hooks/useIntersection'

export default function MotivationalCard({ message }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useIntersection(ref, () => setVisible(true))

  return (
    <div
      ref={ref}
      className={`min-w-[250px] h-32 rounded-xl p-4 text-center text-lg transition-opacity duration-700 ease-in-out ${
        visible ? 'bg-cyan-500 opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </div>
  )
}
