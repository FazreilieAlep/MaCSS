/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import styles from './MaskFinal.module.scss';

const MaskFinal = () => {
    const [isMask, setIsMask] = useState(true);
    const maskRef = useRef(null);
    const [maskSize, setMaskSize] = useState(40); // Initial size px
    

    const ref = React.useRef(null);
    const mouse = useMouse(ref, {
        enterDelay: 100,
        leaveDelay: 100
    });

    const maskStartPosition = 50;
    const cursorVariant = {
        WebkitMaskPosition: `${mouse.clientX != null ? mouse.clientX - maskSize / 2 : maskStartPosition}px ${mouse.clientY != null ? mouse.clientY - maskSize / 2 : maskStartPosition}px`,
        WebkitMaskSize: `${maskSize}px`
    }

    const defaultVariant= {
        opacity: 1,
        height: 10,
        width: 10,
        fontSize: "16px",
        backgroundColor: "#1e91d6",
        x: mouse.clientX - 10/2,
        y: mouse.clientY - 10/2,
        transition: {
          type: "spring",
          mass: 0.6
        }
      }

    const spring = {
        type: "tween", ease: "backOut", duration:0.5
      };

    function handleMouseEnter(event) {
        setMaskSize(300);
    }

    function handleMouseLeave(event) {
        setMaskSize(40);
    }

    return (
        <main className={styles.main} ref={ref}>
            <motion.div
                ref={maskRef}
                className={isMask ? styles.mask : styles.circle}
                animate={isMask ? cursorVariant : defaultVariant}
                transition={spring}
            >
                <p
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={isMask ? styles.visible : styles.hidden}
                >
                Just kidding tho, this effect took me 2 days to create - because A.I can't help me enough with it (yet)
                </p>
            </motion.div>
            <div className={styles.body}>
                <p>
                I'm <span>The Best Frontend Developer</span> in Malaysia with strong focus on producing high quality & impactful
                digital experience.
                </p>
            </div>       
        </main>

    );
};

export default MaskFinal;
