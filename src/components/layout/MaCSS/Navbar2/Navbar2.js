import React from 'react';
import './Navbar2.css'; // Import your CSS file for styling
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { RiGithubFill } from "react-icons/ri";

function Navbar2() {
    return (
        <div className="navbar2">
            <div className="logo">
                <h1>Logo</h1>
            </div>
            <ul className="nav-links">
                <li><a href="#github"><RiGithubFill /></a></li>
                <li><a href="#instagram"><FaInstagram /></a></li>
                <li><a href="#youtube"><FaYoutube /></a></li>
                <li><a href="#linkedin"><FaLinkedinIn /></a></li>
            </ul>
        </div>
    );
}

export default Navbar2;
