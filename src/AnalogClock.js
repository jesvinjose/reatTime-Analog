import React, { useState, useEffect } from 'react';

const AnalogClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means the effect runs only once when the component mounts

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Calculate angles for the clock hands
  const secondHandAngle = (seconds / 60) * 360;
  const minuteHandAngle = ((minutes * 60 + seconds) / 3600) * 360;
  const hourHandAngle = ((hours % 12 + minutes / 60) / 12) * 360;

  // Create an array of numbers from 1 to 12
  const hourNumbers = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div>
      <h1>Analog Clock</h1>
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Clock face */}
          <circle cx="50" cy="50" r="45" fill="#fff" stroke="#333" strokeWidth="2" />

          {/* Hour markings */}
          {hourNumbers.map((number) => {
            const angle = ((number - 3) / 12) * 360; // Offset by 3 to start from 1 o'clock
            const x = 50 + 38 * Math.cos((angle * Math.PI) / 180);
            const y = 50 + 38 * Math.sin((angle * Math.PI) / 180);

            return (
              <text
                key={number}
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="#333"
                fontSize="5"
              >
                {number}
              </text>
            );
          })}

          {/* Hour hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="30"
            stroke="#333"
            strokeWidth="4"
            transform={`rotate(${hourHandAngle} 50 50)`}
          />

          {/* Minute hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            stroke="#333"
            strokeWidth="3"
            transform={`rotate(${minuteHandAngle} 50 50)`}
          />

          {/* Second hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke="#f00"
            strokeWidth="2"
            transform={`rotate(${secondHandAngle} 50 50)`}
          />
        </svg>
      </div>
    </div>
  );
};

export default AnalogClock;
