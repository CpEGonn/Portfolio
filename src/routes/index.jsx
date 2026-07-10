import { createBrowserRouter } from 'react-router-dom'
import PageShell from '../components/layout/page-shell'
import About from '../pages/about'
import Contact from '../pages/contact'
import Home from '../pages/home'
import NotFound from '../pages/not-found'
import Projects from '../pages/projects'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
