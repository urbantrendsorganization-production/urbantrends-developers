import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { DeveloperProvider } from './context/DeveloperContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Auth0Provider
          domain={import.meta.env.VITE_DOMAIN}
          clientId={import.meta.env.VITE_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <DeveloperProvider>
            <App />
          </DeveloperProvider>
        </Auth0Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
