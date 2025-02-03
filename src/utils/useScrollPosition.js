import { useEffect, useState, useCallback } from "react";
import throttle from "./throttle";

const useScrollPosition = (throttleDelay = 100) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updatePosition = useCallback(() => {
    setScrollPosition(window.pageYOffset);
  }, []);

  useEffect(() => {
    // Create a throttled version of the updatePosition function
    const throttledUpdatePosition = throttle(updatePosition, throttleDelay);

    // Attach the throttled function to the scroll event
    window.addEventListener("scroll", throttledUpdatePosition);

    // Initial call to set the position
    updatePosition();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", throttledUpdatePosition);
  }, [updatePosition, throttleDelay]);

  return scrollPosition;
};

export default useScrollPosition;
