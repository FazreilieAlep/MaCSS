// Defaults import
import React, { useRef, useState, useCallback, useEffect } from 'react';
import useMouse from '@react-hook/mouse-position';
import { motion, useScroll } from 'framer-motion';
import './MaCSS.css';

// custom hooks import
import useScrollPosition from '../utils/useScrollPosition.js';

// Layouts import
import Header from '../components/layout/MaCSS/MainLayer/Header/Header.js';
import AboutMe from '../components/layout/MaCSS/MainLayer/AboutMe/AboutMe.js';
import AboutSite from '../components/layout/MaCSS/MainLayer/AboutSite/AboutSite.js';
import Project from '../components/layout/MaCSS/MainLayer/Project/Project.js';
import Quotes from '../components/layout/MaCSS/MainLayer/Quotes/Quotes.js';
import Footer from '../components/layout/MaCSS/MainLayer/Footer/Footer.js';

import AboutMeMask from '../components/layout/MaCSS/MaskLayer/AboutMeMask/AboutMeMask.js';
import AboutSiteMask from '../components/layout/MaCSS/MaskLayer/AboutSiteMask/AboutSiteMask.js';
import QuotesMask from '../components/layout/MaCSS/MaskLayer/QuoteMask/QuoteMask.js';
import FooterMask from '../components/layout/MaCSS/MaskLayer/FooterMask/FooterMask.js';

import Navbar from '../components/layout/MaCSS/Navbar/Navbar.js';
import Navbar2 from '../components/layout/MaCSS/Navbar2/Navbar2.js';

// Assets import
import circleMask from '../assets/styles/masks/circle.svg';
import sakura2Mask from '../assets/styles/masks/sakura2.svg';
import sakuraMask from '../assets/styles/masks/sakura.svg';

