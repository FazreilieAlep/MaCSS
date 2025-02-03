/* eslint-disable no-unused-vars */
// Mask.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './mask1.module.scss';

const Mask = ({ animationSpeed = 0.3, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const maskRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });
  const [maskPosition, setMaskPosition] = useState({ x: null, y: null });
  const [maskSize, setMaskSize] = useState(0); // Initial size px
  const inactivityTimeoutRef = useRef(null);

  // Function to gradually change maskSize to a specified newSize
  const graduallyChangeMaskSize = useCallback((newSize) => {
    let startSize = maskSize;
    let startTime = null;

    const animateSize = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = (timestamp - startTime) / (animationSpeed * 1000);
      const newSizePx = startSize + (newSize - startSize) * progress;
      setMaskSize(newSizePx);

      if (progress < 1) {
        requestAnimationFrame(animateSize);
      }
    };

    requestAnimationFrame(animateSize);
  }, [maskSize, animationSpeed]);

  // Function to handle inactivity
  const handleInactivity = useCallback(() => {
    graduallyChangeMaskSize(0); // Shrink the mask to 0 size
    setIsHovered(false); // Optionally reset hovered state
  }, [graduallyChangeMaskSize]);

  // Function to reset the inactivity timeout
  const resetInactivityTimeout = useCallback(() => {
    clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(handleInactivity, 2000); // 2 seconds of inactivity
  }, [handleInactivity]);

  // Function to update mask position smoothly
  const updateMaskPosition = useCallback((newPosition) => {
    setMaskPosition(newPosition);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      updateMaskPosition({ x: e.clientX, y: e.clientY });
      resetInactivityTimeout();
    };

    // Accessing the child element using maskRef
    const mainElement = maskRef.current;
    if (mainElement) {
      mainElement.addEventListener('mousemove', handleMouseMove);
    }

    // Cleanup function to remove event listener and clear timeout
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(inactivityTimeoutRef.current);
    };
  }, [updateMaskPosition, resetInactivityTimeout]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    graduallyChangeMaskSize(300);
  }, [graduallyChangeMaskSize]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    graduallyChangeMaskSize(40);
  }, [graduallyChangeMaskSize]);

  return (
    <div
      ref={maskRef}
      className={`${styles.mask}`}
      style={{
        WebkitMaskPosition: `${maskPosition.x != null ? maskPosition.x - maskSize / 2 : '50%'}px ${maskPosition.y != null ? maskPosition.y - maskSize / 2 : '50%'}px`,
        WebkitMaskSize: `${maskSize}px`,
        transition: `transform ${animationSpeed}s ease-out`
      }}
    >
        <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    </div>
  );
};

export default Mask;
