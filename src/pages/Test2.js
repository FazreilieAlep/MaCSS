// Defaults import
import React, { useEffect, useCallback, useRef, useState } from 'react';
import useMouse from "@react-hook/mouse-position";
import { motion, useTransform, useScroll } from "framer-motion";
import './Test2.css';

// custom hooks import
import useScrollPosition from '../utils/useScrollPosition.js';

// Assets import
import SkyBackground from '../assets/images/home/sky.png';
import videoBackground1 from '../assets/videos/7805254-uhd_1440_2560_25fps.mp4';
import videoBackground2 from '../assets/videos/fantasy-warrior-cherry-blossom-moewalls-com.mp4';
import circleMask from '../assets/styles/masks/circle.svg';
import sakura2Mask from '../assets/styles/masks/sakura2.svg';
import sakuraMask from '../assets/styles/masks/sakura.svg';


function Test2() {
    // DOM references
    const pageRef = useRef(null);

    const faceRef = useRef(null);
    const maskRef = useRef(null);
    
    const mainRef = useRef(null);
    const mainConRef = useRef(null);
    const maskMainRef = useRef(null);
    const maskMainConRef = useRef(null);

    const about1Ref = useRef(null);
    const about1ConRef = useRef(null);
    const maskAbout1Ref = useRef(null);
    const maskAbout1ConRef = useRef(null);

    const about2Ref = useRef(null);
    const about2ConRef = useRef(null);
    const maskAbout2Ref = useRef(null);
    const maskAbout2ConRef = useRef(null);

    // Element references
    const title = useRef(null);
    const sun = useRef(null);
    const cloud1 = useRef(null);
    const cloud2 = useRef(null);
    const mountain1 = useRef(null);
    const mountain2 = useRef(null);
    const pondok = useRef(null);
    const land1 = useRef(null);
    const land2 = useRef(null);

    const videoRef = useRef(null);
    const videoRef2 = useRef(null);

    // Dimension State
    const [faceMainDimensions, setFaceMainDimensions] = useState({ width: 'auto', height: 'auto' });
    const [maskMainDimensions, setMaskMainDimensions] = useState({ width: 'auto', height: 'auto' });
    const [mainBorder, setMainBorder] = useState(0);

    const [faceAbout1Dimensions, setFaceAbout1Dimensions] = useState({ width: 'auto', height: 'auto' });
    const [maskAbout1Dimensions, setMaskAbout1Dimensions] = useState({ width: 'auto', height: 'auto' });
    const [about1Border, setAbout1Border] = useState(0);
    const [faceAbout1ConDimensions, setFaceAbout1ConDimensions] = useState({ width: 'auto', height: 'auto' });
    const [maskAbout1ConDimensions, setMaskAbout1ConDimensions] = useState({ width: 'auto', height: 'auto' });

    const [faceAbout2Dimensions, setFaceAbout2Dimensions] = useState({ width: 'auto', height: 'auto' });
    const [maskAbout2Dimensions, setMaskAbout2Dimensions] = useState({ width: 'auto', height: 'auto' });
    const [about2Border, setAbout2Border] = useState(0);


    // Element State
    const [sunSize, setSunSize] = useState(100);
    const [sunSizeNorm, setSunSizeNorm] = useState(0);
    const [sunHeight, setSunHeight] = useState(0);

    const [maskSize, setMaskSize] = useState(0);
    const [maskSizeNorm, setMaskSizeNorm] = useState(0);
    const [maskSizeScale, setMaskSizeScale] = useState(0);
    const [maskOpacity, setMaskOpacity] = useState(0);
    const [maskImage, setMaskImage] = useState(circleMask);

    // CURSOR
    const { scrollY } = useScroll();
    const scrollPosition = useScrollPosition(); // KIV
    const mouse = useMouse(pageRef, {
        // enterDelay: 1000,
        // leaveDelay: 1000
    });
    const [lastXPos, setLastXPos] = useState(20);
    const [lastYPos, setLastYPos] = useState(20);

    const [isMask, setIsMask] = useState(false);

    const changeCursor = useCallback(() => {
        if (lastYPos < mainBorder || lastYPos >= about2Border) {
            if (isMask) {
                const timeout = setTimeout(() => {
                    setIsMask(false);
                    setMaskOpacity(0);
                    setSunSize(sunSizeNorm);
                }, 100);

                return () => clearTimeout(timeout);
            }
        } else {
            if (!isMask) {
                const timeout = setTimeout(() => {
                    setIsMask(true);
                    setMaskOpacity(1);
                    setSunSize(0);
                }, 100);

                return () => clearTimeout(timeout);
            }

            if (lastYPos >= mainBorder && lastYPos < about2Border) {
                if (maskImage !== sakura2Mask) {
                    setMaskSize(0);
                    const timeout = setTimeout(() => {
                        setMaskImage(sakura2Mask);
                        setMaskSize(maskSizeNorm);
                    }, 250);

                    return () => clearTimeout(timeout);
                }
            }
        }
    }, [lastYPos, mainBorder, about2Border, isMask, maskImage, maskSizeNorm, sunSizeNorm]);



    const updateCursorLastPosMove = useCallback(() => {
        if (mouse.pageX && mouse.pageY) {
            setLastXPos(mouse.pageX);
            setLastYPos(mouse.pageY);

            if (mouse.pageY < mainBorder) {
                setSunHeight(mouse.pageY);
            }

            changeCursor();
        }
    }, [mouse.pageX, mouse.pageY, mainBorder, changeCursor]);

    const updateCursorLastPosScroll = useCallback(() => {
        if (mouse.clientY) {
            const absY = mouse.clientY + scrollPosition;
            setLastYPos(absY);

            if (absY < mainBorder) {
                setSunHeight(absY);
            }

            changeCursor();
        }
    }, [mouse.clientY, scrollPosition, mainBorder, changeCursor]);

    // ANIMATIONS

    /**
     * Interpolates between two colors based on a given ratio.
     * @param {string} startColor - The starting color in hex format.
     * @param {string} endColor - The ending color in hex format.
     * @param {number} ratio - The interpolation ratio between the two colors.
     * @returns {string} - The interpolated color in hex format.
     */
    const interpolateBetweenColors = (startColor, endColor, ratio) => {
        const r = Math.round(parseInt(startColor.slice(1, 3), 16) * (1 - ratio) + parseInt(endColor.slice(1, 3), 16) * ratio);
        const g = Math.round(parseInt(startColor.slice(3, 5), 16) * (1 - ratio) + parseInt(endColor.slice(3, 5), 16) * ratio);
        const b = Math.round(parseInt(startColor.slice(5, 7), 16) * (1 - ratio) + parseInt(endColor.slice(5, 7), 16) * ratio);
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    /**
     * Interpolates color based on a position within a given range.
     * @param {number} y - The position value to interpolate from.
     * @param {Array} colorStops - An array of color stops with associated positions.
     * @returns {string} - The interpolated color in hex format.
     */
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

    // Define color stops for both functions
    const colorStops1 = [
        { stop: 0, color: '#62c1e5' },
        { stop: 0.2, color: '#93ddee' },
        { stop: 1, color: '#ffa500' }
    ];

    const colorStops2 = [
        { stop: 0, color: '#ffffff' },
        { stop: 1, color: '#ffa500' }
    ];

    // Use the optimized function for both color interpolations
    const skyBackgroundColor = interpolateColor(sunHeight, colorStops1);
    const sunColor = interpolateColor(sunHeight, colorStops2);

    const skyVariant = {
        background: `linear-gradient(${skyBackgroundColor} , #ffffff)` // Gradients can be modified as needed
    };

    const sunVariant = {
        backgroundColor: sunColor,
        height: `${sunSize}px`,
        width: `${sunSize}px`,
        top: `${mouse.clientY != null ? mouse.clientY + scrollPosition - sunSize/2 : lastYPos}px`,
        // top: `${mouse.clientY != null && sunHeight < mainBorder ? mouse.clientY + scrollY.scrollY - sunSize/2 : sunHeight}px`,
        left: `${mouse.clientX != null ? mouse.pageX - sunSize/2 : lastXPos}px`
    };

    const cursorVariant = {
        WebkitMaskPosition: `${mouse.clientX != null ? mouse.pageX - maskSize / 2 : lastXPos}px ${mouse.clientY != null ? (mouse.clientY + scrollPosition) - maskSize / 2 : lastYPos}px`,
        // WebkitMaskPosition: `${mouse.pageX - maskSize / 2}px ${(mouse.clientY + scrollPosition) - maskSize / 2}px`, // this still works for returning to initial screen position
        WebkitMaskSize: `${maskSize}px`,
        opacity: maskOpacity,
        WebkitMaskImage: `url(${maskImage})`
    };

    const tweenBackout = {
        type: "tween", 
        ease: "backOut", 
        duration: 0.5
    };

    // React.useTransform
    const titleTransform = useTransform(scrollY, [0, 80], [ '0vh', '100vh']);
    const cloud1Transform = useTransform(scrollY, [0, 200], ['0vh', '100vh']);
    const mountain2TransformY = useTransform(scrollY, [0, 500], ['0vh', '100vh']);
    const mountain2TransformX = useTransform(scrollY, [0, 500], ['0vh', '-50vh']);
    const cloud2Transform = useTransform(scrollY, [0, 600], ['0vh', '100vh']);
    const mountain1TransformY = useTransform(scrollY, [0, 800], ['0vh', '100vh']);
    const mountain1TransformX = useTransform(scrollY, [0, 800], ['0vh', '100vh']);
    const pondokTransformY = useTransform(scrollY, [0, 1000], ['0vh', '100vh']);
    const pondokTransformX = useTransform(scrollY, [0, 1000], ['0vh', '100vh']);
    const land2Transform = useTransform(scrollY, [0, 1200], ['0vh', '100vh']);

    // React.useEffect()
    useEffect(() => {
        /**
         * Adjust the dimensions of corelated Face and Mask layer based on respective child element size and maximum of the dimensions
         * @param {useRef} childfaceRef - ref to Face child element
         * @param {useRef} childmaskRef - ref to Mask child element
         * @param {useState} parentSetFaceDimensions - set state of parent Face dimensions
         * @param {useState} parentSetMaskDimensions - set state of parent Mask dimensions
         * @returns {None}
         */
        const setDimensions = (parentFaceRef, parentMaskRef, parentSetFaceDimensions, parentSetMaskDimensions) => {
            if (parentFaceRef.current && parentMaskRef.current) {
                const calculateTotalDimensions = (element) => {
                    const rect = element.getBoundingClientRect();
                    const style = getComputedStyle(element);
                    
                    const width = rect.width + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                    const height = rect.height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            
                    return { width, height };
                };
        
                const calculateTotalDimensionsForChildren = (parent) => {
                    let totalWidth = 0;
                    let totalHeight = 0;
                    const children = parent.children;

                    for (let i = 0; i < children.length; i++) {
                        const dimensions = calculateTotalDimensions(children[i]);
                        totalWidth = Math.max(totalWidth, dimensions.width);
                        totalHeight += dimensions.height;
                    }
        
                    return { width: totalWidth, height: totalHeight };
                };
        
                const faceDimensions = calculateTotalDimensionsForChildren(parentFaceRef.current);
                const maskDimensions = calculateTotalDimensionsForChildren(parentMaskRef.current);
                
        
                const maxWidth = Math.max(faceDimensions.width, maskDimensions.width);
                const maxHeight = Math.max(faceDimensions.height, maskDimensions.height);
        
                parentSetFaceDimensions({ width: maxWidth, height: maxHeight });
                parentSetMaskDimensions({ width: maxWidth, height: maxHeight });
            }
        };        

        const calculateBorders = () => {
            if (mainRef.current && about1Ref.current && about2Ref.current ) {
                const calculateTotalHeight = (element) => {
                    const rect = element.getBoundingClientRect();
                    const style = getComputedStyle(element);
                    
                    const height = rect.height
                        + parseFloat(style.paddingTop)
                        + parseFloat(style.paddingBottom)
                        + parseFloat(style.borderTopWidth)
                        + parseFloat(style.borderBottomWidth);
        
                    return height;
                };
        
                const mainHeight = calculateTotalHeight(mainRef.current);
                const about1Height = calculateTotalHeight(about1Ref.current);
                const about2Height = calculateTotalHeight(about2Ref.current);
        
                setMainBorder(mainHeight);
                setAbout1Border(mainHeight + about1Height);
                setAbout2Border(mainHeight + about1Height + about2Height);
            }
        };
        

        const updateDimensions = () => {
            // change to auto
            const timeout = setTimeout(() => {
                setSunSize(sunSizeNorm);
                setFaceAbout1ConDimensions({width: 'auto', height: 'auto'});
                setMaskAbout1ConDimensions({width: 'auto', height: 'auto'});
                setFaceMainDimensions({width: 'auto', height: 'auto'});
                setMaskMainDimensions({width: 'auto', height: 'auto'});
                setFaceAbout1Dimensions({width: 'auto', height: 'auto'});
                setMaskAbout1Dimensions({width: 'auto', height: 'auto'});
                setFaceAbout2Dimensions({width: 'auto', height: 'auto'});
                setMaskAbout2Dimensions({width: 'auto', height: 'auto'});
            }, 100);
        
            const timeout2 = setTimeout(() => {
                // update state after auto re-render
                if (mainRef.current && maskMainRef.current && mainConRef.current && maskMainConRef.current &&
                    about1ConRef.current && maskAbout1ConRef.current
                ) {
                    setDimensions(about1ConRef, maskAbout1ConRef, setFaceAbout1ConDimensions, setMaskAbout1ConDimensions);
        
                    setDimensions(mainRef, maskMainRef, setFaceMainDimensions, setMaskMainDimensions);
                    setDimensions(about1Ref, maskAbout1Ref, setFaceAbout1Dimensions, setMaskAbout1Dimensions);
                    setDimensions(about2Ref, maskAbout2Ref, setFaceAbout2Dimensions, setMaskAbout2Dimensions);
        
                    setSunSizeNorm(mainRef.current.getBoundingClientRect().height / 7);
                    setMaskSizeNorm(mainRef.current.getBoundingClientRect().height / 7);
                    setMaskSizeScale(mainRef.current.getBoundingClientRect().height / 4);
                }
            }, 200); // Increased timeout to 200ms to ensure the previous changes are applied
        
            return () => {
                clearTimeout(timeout);
                clearTimeout(timeout2);
            };
        };
        

        const resizeCursor = () => {

            console.log(isMask);
            if (isMask === true) {
                const timeout = setTimeout(() => {
                    setMaskSize(maskSizeNorm);
                }, 100);
        
                return () => clearTimeout(timeout);
            } else if (isMask === false){
                const timeout = setTimeout(() => {
                    setSunSize(sunSizeNorm);
                }, 100);
        
                return () => clearTimeout(timeout);
            };
    
        };

        updateDimensions();
        calculateBorders();
        resizeCursor();

        window.addEventListener('resize', updateDimensions);
        window.addEventListener('resize', calculateBorders);
        window.addEventListener('resize', resizeCursor);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            window.removeEventListener('resize', calculateBorders);
            window.removeEventListener('resize', resizeCursor);
        };
    }, [mainBorder, about1Border, about2Border, mainRef, maskMainRef, mainConRef, maskMainConRef,
        about1ConRef, maskAbout1ConRef, isMask, maskSizeNorm, sunSizeNorm]);

    useEffect(() => {
        updateCursorLastPosMove();
        updateCursorLastPosScroll();

        window.addEventListener('mousemove', updateCursorLastPosMove);
        window.addEventListener('scroll', updateCursorLastPosScroll);
        return () => {
            window.removeEventListener('mousemove', updateCursorLastPosMove);
            window.removeEventListener('scroll', updateCursorLastPosScroll);
        };
    });

    // 
    function handleMouseEnter(event) {
        if (maskSize !== maskSizeScale) {
            setMaskSize(maskSizeScale);
        }
    }

    function handleMouseLeave(event) {
        if (maskSize !== maskSizeNorm) {
            setMaskSize(maskSizeNorm);
        }
    }


    // useEffect(() => {
    //     console.log(faceMainDimensions);
    //     console.log(maskMainDimensions);
    // }, [faceMainDimensions, maskMainDimensions]);

    return (
        <div ref={pageRef} className='test-2-page-container'>
            {/* FACE */}
            <div ref={faceRef} id='face' className='layer-container'>
                <div
                    ref={mainRef}
                    id='main'
                    className='content-container'
                    style={{ height: `${faceMainDimensions.height}px` }}
                >
                    <div ref={mainConRef}>
                        <img src={SkyBackground} className="static" alt="Untitled" />
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
                            >MaCSS Collections</motion.h1>
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
                </div>

                <div ref={about1Ref} id='about1' 
                    className='content-container'
                    style={{ height: `${faceAbout1Dimensions.height}px` }}
                >
                    <div ref={about1ConRef} 
                        className='content'
                        style={{ height: `${faceAbout1ConDimensions.height }px` }}
                    >
                        <h4 className='title-small'>
                            ABOUT
                        </h4>
                        <h2>
                            Proof I'm
                        </h2>
                        <h2>
                            <span>The Best Frontend Developer</span>
                        </h2>
                        <h2>
                            in Malaysia (for real)
                        </h2>
                    </div>
                </div>

                {/* <div ref={about2Ref} id='about2' 
                    className='content-container'
                    style={{ height: `${faceAbout2Dimensions.height}px` }}
                >
                    <div ref={about2ConRef} 
                        className='content'
                        style={{ height: `${faceAbout2ConDimensions.height }px` }}
                    >
                        <div className="video-background-1">
                            <video autoPlay muted loop ref={videoRef}>
                                <source src={videoBackground1} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div>
                            <h4 className='title-small'>
                                WHAT THIS SITE DO
                            </h4>
                            <h2>
                                Displaying My <span>Sole Proprietorship's</span> CSS Design <span>Masterpieces</span>
                            </h2>
                        </div>
                    </div>
                </div> */}
            </div>

            {/* MASK */}
            <motion.div ref={maskRef} 
                id='mask' 
                className='layer-container'
                animate={cursorVariant}
                transition={tweenBackout}
            >
                <div ref={maskMainRef} id='mask-main' 
                    className='content-container'
                    style={{ height: `${maskMainDimensions.height}px` }}
                >
                    <div ref={maskMainConRef}
                        className='content'
                    >
                        {/* <h3>{sunHeight} MASK MAIN {mainBorder}</h3>
                        <button>force-rerender</button> */}
                    </div>
                </div>

                <div ref={maskAbout1Ref} id='mask-about1' 
                    className='content-container'
                    style={{ height: `${maskAbout1Dimensions.height}px` }}
                >
                    <div ref={maskAbout1ConRef}
                        onMouseOver={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='content'
                        style={{ height: `${maskAbout1ConDimensions.height}px`, height: `${maskAbout1ConDimensions.height}px` }}
                    >
                        <h4 className='title-small'>
                            ABOUT
                        </h4>
                        <h2>
                            Nah, I'm 
                        </h2>
                        <h2>
                            a COPY NINJA EXPERT with
                        </h2>
                        <h2>
                            Artifial Intelligence as my crime partner 🦹‍♂️
                        </h2>
                    </div>
                </div>

                {/* <div ref={maskAbout2Ref} id='mask-about2' 
                    className='content-container'
                    style={{ height: `${maskAbout2Dimensions.height}px` }}
                >
                    <div ref={maskAbout2ConRef}
                        onMouseOver={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='content flex-center'
                    >
                        <div>
                            <h4 className='title-small'>
                                WHAT THIS SITE DO
                            </h4>
                            <h2>
                                Flexing My frontend dev skills [I just steal other design ideas tho]
                            </h2>
                        </div>
                    </div>
                </div> */}

            </motion.div>
        </div>
    );
}

export default Test2;
