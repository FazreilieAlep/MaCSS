// Defaults import
import React, { useRef, useEffect, forwardRef } from 'react';
import './AboutSite.css';
import videoBackground from '../../../../../assets/videos/7805254-uhd_1440_2560_25fps.mp4';

const AboutSite = forwardRef((props, ref) => {

    const videoRef = useRef(null);

    const videoPanning = () => {
        const value = window.scrollY;
        const pageWidth = document.querySelector('.content').getBoundingClientRect().width;
        if (pageWidth) {
            if (pageWidth > 680) {
                if (videoRef.current && value > 120 && value <= 2500) {
                    videoRef.current.style.objectPosition = `0 ${(-value) * 0.5}px`;
                }
            } 
            else {
                if (videoRef.current && value > 0 ) {
                    videoRef.current.style.objectPosition = `0 ${(-value) * 0.3}px`;
                }
            }
        }
    }

    useEffect(() => {
        const video = videoRef.current;
        video.playbackRate = 0.5;

        window.addEventListener('scroll', videoPanning);

        return () => {
            window.removeEventListener('scroll', videoPanning);
        };
    }, []);
    
    return (
        <div ref={ref} className='aboutsite'>
            <div className='background'>
                <video autoPlay muted loop ref={videoRef}>
                    <source src={videoBackground} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='backgroundFilter'></div>
            <div className='content'>
                <div style={{ position: 'relative', padding: `6vw 3vw`}}>
                    <div className='glassEffect'></div>
                    <h5 className='title-small'>
                            WHAT THIS SITE DO
                    </h5>
                    <h2>
                        Displaying My <span>Sole Proprietorship's</span> CSS Design <span>Masterpieces</span>
                    </h2>
                </div>
            </div>
        </div>
    );
});

export default AboutSite;
