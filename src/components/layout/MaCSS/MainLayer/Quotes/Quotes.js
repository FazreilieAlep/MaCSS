import React, { useEffect, useRef, forwardRef } from 'react';
import './Quotes.css';

import videoBackground from '../../../../../assets/videos/fantasy-warrior-cherry-blossom-moewalls-com.mp4';

const Quotes = forwardRef((props, ref) => {
    const videoRef = useRef(null);
    const content = useRef(null);

    const syncBackgroundHeight = () => {
        const background = document.querySelector('.background');
        if (ref.current && background) {
            background.style.height = `${ref.current.offsetHeight}px`;
        }
    };

    useEffect(() => {

        syncBackgroundHeight();
        const video = videoRef.current;
        video.playbackRate = 0.5;

        window.addEventListener('resize', syncBackgroundHeight);

        return () => {
            window.removeEventListener('resize', syncBackgroundHeight);
        };
    }, []);

    return (
        <div ref={ref} className='quotes'>
            <div className='background' style={{ height: ref.current?.offsetHeight }}>
                <video
                    autoPlay
                    muted
                    loop
                    ref={videoRef}
                >
                    <source src={videoBackground} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div ref={content} className='content'>
                <h4 className='title-small'>
                     MY DESIGN CONCEPT
                 </h4>
                 <h2>
                     Color <span>Harmony</span> and <span>Balance</span>
                 </h2>
            </div>
        </div>
    );
});

export default Quotes;
