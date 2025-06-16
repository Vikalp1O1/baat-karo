import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeContextChange } from './Components/ThemeContext.jsx'


//const themeChange = useContext(ThemeContextChange)
createRoot(document.getElementById('root')).render(

  <StrictMode>
   
    <BrowserRouter>
   
    <App />
    
    </BrowserRouter>
    
  </StrictMode>,
)
