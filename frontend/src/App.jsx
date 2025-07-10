import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './hook/ThemeContext';
import { LanguageProvider } from './hook/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css';

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <div className={`App ${isDark ? 'dark' : 'light'}`}>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/book" element={<div>Book Page</div>} />
          <Route path="/portfolio" element={<div>Portfolio Page</div>} />
          <Route path="/blog" element={<div>Blog Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
