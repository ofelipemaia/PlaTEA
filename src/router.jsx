import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Resultados from './pages/Resultados'
import Jogo from './pages/Jogo'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'resultados', element: <Resultados /> },
      { path: 'jogo/:id', element: <Jogo /> },
    ],
  },
])