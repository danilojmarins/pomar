import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/global.ts'
import theme from './styles/theme.ts'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Harvests from './pages/Harvests.tsx'
import Trees from './pages/Trees.tsx'
import Groups from './pages/Groups.tsx'
import Species from './pages/Species.tsx'
import Layout from './components/Layout/index.tsx'
import ModalProvider from './contexts/ModalContext.tsx'
import AuthProvider from './contexts/AuthContext.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/colheitas' element={<Harvests />} />
      <Route path='/arvores' element={<Trees />} />
      <Route path='/grupos' element={<Groups />} />
      <Route path='/especies' element={<Species />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ModalProvider>
          <RouterProvider router={router} />
          <GlobalStyle />
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
