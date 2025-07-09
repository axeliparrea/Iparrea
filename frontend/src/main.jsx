import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Add a small delay to ensure styles are loaded
setTimeout(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}, 10)
