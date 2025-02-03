/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import './CherryBlossom.css'; // Import your CSS file for styling

const CherryBlossom = () => {
  const [leaves, setLeaves] = useState([]);
  const containerRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Function to handle mouse move events
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  // Function to create a new leaf object
  const createLeaf = () => {
    const newLeaf = {
      id: Math.random().toString(),
      x: Math.random() * window.innerWidth,
      y: -50, // Start above the viewport
      rotation: Math.random() * 360, // Random rotation
      drift: Math.random() * 2 - 1, // Random horizontal drift
      speed: Math.random() * 3 + 1, // Random falling speed
    };
    return newLeaf;
  };

  // Function to update leaf positions
  const updateLeaves = () => {
    const updatedLeaves = leaves.map((leaf) => ({
      ...leaf,
      y: leaf.y + leaf.speed,
      x: leaf.x + leaf.drift,
    }));

    setLeaves(updatedLeaves);
  };

  useEffect(() => {
    // Create initial leaves
    const initialLeaves = Array.from({ length: 20 }, createLeaf);
    setLeaves(initialLeaves);

    // Update leaf positions periodically
    const intervalId = setInterval(updateLeaves, 50);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [updateLeaves]);

  useEffect(() => {
    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="cherry-blossom-container" ref={containerRef}>
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf"
          style={{
            transform: `translate(${leaf.x}px, ${leaf.y}px) rotate(${leaf.rotation}deg)`,
          }}
        />
      ))}
      <div
        className="cursor-magnet"
        style={{
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
        }}
      />
    </div>
  );
};

export default CherryBlossom;
