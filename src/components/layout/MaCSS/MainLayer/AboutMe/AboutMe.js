// Defaults import
import React, { forwardRef } from 'react';
import './AboutMe.css';

const AboutMe = forwardRef((props, ref) => {
    
    return (
        <div ref={ref} className='aboutme'>
            <div className='content'>
                <h5 className='title-small'>
                    ABOUT
                </h5>
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
    );
});

export default AboutMe;
