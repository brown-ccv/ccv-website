import React, { useState, useEffect } from 'react'

interface AnimatedTitleProps {
  text: string
  speed?: number
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    // Start the animation when the component is mounted
    let currentIndex = 0

    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex])
        currentIndex++
      } else {
        clearInterval(intervalId) // Stop the interval when the animation is complete
      }
    }, speed)

    return () => {
      clearInterval(intervalId) // Cleanup interval on unmount
    }
  }, [text, speed]) // The effect will rerun if the text changes

  return (
    <h2 className="font-semibold text-white text-[40px] tracking-[-1.20px]">
      {displayedText}
    </h2>
  )
}
