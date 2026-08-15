import { RouterProvider } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { router } from './routes'
import ChatWidget from './components/chat/chat-widget'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
      <ChatWidget />
    </>
  )
}

export default App
