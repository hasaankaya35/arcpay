import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ChatApp from './components/ChatApp'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  return (
    <div className="app">
      {currentPage === 'landing' ? (
        <LandingPage onLaunch={() => setCurrentPage('chat')} />
      ) : (
        <ChatApp onBack={() => setCurrentPage('landing')} />
      )}
    </div>
  )
}

export default App
