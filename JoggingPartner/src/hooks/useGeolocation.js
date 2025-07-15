import { useEffect, useState } from 'react'

export default function useGeolocation() {
  const [path, setPath] = useState([])

  useEffect(() => {
    if (!navigator.geolocation) return
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setPath((prev) => [...prev, [latitude, longitude]])
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return { path }
}