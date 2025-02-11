import React from 'react'
import { PingButton } from './components/PingButton'
import { QueryProvider } from './providers/query-provider'

function App() {
  return (
    <QueryProvider>
      <div className='p-4'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to Gain</h1>
        <PingButton />
      </div>
    </QueryProvider>
  )
}

export default App
