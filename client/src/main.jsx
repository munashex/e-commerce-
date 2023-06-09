import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HelmetProvider} from 'react-helmet-async'  
import {StoreProvider} from './store' 
import {PayPalScriptProvider} from '@paypal/react-paypal-js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   
    <StoreProvider>
        <HelmetProvider> 
          <PayPalScriptProvider deferLoading={true}>
        <App/>
        </PayPalScriptProvider>
        </HelmetProvider> 
        </StoreProvider>
  </React.StrictMode>,
)
