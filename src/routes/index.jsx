import { createBrowserRouter } from 'react-router-dom'
import PageShell from '../components/layout/page-shell'
import Home from '../pages/home'
import NotFound from '../pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageShell />,
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
