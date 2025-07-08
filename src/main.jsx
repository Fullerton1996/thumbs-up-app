import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <div style={{textAlign: 'center', marginTop: '4rem'}}>
      <h1>Hola, are you ready to sleep tonight?</h1>
      <p>Go to the <a href="/sleep">Sleep Question</a> page.</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sleep" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
