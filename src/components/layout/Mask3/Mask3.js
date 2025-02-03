/* eslint-disable no-unused-vars */
import React from "react";
import useMouse from "@react-hook/mouse-position";
import { useState } from "react";
import { motion, useTransform } from "framer-motion";

import "./Mask3.css";

function Mask3() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100
  });

  let mouseXPosition = 0;
  let mouseYPosition = 0;

  if (mouse.x !== null) {
    mouseXPosition = mouse.clientX;
  }

  if (mouse.y !== null) {
    mouseYPosition = mouse.clientY;
  }

  const variants = {
    default: {
      opacity: 1,
      height: 10,
      width: 10,
      fontSize: "16px",
      backgroundColor: "#1e91d6",
      x: mouseXPosition - 10/2,
      y: mouseYPosition - 10/2,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    project: {
      opacity: 1,
      // backgroundColor: "rgba(255, 255, 255, 0.6)",
      backgroundColor: "#fff",
      color: "#000",
      height: 80,
      width: 80,
      fontSize: "18px",
      x: mouseXPosition - 80/2,
      y: mouseYPosition - 80/2
    },
    contact: {
      opacity: 1,
      backgroundColor: "#FFBCBC",
      color: "#000",
      height: 64,
      width: 64,
      fontSize: "32px",
      x: mouseXPosition - 64/2,
      y: mouseYPosition - 64/2
    }
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28
  };

  function projectEnter(event) {
    setCursorText("View");
    setCursorVariant("project");
  }

  function projectLeave(event) {
    setCursorText("");
    setCursorVariant("default");
  }

  function contactEnter(event) {
    setCursorText("👋");
    setCursorVariant("contact");
  }

  function contactLeave(event) {
    setCursorText("");
    setCursorVariant("default");
  }

  return (
    <div>
      <div className="container" ref={ref}>
        <motion.div
          variants={variants}
          className="circle"
          animate={cursorVariant}
          transition={spring}
        >
          <span className="cursorText">{cursorText}</span>
        </motion.div>
        <div
          className="project"
          onMouseEnter={projectEnter}
          onMouseLeave={projectLeave}
        >
          <span className="projectName">Discord Onboarding</span>
        </div>
        <div className="contactWrapper">
          <div
            className="contact"
            onMouseEnter={contactEnter}
            onMouseLeave={contactLeave}
          >
            Want to Chat?
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mask3;
