import { useState } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
 



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <h1 className='fs-1 text-primary'>Hello Asif</h1>
      <Footer/>
    </>
  )
}

export default App
