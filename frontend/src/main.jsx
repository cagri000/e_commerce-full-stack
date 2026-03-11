import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 1. BrowserRouter'ı import et
import { BrowserRouter } from 'react-router-dom' 

ReactDOM.createRoot(document.getElementById('root')).render(
  // 2. Tüm uygulamayı BrowserRouter içine al
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)