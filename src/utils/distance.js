export function calculateDistance(path) {
  if (path.length < 2) return 0
  const R = 6371 
  let total = 0
  for (let i = 1; i < path.length; i++) {
    const [lat1, lon1] = path[i - 1]
    const [lat2, lon2] = path[i]
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    total += R * c
  }
  return total
}