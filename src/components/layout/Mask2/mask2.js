import { useEffect, useState } from "react";
import "./mask2.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function Mask2(props) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMouseMove(e) {
      setMousePos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty("--cursor-x", e.clientX + "px");
      document.documentElement.style.setProperty("--cursor-y", e.clientY + "px");
    }
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  function onHeroMouseEnter() {
    document.documentElement.style.setProperty("--cursor-size", "350px");
  }

  function onHeroMouseLeave() {
    document.documentElement.style.setProperty("--cursor-size", "32px");
  }

  return (
      <>

        <div className="layer dark_layer">
          <div className="hero_container">
            <div className="text_container" onMouseEnter={onHeroMouseEnter} onMouseLeave={onHeroMouseLeave}>
              <div>WHO</div>
              <div>WROTE</div>
              <div>THIS</div>
              <div>SHITTY</div>
              <div>CODE?</div>
            </div>
          </div>
          <div className="space2"></div>
        </div>

        <div className="layer layer_red">
          <div className="hero_container">
            <div className="text_container text_black">
              <div>OH</div>
              <div>WAIT!</div>
              <div>THIS IS</div>
              <div>MY</div>
              <div>CODE?</div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Mask2;
