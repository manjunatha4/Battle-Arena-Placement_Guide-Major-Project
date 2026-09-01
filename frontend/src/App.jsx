import React from 'react'
import Routings from './PageRouting/Routings'
import Background3D from './components/Background3D'
import AuthModal from './components/AuthModal'

function App() {
  return (
    <div className="relative min-h-screen">
      <Background3D />
      <div className="relative z-10">
        <Routings />
      </div>
      <AuthModal />
    </div>
  )
}

export default App