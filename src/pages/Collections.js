import React, { useRef, useState } from 'react';
import './Collections.css';


function Collections() {
    const pageRef = useRef(null);

  return (
        <div ref={pageRef} className='Collections-page'>
            <div className='collections-background'>
                Background
            </div>
            <div className='collections-content'>
                <div className='collection-list-container'>
                    <div className='collection-list-title'><h4>Collections</h4></div>
                    <div className='collection-list-dropdown'><h6>Dropdown</h6></div>
                    <div className='collection-list'>List</div>
                </div>
                <div className='separator'><div></div></div>
                <div className='preview-container'>
                    <div className='preview-title'><h5>Collection Name</h5></div>
                    <div className='preview-1'>
                        <div><h6>Preview</h6></div>
                        <div style={{ justifyContent : 'flex-end' }}>
                            <div class="up-in-toggle">
                                <input type="radio" id="switch_left" name="switch_2" value="yes" />
                                <label for="switch_left">Sign In</label>
                                <input type="radio" id="switch_right" name="switch_2" value="no" checked/>
                                <label for="switch_right">Sign Up</label>
                            </div>
                        </div>
                    </div>
                    <div className='preview-2'>
                        <button>TEST</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collections;