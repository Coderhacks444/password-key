import { useState } from 'react'
import Navbar from './Component/Navbar'
import './App.css'
import Manger from './Component/Manger'
import Footer from './Component/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Manger/>
      <Footer/>
         </>
  )
}

export default App
