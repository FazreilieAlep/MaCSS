import React, { useRef, forwardRef } from 'react';
import './QuotesMask.css';

// import videoBackground from '../../../../../assets/videos/fantasy-warrior-cherry-blossom-moewalls-com.mp4';

const QuotesMask = forwardRef(({onMouseEnter, onMouseLeave}, ref) => {
    // const videoRef = useRef(null);
    const content = useRef(null);

    // const syncBackgroundHeight = () => {
    //     const background = document.querySelector('.background');
    //     if (ref.current && background) {
    //         background.style.height = `${ref.current.offsetHeight}px`;
    //     }
    // };

    // useEffect(() => {

    //     syncBackgroundHeight();
    //     const video = videoRef.current;
    //     video.playbackRate = 0.5;

    //     window.addEventListener('resize', syncBackgroundHeight);

    //     return () => {
    //         window.removeEventListener('resize', syncBackgroundHeight);
    //     };
    // }, []);

    return (
        <div className='quotes-mask'>
            {/* <div className='background' style={{ height: ref.current?.offsetHeight }}>
                <video
                    autoPlay
                    muted
                    loop
                    ref={videoRef}
                >
                    <source src={videoBackground} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div> */}
            <div ref={content} className='content'>
                <div onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <h4 className='title-small'>
                        MY DESIGN CONCEPT
                    </h4>
                    <h2>
                        <span>Plug</span> and <span>Play</span>Around
                    </h2>
                </div>
            </div>
        </div>
    );
});

export default QuotesMask;
