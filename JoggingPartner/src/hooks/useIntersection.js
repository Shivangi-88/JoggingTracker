import { useEffect } from 'react'

export default function useIntersection(ref, callback) {
  useEffect(() => {
    if (!ref?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, callback])
}

