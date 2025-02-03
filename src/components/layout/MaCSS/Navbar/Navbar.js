import React from 'react';
import './Navbar.css'; // Import your CSS file for styling
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { RiGithubFill } from "react-icons/ri";

function Navbar() {
    return (
        <div className="navbar">
            <ul className="nav-links">
                <li style={{ transform: 'translateY(0)' }}><a href="#github"><RiGithubFill /></a></li>
                <li style={{ transform: 'translateY(4vh)' }}><a href="#instagram"><FaInstagram /></a></li>
                <li style={{ transform: 'translateY(8vh)' }}><a href="#youtube"><FaYoutube /></a></li>
                <li style={{ transform: 'translateY(12vh)' }}><a href="#linkedin"><FaLinkedinIn /></a></li>
            </ul>
        </div>
    );
}

export default Navbar;
