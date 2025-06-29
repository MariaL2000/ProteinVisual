import { HashRouter, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import VisualizationPage from './pages/VisualizationPage';
import Search from './components/Search';
import About from './pages/About';
import './index.css';

function App() {
  return (
    <HashRouter> 
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/visualize" element={<VisualizationPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;