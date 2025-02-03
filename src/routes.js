import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import MaCSS from './pages/MaCSS';
import Collections from './pages/Collections';
import Reels from './pages/Reels';

function Routing() {
  return (
    <Router basename="/MaCSS">
      <Routes>
        <Route path="/" element={<MaCSS />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Collections" element={<Collections />} />
        <Route path="/Reels" element={<Reels />} />
      </Routes>
    </Router>
  );
}

export default Routing;
