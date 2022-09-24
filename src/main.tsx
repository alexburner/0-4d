import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { getLayout } from './layout/layout'

const rootEl = document.getElementById('root')

if (!rootEl) throw new Error('Missing root element')

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log(getLayout({ dimensionCount: 2, pointCount: 2 }))
console.log(getLayout({ dimensionCount: 2, pointCount: 4 }))
