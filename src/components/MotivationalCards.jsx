import React from 'react'
import MotivationalCard from './MotivationalCard'

const messages = [
 
]

export default function MotivationalCards() {
  return (
    <div className="overflow-x-auto flex space-x-4 p-4">
      {messages.map((msg, i) => (
        <MotivationalCard key={i} message={msg} />
      ))}
    </div>
  )
}


