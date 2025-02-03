import React, { useState, useEffect, useRef } from 'react';
import './ProjectCard.scss';

const ProjectCard = ({ dataImage, children }) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null);
    const cardRef = useRef(null);
  
    useEffect(() => {
      const cardElement = cardRef.current;
      setWidth(cardElement.offsetWidth);
      setHeight(cardElement.offsetHeight);
    }, []);
  
    const mousePX = mouseX / width;
    const mousePY = mouseY / height;
  
    const cardStyle = {
      transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`
    };
  
    const cardBgTransform = {
      transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`
    };
  
    const cardBgImage = {
      backgroundImage: `url(${dataImage})`
    };
  
    const handleMouseMove = (e) => {
      const cardElement = cardRef.current.getBoundingClientRect();
      setMouseX((e.clientX - cardElement.left - width / 2) * 0.5);
      setMouseY((e.clientY - cardElement.top - height / 2) * 0.5);
    };
  
    const handleMouseEnter = () => {
      clearTimeout(mouseLeaveDelay);
    };
  
    const handleMouseLeave = () => {
      setMouseLeaveDelay(setTimeout(() => {
        setMouseX(0);
        setMouseY(0);
      }, 1000));
    };

  return (
    <div
      className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className="card" style={cardStyle}>
        <div className="card-bg" style={{ ...cardBgTransform, ...cardBgImage }}></div>
        <div className="card-info">{children}</div>
      </div>
    </div>
  );
};

export default ProjectCard;