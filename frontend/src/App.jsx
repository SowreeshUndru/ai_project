import React from 'react'
import Approutes from './routes/Approutes.jsx'
import Userprovider from './components/Usercontext.jsx'

function App() {
  return (
    <Userprovider>
      <Approutes/>
    </Userprovider>
  )
}

export default App