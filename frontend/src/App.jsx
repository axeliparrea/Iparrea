import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './hook/ThemeContext';
import { LanguageProvider } from './hook/LanguageContext';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import './App.css';

function AppContent() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`App ${isDark ? 'dark' : 'light'}`}>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        <>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<div>About Page</div>} />
              <Route path="/portfolio" element={<div>Portfolio Page</div>} />
              <Route path="/blog" element={<div>Blog Page</div>} />
              <Route path="/contact" element={<div>Contact Page</div>} />
            </Routes>
          </main>
        </>
      )}
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
