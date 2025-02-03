import React, { useEffect, useRef, useState, forwardRef } from 'react';
import './Footer.css';
// import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
// import { RiGithubFill } from "react-icons/ri";
import { motion, useTransform } from "framer-motion";

const Footer = forwardRef((props, ref) => {
    const buttonRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [buttonColor, setButtonColor] = useState('#fbf1f1');

    const handleButtonClick = () => {
        window.location.href = '/MaCSS/Reels';
    };

    const handleMouseClick = (event) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const isWithinButton = (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            );
            if (isWithinButton) {
                handleButtonClick();
            }
        }
    };

    const handleMouseMove = (event) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const isWithinButton = (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            );
            setIsHovered(isWithinButton);
            setButtonColor(isWithinButton ? '#ff69b4' : '#fe8aa2');
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleMouseClick);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('click', handleMouseClick);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <footer ref={ref}>
            <div className='header-footer'>
                <h4>CONNECT</h4>
            </div>

            <div className='socmed-footer'>
                <div>
                    <h5>Linkedin</h5>
                    {/* <a href="#linkedin"><FaLinkedinIn /></a> */}
                </div>
                <div>
                    <h5>Youtube</h5>
                    {/* <a href="#youtube"><FaYoutube /></a> */}
                </div>
                <div>
                    <h5>Instagram</h5>
                    {/* <a href="#instagram"><FaInstagram /></a> */}
                </div>
                <div>
                    <h5>GitHub</h5>
                    {/* <a href="#github"><RiGithubFill /></a> */}
                </div>
            </div>

            <div className='contact-footer'>
                <div>
                    <h5>email</h5>
                    <h6>fazreilie122@gmail.com</h6>
                </div>
                <div>
                    <h5>phone</h5>
                    <h6>+601135780112</h6>
                </div>
            </div>

            <div className="PS">
                <h5>ps: I watched a lot of anime. Click here to see anime I've watched so that we can have a good teatime session later...</h5>

                <motion.button
                        ref={buttonRef}
                        style={{ color: buttonColor }}
                        className='collections-button'
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        watched anime list
                </motion.button>
            </div>

            <div className="credit">
                <h6>Designed by <span className='playwrite-cu-400'>Fazreilie Bin Alep</span></h6>
            </div>
        </footer>
    );
});

export default Footer;