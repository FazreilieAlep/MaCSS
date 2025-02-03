import React, { forwardRef } from 'react';
import './FooterMask.css';
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { RiGithubFill } from "react-icons/ri";

const FooterMask = forwardRef((props, ref) => {
    return (
        <footer ref={ref}>

            <div className='header-footer-mask'>
                <h4>CONNECT</h4>
            </div>

            <div className='socmed-footer-mask'>
                <div>
                    <h5>Linkedin</h5>
                    <a href="#linkedin"><FaLinkedinIn /></a>
                </div>
                <div>
                    <h5>Youtube</h5>
                    <a href="#youtube"><FaYoutube /></a>
                </div>
                <div>
                    <h5>Instagram</h5>
                    <a href="#instagram"><FaInstagram /></a>
                </div>
                <div>
                    <h5>GitHub</h5>
                    <a href="#github"><RiGithubFill /></a>
                </div>
            </div>

            <div className='contact-footer-mask'>
                <div className='iris'>
                    <h5>Test</h5>
                    <h6>testaskfnkoNA</h6>
                </div>
                <div>
                    <h5>phone</h5>
                    <h6>+601135780112</h6>
                </div>
            </div>

            <div className="credit">
                <h6>Designed by <span className='playwrite-cu-400'>  Fazreilie Bin Alep</span></h6>
            </div>
        </footer>
    );
});

export default FooterMask;
