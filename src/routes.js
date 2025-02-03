import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import MaCSS from './pages/MaCSS';
import Collections from './pages/Collections';
import Reels from './pages/Reels';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MaCSS />} />
        <Route path="/MaCSS/about" element={<About />} />
        <Route path="/MaCSS/contact" element={<Contact />} />
        <Route path="/MaCSS" element={<MaCSS />} />
        <Route path='/MaCSS/Collections' element={<Collections />} />
        <Route path='/MaCSS/Reels' element={<Reels />} />
      </Routes>
    </Router>
  );
}

export default Routing;
