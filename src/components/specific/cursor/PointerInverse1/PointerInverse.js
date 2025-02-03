import { useEffect } from 'react';
import gsap from 'gsap';
import './PointerInverse.css';

const PointerInverse = ({ containerSelector }) => {
    useEffect(() => {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const pointerInverse = document.createElement('div');
        pointerInverse.classList.add('pointer-inverse');
        document.body.appendChild(pointerInverse);

        const pointerScaleElements = container.querySelectorAll('.pointer-inverse-scale');

        let mouseX = 0;
        let mouseY = 0;

        const updatePointerPosition = () => {
            gsap.set(pointerInverse, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        };

        gsap.to({}, 0.016, {
            repeat: -1,
            onRepeat: updatePointerPosition
        });

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const containerRect = container.getBoundingClientRect();
            if (
                mouseX >= containerRect.left &&
                mouseX <= containerRect.right &&
                mouseY >= containerRect.top &&
                mouseY <= containerRect.bottom
            ) {
                pointerInverse.style.display = 'block';
            } else {
                pointerInverse.style.display = 'none';
            }
        };

        const handleMouseLeave = () => {
            pointerInverse.classList.remove('grow');
            pointerInverse.classList.remove('grow-small');
            pointerInverse.classList.remove('grow-hidden');
        };

        const handleMouseEnter = (link) => {
            pointerInverse.classList.add('grow');
            if (link.classList.contains('pointer-inverse-hidden')) {
                pointerInverse.classList.remove('grow');
                pointerInverse.classList.add('grow-hidden');
            }
            else if (link.classList.contains('small')) {
                pointerInverse.classList.remove('grow');
                pointerInverse.classList.add('grow-small');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        pointerScaleElements.forEach(link => {
            link.addEventListener('mouseleave', handleMouseLeave);
            link.addEventListener('mousemove', () => handleMouseEnter(link));
        });

        return () => {
            document.body.removeChild(pointerInverse);
            window.removeEventListener('mousemove', handleMouseMove);
            pointerScaleElements.forEach(link => {
                link.removeEventListener('mouseleave', handleMouseLeave);
                link.removeEventListener('mousemove', () => handleMouseEnter(link));
            });
        };
    }, [containerSelector]);

    return null; // PointerInverse does not render any visible UI
};

export default PointerInverse;
