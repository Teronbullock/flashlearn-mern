import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { PageTempProvider } from './context/PageTempContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PageTempProvider>
          <App />
        </PageTempProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
