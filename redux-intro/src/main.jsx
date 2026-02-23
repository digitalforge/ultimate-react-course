import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import store from './store'
import { deposit } from './features/accounts/accountSlice.js'

store.dispatch(deposit(500))
console.log(store.getState())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
