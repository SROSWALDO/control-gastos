import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BudgetProvider } from './context/BudgetContent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider>
    <App />
    </BudgetProvider>
  </StrictMode>,
)
