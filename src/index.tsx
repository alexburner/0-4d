import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './Router'
import './index.css'

const rootEl = document.getElementById('root')

if (!rootEl) throw new Error('Missing #root element')

createRoot(rootEl).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
