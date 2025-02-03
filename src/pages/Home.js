/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import './Home.css';
import PointerParticles from '../components/specific/cursor/PointerParticle1/PointerParticles.js';
import PointerInverse from '../components/specific/cursor/PointerInverse1/PointerInverse.js';
import Mask1 from '../components/layout/Mask1/mask1.js';
import Mask2 from '../components/layout/Mask2/mask2.js';
import MaskedCursor from '../components/specific/cursor/MaskedCursor/MaskedCursor.jsx';
import Mask3 from '../components/layout/Mask3/Mask3.js';
import MaskFinal from '../components/layout/MaskFinal/MaskFinal.js';

function Home() {

    useEffect(() => {
        PointerParticles.register(); // Ensure the custom element is registered
    }, []);
    
    return (
        <>
            {/* <MaskedCursor /> */}
            {/* <Mask2 /> */}
            {/* <Mask1 /> */}
            <Mask3 />
            {/* <MaskFinal /> */}
        </>
        
        // <div className="App" style={{cursor: 'none'}}>
        //     {/* <header className="App-header pointer-inverse-container">
        //         <PointerInverse containerSelector=".pointer-inverse-container" />
        //         <img src={logo} className="App-logo" alt="logo" />
        //         <p className='pointer-inverse-scale small'>
        //         Edit <code>src/App.js</code> and save to reload.
        //         </p>
        //         <a
        //         className="App-link pointer-inverse-scale small"
        //         href="https://reactjs.org"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //         >
        //         Learn React
        //         </a>
                
        //     </header> */}
        //     {/* <pointer-particles></pointer-particles>
        //     <div className="App-header">
        //         <h1>Test hover v2</h1>
        //     </div> */}
            
        //     {/* <div className="App-header">
        //         <Mask1 />
        //     </div> */}
        // </div>
        // <div className='testClass'>
        //     <div className='pointerContainer'>
        //         <pointer-particles></pointer-particles>
        //     </div>
        // </div>
    );
}

export default Home;
