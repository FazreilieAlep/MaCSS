// Defaults import
import React, { useRef } from 'react';
import './AboutMeMask.css';

function AboutMeMask({onMouseEnter, onMouseLeave}) {

    const layout = useRef(null);
    
    return (
        <div ref={layout} className='aboutme-mask'>
            <div className='content'>
                <div onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <h5 className='title-small'>
                        ABOUT
                    </h5>
                    <h2 >
                        Nah, I'm 
                    </h2>
                    <h2 >
                        a COPY NINJA EXPERT with
                    </h2>
                    <h2 >
                        Artifial Intelligence as my crime partner 🦹‍♂️
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default AboutMeMask;
