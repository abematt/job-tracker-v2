import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { JobContextProvider } from './context/jobContext.tsx'
import { AuthContextProvider } from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
    <JobContextProvider>
    <App />
    </JobContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
