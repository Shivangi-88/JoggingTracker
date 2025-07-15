import React, { useEffect, useRef, useState } from 'react';

const haversineDistance = (coord1, coord2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lon - coord1.lon);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const CanvasTracker = () => {
  const canvasRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [tracking, setTracking] = useState(true);
  const [distance, setDistance] = useState(0);

  const drawPath = (ctx, points) => {
    if (points.length < 1) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = '#dcf2a2';
    ctx.lineWidth = 2;

    const scale = 100000;
    const offsetX = points[0].lon * scale;
    const offsetY = points[0].lat * scale;

    ctx.beginPath();
    points.forEach((pos, index) => {
      const x = (pos.lon * scale) - offsetX + ctx.canvas.width / 2;
      const y = (pos.lat * scale) - offsetY + ctx.canvas.height / 2;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    
    const start = points[0];
    const startX = (start.lon * scale) - offsetX + ctx.canvas.width / 2;
    const startY = (start.lat * scale) - offsetY + ctx.canvas.height / 2;
    ctx.fillStyle = 'lime';
    ctx.beginPath();
    ctx.arc(startX, startY, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '12px sans-serif';
    ctx.fillText('Start', startX + 8, startY);

    
    if (points.length > 1) {
      const end = points[points.length - 1];
      const endX = (end.lon * scale) - offsetX + ctx.canvas.width / 2;
      const endY = (end.lat * scale) - offsetY + ctx.canvas.height / 2;
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(endX, endY, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.fillText('End', endX + 8, endY);
    }

  
    ctx.fillStyle = 'white';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Distance: ${distance.toFixed(2)} km`, 10, 20);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawPath(ctx, positions);
  }, [positions, distance]);

  useEffect(() => {
    if (!tracking) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newCoord = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };

        setPositions((prev) => {
          const updated = [...prev, newCoord];
          if (prev.length > 0) {
            const lastCoord = prev[prev.length - 1];
            const dist = haversineDistance(lastCoord, newCoord);
            setDistance((prevDist) => prevDist + dist);
          }
          return updated;
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [tracking]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <button
          type="button"
  onClick={() => setTracking(!tracking)}

  className="text-xl font-bold px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 ease-in-out"
>
  {tracking ? ' Pause' : ' Resume'}
</button>


          <span className="text-lg text-white font-medium mt-2 sm:mt-0">
            Distance Covered: {distance.toFixed(2)} km
          </span>
        </div>

        {}
        <div className="flex justify-center mb-6">
          <canvas
            ref={canvasRef}
            width={500}
            height={400}
            className="rounded-xl shadow-lg border-4 border-cyan-400 bg-gray-800"
          />
        </div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center mt-6">
          {[
            {
              bg: 'bg-yellow-100',
              textColor: 'text-yellow-800',
              title: 'Keep going!',
              sub: 'You\'re getting stronger with every step.',
            },
            {
              bg: 'bg-pink-100',
              textColor: 'text-pink-800',
              title: 'You’re doing amazing!',
              sub: 'Push through — your goals are near!',
            },
            {
              bg: 'bg-blue-100',
              textColor: 'text-blue-800',
              title: 'Time to hydrate!',
              sub: 'Grab some water and keep up the momentum.',
            },
            {
              bg: 'bg-amber-100',
              textColor: 'text-amber-800',
              title: 'Almost there!',
              sub: 'Finish strong — you\'re so close!',
            },
          ].map(({ bg, textColor, title, sub }, i) => (
            <div
              key={i}
              className={`${bg} p-6 rounded-2xl shadow-lg transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl cursor-pointer`}
            >
              <p className={`${textColor} text-lg font-bold`}>{title}</p>
              <p className={`${textColor.replace('800', '700')} text-sm mt-1`}>{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanvasTracker;
