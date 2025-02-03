import React, { useCallback, useEffect, useRef, useState, forwardRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Header.css';
import { motion, useTransform } from "framer-motion";

// Assets import
import SkyBackground from '../../../../../assets/images/home/sky.png';

const Header = forwardRef(({ yPos, xPos, scrollY }, ref) => {
    // const navigate = useNavigate();
    const skyBackgroundRef = useRef(null);
    const title = useRef(null);
    const sun = useRef(null);
    const cloud1 = useRef(null);
    const cloud2 = useRef(null);
    const mountain1 = useRef(null);
    const mountain2 = useRef(null);
    const pondok = useRef(null);
    const land1 = useRef(null);
    const land2 = useRef(null);

    const [sunSize, setSunSize] = useState(100);
    const [sunHeight, setSunHeight] = useState(0);
    const [sunOpacity, setSunOpacity] = useState(1);

    const interpolateBetweenColors = (startColor, endColor, ratio) => {
        const r = Math.round(parseInt(startColor.slice(1, 3), 16) * (1 - ratio) + parseInt(endColor.slice(1, 3), 16) * ratio);
        const g = Math.round(parseInt(startColor.slice(3, 5), 16) * (1 - ratio) + parseInt(endColor.slice(3, 5), 16) * ratio);
        const b = Math.round(parseInt(startColor.slice(5, 7), 16) * (1 - ratio) + parseInt(endColor.slice(5, 7), 16) * ratio);
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    const interpolateColor = (y, colorStops) => {
        const range = Math.min(1, Math.max(0, y / window.innerHeight));
        let color = '';

        for (let i = 0; i < colorStops.length - 1; i++) {
            const start = colorStops[i];
            const end = colorStops[i + 1];
            if (range >= start.stop && range <= end.stop) {
                const ratio = (range - start.stop) / (end.stop - start.stop);
                color = interpolateBetweenColors(start.color, end.color, ratio);
                break;
            }
        }

        return color;
    };

    const colorStops1 = [
        { stop: 0, color: '#62c1e5' },
        { stop: 0.2, color: '#93ddee' },
        { stop: 1, color: '#ffa500' }
    ];

    const colorStops2 = [
        { stop: 0, color: '#ffffff' },
        { stop: 1, color: '#ffa500' }
    ];

    const skyBackgroundColor = interpolateColor(sunHeight, colorStops1);
    const sunColor = interpolateColor(sunHeight, colorStops2);

    const skyVariant = {
        background: `linear-gradient(${skyBackgroundColor} , #ffffff)`
    };

    const sunVariant = {
        backgroundColor: sunColor,
        height: sunSize,
        width: sunSize,
        top: `${yPos - sunSize / 2}px`,
        left: `${xPos - sunSize / 2}px`,
        opacity: sunOpacity
    };

    const tweenBackout = {
        type: "tween",
        ease: "backOut",
        duration: 0.5
    };

    const titleTransform = useTransform(scrollY, [0, 80], ['-7vh', '80vh']);
    const cloud1Transform = useTransform(scrollY, [0, 200], ['0vh', '100vh']);
    const mountain2TransformY = useTransform(scrollY, [0, 500], ['0vh', '100vh']);
    const mountain2TransformX = useTransform(scrollY, [0, 500], ['0vh', '-50vh']);
    const cloud2Transform = useTransform(scrollY, [0, 600], ['0vh', '100vh']);
    const mountain1TransformY = useTransform(scrollY, [0, 800], ['0vh', '100vh']);
    const mountain1TransformX = useTransform(scrollY, [0, 800], ['0vh', '100vh']);
    const pondokTransformY = useTransform(scrollY, [0, 1000], ['0vh', '100vh']);
    const pondokTransformX = useTransform(scrollY, [0, 1000], ['0vh', '100vh']);
    const land2Transform = useTransform(scrollY, [0, 1200], ['0vh', '100vh']);

    const updateSunSize = () => {
        if (skyBackgroundRef.current) {
            setSunSize(skyBackgroundRef.current.getBoundingClientRect().height / 7);
        }
    };

    const updateSunHeight = useCallback(() => {
        if (yPos && skyBackgroundRef.current) {
            if (yPos <= skyBackgroundRef.current.getBoundingClientRect().height) {
                if (sunOpacity === 0) {
                    const timeout = setTimeout(() => {
                        setSunOpacity(1);
                    }, 100);

                    return () => clearTimeout(timeout);
                }
                setSunHeight(yPos);
            } else {
                const timeout = setTimeout(() => {
                    setSunOpacity(0);
                }, 100);

                return () => clearTimeout(timeout);
            }
        }
    }, [sunOpacity, yPos]);

    const handleButtonClick = () => {
        window.location.href = '/MaCSS/Collections';
    };

    const [isHovered, setIsHovered] = useState(false);
    const [buttonColor, setButtonColor] = useState('#fbf1f1');
    const buttonRef = useRef(null);

    const handleMouseMove = useCallback((event) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const isWithinButton = (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            );
            setIsHovered(isWithinButton);
            setButtonColor(isWithinButton ? '#ff69b4' : '#fe8aa2');
        }
    }, []);

    const handleMouseClick = useCallback((event) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const isWithinButton = (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            );
            if (isWithinButton) {
                handleButtonClick();
            }
        }
    }, []);

    useEffect(() => {
        updateSunSize();
        updateSunHeight();

        window.addEventListener('resize', updateSunSize);
        window.addEventListener('mousemove', updateSunHeight);
        window.addEventListener('scroll', updateSunHeight);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleMouseClick);

        return () => {
            window.removeEventListener('resize', updateSunSize);
            window.removeEventListener('mousemove', updateSunHeight);
            window.removeEventListener('scroll', updateSunHeight);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleMouseClick);
        };
    }, [updateSunHeight, handleMouseMove, handleMouseClick]);

    return (
        <div ref={ref} className='header-macss'>
            <img ref={skyBackgroundRef} src={SkyBackground} alt="Untitled" />
            <motion.div 
                ref={sun}
                className='sun-container' 
                animate={skyVariant}
                transition={tweenBackout}
            >
                <motion.div 
                    className='sun'
                    animate={sunVariant}
                    transition={tweenBackout}
                ></motion.div>
            </motion.div>
            <motion.div 
                ref={cloud2}
                className='background-img-container background-2'
                style={{ backgroundPositionY: cloud2Transform }}
            ></motion.div>
            <motion.div 
                ref={cloud1} 
                className='background-img-container background-3'
                style={{ backgroundPositionY: cloud1Transform }}
            ></motion.div>
            <motion.div 
                ref={mountain2} 
                className='background-img-container background-4'
                style={{ backgroundPositionY: mountain2TransformY, backgroundPositionX: mountain2TransformX }}
            ></motion.div>
            <div className='background-img-container background-5'>
                <motion.h1 
                    ref={title}
                    className='title'
                    style={{ y: titleTransform }}
                >
                    MaCSS Collections
                    <motion.button
                        ref={buttonRef}
                        style={{ color: buttonColor }}
                        className='collections-button'
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        &bull;&emsp;Go to Collections&emsp;&bull;
                    </motion.button>
                </motion.h1>
                
                
            </div>
            <motion.div 
                ref={mountain1} 
                className='background-img-container background-6'
                style={{ backgroundPositionY: mountain1TransformY, backgroundPositionX: mountain1TransformX }}
            ></motion.div>
            <motion.div 
                ref={pondok} 
                className='background-img-container background-7'
                style={{ backgroundPositionY: pondokTransformY, backgroundPositionX: pondokTransformX }}
            ></motion.div>
            <motion.div 
                ref={land2} 
                className='background-img-container background-8'
                style={{ backgroundPositionY: land2Transform }}
            ></motion.div>
            <motion.div 
                ref={land1} 
                className='background-img-container background-9'
            ></motion.div>
        </div>
    );
});

export default Header;