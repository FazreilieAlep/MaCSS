import React, { useEffect, useRef, useState, forwardRef } from 'react';
import useMouse from "@react-hook/mouse-position";
import useScrollPosition from '../utils/useScrollPosition.js';
import useSyncDimensions from '../utils/useSyncDimensions.js';
import './Test.css';
import PointerParticles from '../components/specific/cursor/PointerParticle1/PointerParticles.js';
import Navbar from '../components/layout/Navbar/Navbar.js';
import Navbar2 from '../components/layout/Navbar2/Navbar2.js';
import Footer from '../components/layout/Footer/Footer.js';
import SkyBackground from '../assets/images/home/sky.png';
import videoBackground1 from '../assets/videos/7805254-uhd_1440_2560_25fps.mp4';
import videoBackground2 from '../assets/videos/fantasy-warrior-cherry-blossom-moewalls-com.mp4';
import circleMask from '../assets/styles/masks/circle.svg';
import sakura2Mask from '../assets/styles/masks/sakura2.svg';
import sakuraMask from '../assets/styles/masks/sakura.svg';
import { motion, useTransform, useScroll } from "framer-motion";

function Test() {
    // Elements References
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

    const faceMainSec = useRef(null);
    const maskMainSec = useRef(null);
    
    const faceSec1 = useRef(null);
    const maskSec1 = useRef(null);
    const faceSec2 = useRef(null);
    const maskSec2 = useRef(null);
    const faceSec3 = useRef(null);
    const maskSec3 = useRef(null);
    const faceSec4 = useRef(null);
    const maskSec4 = useRef(null);

    const faceDiv1 = useRef(null);
    const maskDiv1 = useRef(null);
    const faceDiv2 = useRef(null);
    const maskDiv2 = useRef(null);
    const faceDiv3 = useRef(null);
    const maskDiv3 = useRef(null);
    const faceDiv4 = useRef(null);
    const maskDiv4 = useRef(null);

    const faceFooter = React.createRef();
    const maskFooter = useRef(null);

    // Cursor State 
    const { scrollY } = useScroll();
    const [isMask, setIsMask] = useState(false);
    const maskRef = useRef(null); // maskRef --> cursorRef
    const [maskSize, setMaskSize] = useState(40);
    const [maskOpacity, setMaskOpacity] = useState(0);
    const [lastXPos, setLastXPos] = useState(20);
    const [lastYPos, setLastYPos] = useState(20);
    const [maskImage, setMaskImage] = useState(circleMask);
    const [sunSize, setSunSize] = useState(100);
    const [blurring, setBlurring] = useState(false);
    const maskSizeScale = 300;
    const maskSizeNormal = 40;

    const ref = React.useRef(null);
    const mouse = useMouse(ref, {
        // enterDelay: 1000,
        // leaveDelay: 1000
    });
    const scrollPosition = useScrollPosition();

    // Dimension Set
    const [mainDimensions, setMainDimensions] = useState({ width: 0, height: 0 }); // main section
    const [div1Dimensions, setDiv1Dimensions] = useState({ width: 'auto', height: 'auto' }); // section 1
    const [div2Dimensions, setDiv2Dimensions] = useState({ width: 'auto', height: 'auto' }); // section 2
    const [div3Dimensions, setDiv3Dimensions] = useState({ width: 'auto', height: 'auto' }); // section 3
    const [div4Dimensions, setDiv4Dimensions] = useState({ width: 'auto', height: 'auto' }); // section 4
    const [footerDimensions, setFooterDimensions] = useState({ width: 'auto', height: 'auto' }); // footer

    
    // Function to calculate borders based on dimensions
    const [mainSectionBorder, setMainSectionBorder] = useState(0)
    const [section1Border, setSection1Border] = useState(0)
    const [section2Border, setSection2Border] = useState(0)
    const [section3Border, setSection3Border] = useState(0)
    const [section4Border, setSection4Border] = useState(0)

    const cursorVariant = {
        WebkitMaskPosition: `${mouse.clientX != null ? mouse.pageX - maskSize / 2 : lastXPos}px ${mouse.clientY != null ? (mouse.clientY + scrollPosition) - maskSize / 2 : lastYPos}px`,
        // WebkitMaskPosition: `${mouse.pageX - maskSize / 2}px ${(mouse.clientY + scrollPosition) - maskSize / 2}px`, // this still works for returning to initial screen position
        WebkitMaskSize: `${maskSize}px`,
        opacity: maskOpacity,
        WebkitMaskImage: `url(${maskImage})`
    };

    // Sky Animation
    const interpolateColor = (y) => {
        // Define color stops and ranges
        const colors = [
            { stop: 0, color: '#62c1e5' },
            { stop: 0.2, color: '#93ddee' }, // Blue
            { stop: 1, color: '#ffa500' }, // Orange
        ];
    
        // Calculate the position in the range
        const range = Math.min(1, Math.max(0, y / window.innerHeight));
        let color = '';
    
        // Find the two closest colors
        for (let i = 0; i < colors.length - 1; i++) {
            const start = colors[i];
            const end = colors[i + 1];
            if (range >= start.stop && range <= end.stop) {
                const ratio = (range - start.stop) / (end.stop - start.stop);
                color = interpolateBetweenColors(start.color, end.color, ratio);
                break;
            }
        }
    
        return color;
    };

    const interpolateColor2 = (y) => {
        // Define color stops and ranges
        const colors = [
            { stop: 0, color: '#ffffff' },
            { stop: 1, color: '#ffa500' }, // Orange
        ];
    
        // Calculate the position in the range
        const range = Math.min(1, Math.max(0, y / window.innerHeight));
        let color = '';
    
        // Find the two closest colors
        for (let i = 0; i < colors.length - 1; i++) {
            const start = colors[i];
            const end = colors[i + 1];
            if (range >= start.stop && range <= end.stop) {
                const ratio = (range - start.stop) / (end.stop - start.stop);
                color = interpolateBetweenColors(start.color, end.color, ratio);
                break;
            }
        }
    
        return color;
    };

    // Function to interpolate between two colors
    const interpolateBetweenColors = (color1, color2, ratio) => {
        const r = Math.round(parseInt(color1.slice(1, 3), 16) * (1 - ratio) + parseInt(color2.slice(1, 3), 16) * ratio);
        const g = Math.round(parseInt(color1.slice(3, 5), 16) * (1 - ratio) + parseInt(color2.slice(3, 5), 16) * ratio);
        const b = Math.round(parseInt(color1.slice(5, 7), 16) * (1 - ratio) + parseInt(color2.slice(5, 7), 16) * ratio);
        return `rgb(${r}, ${g}, ${b})`;
    };

    // Dependend variable
    const [pageColorY, setPageColorY] = useState(0);

    const skyBackgroundColor = interpolateColor(mouse.clientY && mouse.clientY < mainSectionBorder? mouse.clientY + scrollPosition: pageColorY);
    const sunColor = interpolateColor2(mouse.clientY && mouse.clientY < mainSectionBorder ? mouse.clientY + scrollPosition: pageColorY);

    useEffect(() => {
        const mainSection = document.querySelector('.main-section');

        setLastXPos(mainSection.getBoundingClientRect().width/2);

        const yPosTemp = mainSection.getBoundingClientRect().height/9
        setLastYPos(yPosTemp);
        setPageColorY(yPosTemp);

        PointerParticles.register();

        const video = videoRef.current;
        video.playbackRate = 0.5;

        return () => {};
    }, []);

    // Mouse Animation
    useEffect(() => {
        const videoPanning = () => {
            const value = window.scrollY;
            const pageWidth = document.querySelector('.main-section').getBoundingClientRect().width;
            if (pageWidth) {
                if (pageWidth > 680) {
                    if (videoRef.current && value > 800 && value <= 2500) {
                        videoRef.current.style.objectPosition = `0 ${(-value+800) * 0.7}px`;
                    }
                } 
                else {
                    if (videoRef.current && value > 400 ) {
                        videoRef.current.style.objectPosition = `0 ${(-value+400) * 0.15}px`;
                    }
                }
            }
        }

        const updateCursorLastPos = () => {
            if (mouse.pageX){
                setLastXPos(mouse.pageX);
            }
            if (mouse.pageY) {
                setLastYPos(mouse.pageY);
                if (mouse.pageY < mainSectionBorder) {
                    setPageColorY(mouse.pageY);
                }
                changeCursor();
            }
        }

        const changeCursor = () => {
        
            const currentY = mouse.clientY + scrollPosition;
            if (currentY < mainSectionBorder || currentY >= section4Border){
                if (isMask === true){

                    const timeout = setTimeout(() => {
                        setIsMask(false);
                        setMaskOpacity(0);
                    }, 100);

                    return () => clearTimeout(timeout);
                }
            }
            else{
                if (isMask === false){
                    const timeout = setTimeout(() => {
                        setIsMask(true);
                        setMaskOpacity(1);
                    }, 100);

                    return () => clearTimeout(timeout);
                }

                if (currentY >= mainSectionBorder && currentY < section1Border){
                    if (maskImage !== sakura2Mask) {
                        setMaskSize(0)
                    
                        const timeout = setTimeout(() => {
                            setMaskImage(sakura2Mask); 
                            setMaskSize(maskSizeNormal)
                        }, 250);
    
                        return () => clearTimeout(timeout);
                    }
                }
                else if (currentY >= section1Border && currentY < section2Border){
                    if (maskImage !== sakuraMask) {
                        setMaskSize(0)
                    
                        const timeout = setTimeout(() => {
                            setMaskImage(sakuraMask); 
                            setMaskSize(maskSizeNormal)
                        }, 250);
    
                        return () => clearTimeout(timeout);
                    }
                }
                else if (currentY >= section2Border && currentY < section4Border) {
                    if (maskImage !== circleMask) {
                        setMaskSize(0)
    
                        const timeout = setTimeout(() => {
                            setMaskImage(circleMask); 
                            setMaskSize(maskSizeNormal)
                        }, 250);
    
                        return () => clearTimeout(timeout);
                    }
                }
            }
        }

        window.addEventListener('scroll', changeCursor);
        window.addEventListener('scroll', videoPanning);
        window.addEventListener('mousemove', updateCursorLastPos);

        return () => {
            window.removeEventListener('scroll', changeCursor);
            window.removeEventListener('scroll', videoPanning);
            window.removeEventListener('mousemove', updateCursorLastPos);
        };
    })

    function handleMouseEnter(event) {
        if (maskSize !== maskSizeScale) {
            setMaskSize(maskSizeScale);
        }
    }

    function handleMouseLeave(event) {
        setMaskSize(maskSizeNormal);
    }

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

    useEffect(() => {
        const calculateBorders = () => {
            if (faceMainSec.current) {
                setMainSectionBorder(faceMainSec.current.getBoundingClientRect().height);
            }
            if (faceSec1.current) {
                setSection1Border(mainSectionBorder + faceSec1.current.getBoundingClientRect().height);
            }
            if (faceSec2.current) {
                setSection2Border(section1Border + faceSec2.current.getBoundingClientRect().height);
            }
            if (faceSec3.current) {
                setSection3Border(section2Border + faceSec3.current.getBoundingClientRect().height);
            }
            if (faceSec4.current) {
                setSection4Border(section3Border + faceSec4.current.getBoundingClientRect().height);
            }
            console.log(faceMainSec.current?.getBoundingClientRect().height);
        };

        const updateMainDimension = () => {
            if (faceMainSec.current) {
                const { width, height } = faceMainSec.current.getBoundingClientRect();
                setMainDimensions({ width, height });
            }
        };

        const updateSize = () => {
            if (
                faceDiv1.current &&
                maskDiv1.current &&
                faceDiv2.current &&
                maskDiv2.current &&
                faceDiv3.current &&
                maskDiv3.current &&
                faceDiv4.current &&
                maskDiv4.current &&
                faceFooter.current &&
                maskFooter.current
            ) {
                updateMainDimension();

                const updateDimensions = (faceRef, maskRef, setDimensions) => {
                    if (faceRef.current && maskRef.current) {
                        const faceDimensions = faceRef.current.getBoundingClientRect();
                        const maskDimensions = maskRef.current.getBoundingClientRect();
                        const maxHeight = Math.max(faceDimensions.height, maskDimensions.height);
                        const maxWidth = Math.max(faceDimensions.width, maskDimensions.width);
                        setDimensions({ width: maxWidth, height: maxHeight });
                    }
                };

                updateDimensions(faceDiv1, maskDiv1, setDiv1Dimensions);
                updateDimensions(faceDiv2, maskDiv2, setDiv2Dimensions);
                updateDimensions(faceDiv3, maskDiv3, setDiv3Dimensions);
                updateDimensions(faceDiv4, maskDiv4, setDiv4Dimensions);
                updateDimensions(faceFooter, maskFooter, setFooterDimensions);

                calculateBorders();
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [mainSectionBorder, section1Border, section2Border, section3Border, section4Border, faceFooter]);

    
    // mainSectionBorder, section1Border, section2Border, section3Border, section4Border,
    // faceDiv1, faceDiv2, faceDiv3, faceSec4, 
    // maskDiv1, maskDiv2, maskDiv3, maskDiv4, 
    // faceFooter, maskFooter

    // Animations
    const skyVariant = {
        background: `linear-gradient(${skyBackgroundColor} , #ffffff)` // Gradients can be modified as needed
    };

    const sunVariant = {
        backgroundColor: sunColor,
        height: `${sunSize}px`,
        width: `${sunSize}px`,
        top: `${mouse.clientY != null ? mouse.clientY + scrollPosition - sunSize/2 : lastYPos}px`,
        left: `${mouse.clientX != null ? mouse.pageX - sunSize/2 : lastXPos}px`
    };

    const spring = {
        type: "tween", 
        ease: "backOut", 
        duration: 0.5
    };

    return (
        <div className='page-container' ref={ref}>

            <Navbar />
            <Navbar2 />

            <section ref={faceMainSec} className='main-section'>
                <div id="box">
                    <img src={SkyBackground} className="static" alt="Untitled" />
                    <motion.div 
                        ref={sun}
                        className='sun-container' 
                        animate={skyVariant}
                        transition={spring}
                        style={{ width: mainDimensions.width, height: mainDimensions.height }}
                    >
                        <motion.div 
                            className='sun'
                            animate={sunVariant}
                            transition={spring}
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
            </section>

            <section ref={faceSec1} 
                className='section-1' 
                // style={{ height: `${heightS1}px` }}
            >
                <div ref={faceDiv1} 
                    className='face-div border-section' 
                    style={{ width: `${div1Dimensions.width}px`, height: `${div1Dimensions.height}` }}
                >
                    <h4 className='title-small'>
                     {mainDimensions.height} ABOUT {mainSectionBorder}
                    </h4>
                    <h2>
                        Proof I'm
                    </h2>
                    <h2>
                        <span>The Best Frontend Developer</span>
                    </h2>
                    <h2>
                        in Malaysia (for real) asjd jasvjin aspidjijnv asidjvn iasjdvib 
                        ijs sjgnjkdnsfgk aksjfjkasn asjdngjnasg oasgnonon ondsnj
                    </h2>
                </div>
            </section>
            
            <section ref={faceSec2} 
                className='section-2'
                // style={{ height: `${heightS2}px` }}
            >
                <div className="video-background-1"
                    ref={faceDiv2}
                    style={{ width: `${div2Dimensions.width}px`, height: `${div2Dimensions.height}px` }}
                >
                    <video autoPlay muted loop ref={videoRef}>
                        <source src={videoBackground1} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='face-div'>
                    <h4 className='title-small'>
                        WHAT THIS SITE DO
                    </h4>
                    <h2>
                        Displaying My <span>Sole Proprietorship's</span> CSS Design <span>Masterpieces</span>
                    </h2>
                </div>
            </section>

            <section ref={faceSec3} 
                className='section-3'
                // style={{ height: `${heightS3}px` }}
            >
                <div ref={faceDiv3}
                    className='face-div' 
                    style={{ width: `${div3Dimensions.width}px`, height: `${div3Dimensions.height}px` }}
                >
                    other projects
                </div>
            </section>

            <section ref={faceSec4} 
                className='section-4'
                // style={{ height: `${heightS4}px` }}
            >
                <div className="video-background-1">
                    <video autoPlay muted loop ref={videoRef2}>
                        <source src={videoBackground2} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div ref={faceDiv4} 
                    className='face-div'
                    style={{ width: `${div4Dimensions.width}px`, height: `${div4Dimensions.height}px` }}
                >
                    <h4 className='title-small'>
                        MY DESIGN CONCEPT
                    </h4>
                    <h2>
                        Color <span>Harmony</span> and <span>Balance</span>
                    </h2>
                </div>
            </section>

            <Footer ref={faceFooter} 
                style={{ width: `${footerDimensions.width}px`, height: `${footerDimensions.height}px` }}
            ></Footer>


            {/* Masked Cursor */}
            <motion.div
                ref={maskRef}
                className={`mask-container ${blurring ? 'blurry' : ''}`}
                animate={cursorVariant}
                transition={spring}
            >
                {/* Masked Layer */}
                <section ref={maskMainSec} className='dummy-main-section' style={{ width: mainDimensions.width, height: mainDimensions.height }}></section>
                <section 
                    ref={maskSec1} 
                    className='mask-section-1'
                    // style={{ height: `${heightS1}px` }}
                >
                    <div
                        ref={maskDiv1}
                        onMouseOver={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='mask-div border-section-mask'
                        style={{ width: `${div1Dimensions.width}px`, height: `${div1Dimensions.height}px` }}
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
                </section>
                <section ref={maskSec2} 
                    className='mask-section-2'
                    // style={{ height: `${heightS2}px` }}
                >
                    <div
                        ref={maskDiv2}
                        onMouseOver={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='mask-div'
                        style={{ width: `${div2Dimensions.width}px`, height: `${div2Dimensions.height}px` }}
                    >
                        <h4 className='title-small'>
                            WHAT THIS SITE DO
                        </h4>
                        <h2>
                            Flexing My frontend dev skills [I just steal other design ideas tho]
                        </h2>
                    </div>
                </section>
                <section ref={maskSec3} 
                    className='mask-section-3'
                    // style={{ height: `${heightS3}px` }}
                >
                    <div ref={maskDiv3} 
                        className='mask-div'
                        style={{ width: `${div3Dimensions.width}px`, height: `${div3Dimensions.height}px` }}
                    >TEST</div>
                </section>
                <section ref={maskSec4} 
                    className='mask-section-4'
                    // style={{ height: `${heightS4}px` }}
                >
                    <div
                        ref={maskDiv4}
                        onMouseOver={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='mask-div'
                        style={{ width: `${div4Dimensions.width}px`, height: `${div4Dimensions.height}px` }}
                    >
                        <h4 className='title-small'>
                            MY DESIGN CONCEPT
                        </h4>
                        <h2>
                            Plug and Play Around
                        </h2>
                    </div>
                </section>
                <footer ref={maskFooter} 
                    className='mask-footer'
                    style={{ width: `${footerDimensions.width}px`, height: `${footerDimensions.height}px` }}
                >TEST</footer>
            </motion.div>

            {/* Cursor */}
            
        </div>
    );
}

export default Test;
