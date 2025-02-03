import React, { forwardRef } from 'react';
import './Footer.css';

const Footer = forwardRef((props, ref) => {
    return (
        <footer ref={ref}>
            <div className='header'>
                <h1>CONNECT</h1>
            </div>

            <div className='socmed'>
                <div>
                    <h2>Linkedin</h2>
                </div>
                <div>
                    <h2>Youtube</h2>
                </div>
                <div>
                    <h2>Instagram</h2>
                </div>
                <div>
                    <h2>GitHub</h2>
                </div>
            </div>

            <div className='contact-footer'>
                <div>
                    <h2>email</h2>
                    <h3>fazreilie122@gmail.com</h3>
                </div>
                <div>
                    <h2>phone</h2>
                    <h3>+601135780112</h3>
                </div>
            </div>

            <div className="credit">
                <h4>Designed by <span className='playwrite-cu-400'>  Fazreilie Bin Alep</span></h4>
            </div>
        </footer>
    );
});

export default Footer;
