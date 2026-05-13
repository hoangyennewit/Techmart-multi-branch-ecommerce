import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // THÊM DÒNG NÀY

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* BỌC APP LẠI BẰNG THẺ NÀY */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)