import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

const App = () => {
  // Force a rerender when the app is mounted to ensure styles are applied
  const [forceRender, setForceRender] = useState(0);
  
  useEffect(() => {
    // Force a rerender after a small delay
    const timer = setTimeout(() => setForceRender(prev => prev + 1), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home key={forceRender} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
