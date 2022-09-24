import './index.css'

const rootEl = document.getElementById('root')

if (!rootEl) throw new Error('Missing root element')

rootEl.innerHTML = 'Hello World'