function MaCSS() {

    // References
    const pageRef = useRef(null);

    const mainLayerRef = useRef(null);
    const headerRef = useRef(null); 
    const aboutMeRef = useRef(null);
    const aboutSiteRef = useRef(null);
    const projectRef = useRef(null);
    const quoteRef = useRef(null); 
    const footerRef = useRef(null);

    const maskLayerRef = useRef(null);

    // Borders
    const [mainLayerBorder, setMainLayerBorder] = useState(0);
    const [headerBorder, setHeaderBorder] = useState(0); 
    const [aboutMeBorder, setAboutMeBorder] = useState(0);
    const [aboutSiteBorder, setAboutSiteBorder] = useState(0);
    const [projectBorder, setProjectBorder] = useState(0);
    const [quoteBorder, setQuoteBorder] = useState(0); 
    const [footerBorder, setFooterBorder] = useState(0); 

    // CURSOR
    const { scrollY, scrollYProgress } = useScroll(); // for framer motion
    const scrollPosition = useScrollPosition(); // smoother y tracking while scroll
    const mouse = useMouse(pageRef, {
        // enterDelay: 1000,
        // leaveDelay: 1000
    });
    const [lastXPos, setLastXPos] = useState(window.innerWidth/2);
    const [lastYPos, setLastYPos] = useState(window.innerHeight/4);

    const [isMask, setIsMask] = useState(false);
    const [maskSize, setMaskSize] = useState(0);
    const [maskOpacity, setMaskOpacity] = useState(0);
    const [maskImage, setMaskImage] = useState(sakura2Mask);


    const changeCursor = useCallback(() => {
        const cursorLogic = () => {
            if (lastYPos >= headerBorder && lastYPos < aboutMeBorder) {
                if (maskImage !== sakura2Mask) {
                    setMaskOpacity(0);
                    const timeout = setTimeout(() => {
                        setMaskImage(sakura2Mask);
                        setMaskOpacity(1);
                        // initialMaskSize();
                    }, 200);

                    return () => clearTimeout(timeout);
                }
            }

            if (lastYPos >= aboutMeBorder && lastYPos < aboutSiteBorder) {
                if (maskImage !== sakuraMask) {
                    setMaskOpacity(0);
                    const timeout = setTimeout(() => {
                        setMaskImage(sakuraMask);
                        setMaskOpacity(1);
                        // initialMaskSize();
                    }, 200);

                    return () => clearTimeout(timeout);
                }
            }

            if (lastYPos >= projectBorder && lastYPos < quoteBorder) {
                if (maskImage !== circleMask) {
                    setMaskOpacity(0);
                    const timeout = setTimeout(() => {
                        setMaskImage(circleMask);
                        setMaskOpacity(1);
                        // initialMaskSize();
                    }, 200);

                    return () => clearTimeout(timeout);
                }
            }
        };

        if (lastYPos < headerBorder || (lastYPos >= aboutSiteBorder && lastYPos < projectBorder) || lastYPos >= quoteBorder) {
            if (isMask) {
                const timeout = setTimeout(() => {
                    setIsMask(false);
                    setMaskOpacity(0);
                }, 200);

                return () => clearTimeout(timeout);
            }
        } else {
            if (!isMask) {
                setIsMask(true);
                cursorLogic();
                setMaskOpacity(1);
            }
            cursorLogic();
        }
    }, [lastYPos, headerBorder, aboutMeBorder, aboutSiteBorder, isMask, maskImage, projectBorder, quoteBorder]);

    const updateCursorLastPosMove = useCallback(() => {
        if (mouse.pageX && mouse.pageY) {
            setLastXPos(mouse.pageX);
            setLastYPos(mouse.pageY);
            changeCursor();
        }
    }, [mouse.pageX, mouse.pageY, changeCursor]);

    const updateCursorLastPosScroll = useCallback(() => {
        if (mouse.clientY) {
            const absY = mouse.clientY + scrollY.current;
            setLastYPos(absY);
            changeCursor();
        }
    }, [mouse.clientY, scrollY, changeCursor]);

    const updateLayout = useCallback(() => {
        if (headerRef.current && aboutMeRef.current && aboutSiteRef.current && projectRef.current && quoteRef.current) {
            const dummyHeaderLayout = document.querySelector('.dummy-header-layout');
            if (dummyHeaderLayout) {
                dummyHeaderLayout.style.height = `${headerRef.current.offsetHeight}px`;
            }

            const aboutMeMaskLayout = document.querySelector('.aboutme-mask');
            if (aboutMeMaskLayout) {
                aboutMeMaskLayout.style.height = `${aboutMeRef.current.offsetHeight}px`;
            }

            const aboutSiteMaskLayout = document.querySelector('.aboutsite-mask');
            if (aboutSiteMaskLayout) {
                aboutSiteMaskLayout.style.height = `${aboutSiteRef.current.offsetHeight}px`;
            }            
            
            const dummyProjectLayout = document.querySelectorAll('.dummy-project-layout');
            if (dummyProjectLayout.length > 0) {
                dummyProjectLayout.forEach(element => {
                    element.style.height = `${projectRef.current.offsetHeight}px`;
                });
            }

            const quotesMaskLayout = document.querySelector('.quotes-mask');
            if (quotesMaskLayout) {
                quotesMaskLayout.style.height = `${quoteRef.current.offsetHeight}px`;

                const quotesMaskContent = quotesMaskLayout.querySelector('.content');
                if (quotesMaskContent) {
                    quotesMaskContent.style.width = `${quoteRef.current.querySelector('.content').offsetWidth}px`;
                }
            }

            const dummyFooterLayout = document.querySelector('.dummy-footer-layout');
            if (dummyFooterLayout) {
                dummyFooterLayout.style.height = `${footerRef.current.offsetHeight}px`;
            }

            const footerLayout = document.querySelector('.footer-mask');
            if (footerLayout) {
                footerLayout.style.height = `${footerRef.current.offsetHeight}px`;
            } 

            calculateBorders();
        }
    }, []);

    const calculateBorders = () => {
        if (headerRef.current && aboutMeRef.current && aboutSiteRef.current &&  projectRef.current && quoteRef.current && footerRef.current ) {
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
    
            const headerHeight = calculateTotalHeight(headerRef.current);
            const aboutMeHeight = calculateTotalHeight(aboutMeRef.current);
            const aboutSiteHeight = calculateTotalHeight(aboutSiteRef.current);
            const projectHeight = calculateTotalHeight(projectRef.current);
            const quoteHeight = calculateTotalHeight(quoteRef.current);
    
            setHeaderBorder(headerHeight);
            setAboutMeBorder(headerHeight + aboutMeHeight);
            setAboutSiteBorder(headerHeight + aboutMeHeight + aboutSiteHeight);
            setProjectBorder(headerHeight + aboutMeHeight + aboutSiteHeight + projectHeight);
            setQuoteBorder(headerHeight + aboutMeHeight + aboutSiteHeight + projectHeight + quoteHeight);

            projectRef.current.style.top = `${headerHeight + aboutMeHeight + aboutSiteHeight}px`;
            footerRef.current.style.top = `${headerHeight + aboutMeHeight + aboutSiteHeight + quoteHeight}px`;
        }
    };

    const initialMaskSize = () => {
        if (pageRef.current) {
            setMaskSize(pageRef.current.getBoundingClientRect().width / 10);
        }
    };

    const scaleMaskSize = () => {
        if (pageRef.current) {
            setMaskSize(pageRef.current.getBoundingClientRect().width / 4);
        }
    };

    useEffect(() => {
        updateCursorLastPosMove();
        updateCursorLastPosScroll();
        updateLayout();

        window.addEventListener('resize', updateLayout);
        window.addEventListener('resize', initialMaskSize);
        window.addEventListener('mousemove', updateCursorLastPosMove);
        window.addEventListener('scroll', updateCursorLastPosScroll);
        return () => {
            window.removeEventListener('resize', updateLayout);
            window.removeEventListener('resize', initialMaskSize);
            window.removeEventListener('mousemove', updateCursorLastPosMove);
            window.removeEventListener('scroll', updateCursorLastPosScroll);
        };
    }, [updateCursorLastPosMove, updateCursorLastPosScroll, updateLayout]);
    

    const cursorVariant = {
        WebkitMaskPosition: `${mouse.clientX != null ? mouse.pageX - maskSize / 2 : lastXPos - maskSize}px ${mouse.clientY != null ? (mouse.clientY + scrollPosition) - maskSize / 2 : lastYPos}px`,
        WebkitMaskSize: `${maskSize}px`,
        opacity: maskOpacity,
        WebkitMaskImage: `url(${maskImage})`
    };

    const tweenBackOut = {
        type: "tween", 
        ease: "backOut", 
        duration: 0.5
    };

    const [isScaled, setIsScaled] = useState(false);

    function handleMouseEnter(event) {
        console.log('Enter');
        if (!isScaled) {
            console.log('ScaleUP');
            scaleMaskSize();
            setIsScaled(true);
        }
    }

    function handleMouseLeave(event) {
        console.log('Leave');
        if (isScaled) {
            console.log('ScaleDown');
            initialMaskSize();
            setIsScaled(false); 
        }
    }

    // useEffect(() => {
    //     console.log(scrollY.current);
    // });

    return (
        <div ref={pageRef} className='MaCSS-page'>
            
            <Navbar></Navbar>
            <Navbar2></Navbar2>
            {/* Main Layer */}
            <div ref={mainLayerRef} className='main-layer-container'>
                <Header 
                    ref={headerRef}
                    xPos={lastXPos} 
                    yPos={mouse.clientY != null ? mouse.clientY + scrollPosition : lastYPos} 
                    scrollY={scrollY}
                ></Header>
                <AboutMe ref={aboutMeRef}></AboutMe>
                <AboutSite ref={aboutSiteRef}></AboutSite>
                <div className='dummy-project-layout'></div>
                <Quotes ref={quoteRef} ></Quotes>
                {/* <div className='dummy-footer-layout'></div> */}
            </div>

            {/* Mask Layer */}
            <motion.div ref={maskLayerRef} 
                className='mask-layer-container'
                animate={cursorVariant}
                transition={tweenBackOut}
            >
                <div className='dummy-header-layout'></div>
                <AboutMeMask onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></AboutMeMask>
                <AboutSiteMask onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></AboutSiteMask>
                <div className='dummy-project-layout'></div>
                <QuotesMask onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></QuotesMask>
                {/* <div className='dummy-footer-layout'></div> */}
                {/* <FooterMask></FooterMask> */}
            </motion.div>

            {/* None Mask Related Layout */}
            <Project ref={projectRef}></Project>
            <Footer ref={footerRef}></Footer>

            {/* filter layer that changes on sun height,, later update only until project section or give it a gradient*/}
            {/* <div className='filterLayer'></div> */}
        </div>
    );
}

export default MaCSS;
