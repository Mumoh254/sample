import { useState } from 'react'

import  {BrowserRouter, Route  , Routes}   from 'react-router-dom'


import './App.css'
import Header from './Components/Header/header'
import Register from './Components/Register/register'





function App() {

  const [count, setCount] = useState(0)

  return (
    <>

    

    <BrowserRouter>

    <Routes>
          <Route path="/" element={ <Header/>}/>
          <Route path="/register" element={ <Register/>}/>

    </Routes>
    
    </BrowserRouter>





     
    </>
  )
}

export default App
