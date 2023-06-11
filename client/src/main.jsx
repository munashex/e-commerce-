import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HelmetProvider} from 'react-helmet-async'  
import {StoreProvider} from './store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   
    <StoreProvider>
        <HelmetProvider>
        <App/>
        </HelmetProvider> 
        </StoreProvider>
  </React.StrictMode>,
)
