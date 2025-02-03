// Defaults import
import React, { useRef } from 'react';
import './AboutSiteMask.css';

function AboutSiteMask({onMouseEnter, onMouseLeave}) {
    const layout = useRef(null);
    
    return (
        <div ref={layout} className='aboutsite-mask'>
            <div className='background'>

            </div>
            <div className='content'>
                <div onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave}
                    style={{ position: 'relative', padding: `6vw 3vw`}}>
                    <h5 className='title-small'>
                        WHAT THIS SITE DO
                    </h5>
                    <h2>
                        Flexing My frontend dev skills [I just steal other design ideas tho]
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default AboutSiteMask;
