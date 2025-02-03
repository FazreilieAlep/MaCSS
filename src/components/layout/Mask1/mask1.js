/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './mask1.module.scss';

const Mask1 = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const maskRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });
  const [maskPosition, setMaskPosition] = useState({ x: null, y: null });
  const [maskSize, setMaskSize] = useState(0); // Initial size px
  const [maskDelay, setMaskDelay] = useState(100); // Delay in milliseconds
  const animationSpeed = 0.3; // Speed of animation in seconds (adjust as needed)
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
    const handlepointermove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      updateMaskPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlepointermove);

    return () => {
      window.removeEventListener('pointermove', handlepointermove);
    };
  }, [updateMaskPosition]);

  // useEffect(() => {
  //   const handleInactivePointerMove = (e) => {
  //     resetInactivityTimeout();
  //   };

  //   window.addEventListener('pointermove', handleInactivePointerMove);

  //   return () => {
  //     window.removeEventListener('pointermove', handleInactivePointerMove);
  //     clearTimeout(inactivityTimeoutRef.current);
  //   };
  // }, [resetInactivityTimeout]);


  const handlePointerActive = useCallback(() => {
    setIsHovered(false);
    graduallyChangeMaskSize(40);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    graduallyChangeMaskSize(300);
  }, [graduallyChangeMaskSize]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    graduallyChangeMaskSize(40);
  }, [graduallyChangeMaskSize]);

  return (
    <main className={styles.main}>
      <div
        ref={maskRef}
        className={`${styles.mask}`}
        style={{
          WebkitMaskPosition: `${maskPosition.x != null ? maskPosition.x - maskSize / 2 : '50%'}px ${maskPosition.y != null ? maskPosition.y - maskSize / 2 : '50%'}px`,
          WebkitMaskSize: `${maskSize}px`,
          // transition: `transform ${animationSpeed}s ease-out`
        }}
      >
        <p
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          A visual designer - with skills that haven't been replaced by A.I (yet) - making good shit only if the paycheck is
          equally good.
        </p>
      </div>
      <div className={styles.body} onPointerMove={handlePointerActive} onMouseMove={handleInactivity}>
        <p>
          I'm a <span>selectively skilled</span> product designer with strong focus on producing high quality & impactful
          digital experience.
        </p>
      </div>
    </main>
  );
};

export default Mask1;
