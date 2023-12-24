

import { Result } from 'postcss'
import './App.css'
import Calculator from './components/Calculator'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Results from './components/Results'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <div className=' flex items-center justify-center font-poppins px-4' >
      <div className=' bg-slate-50 rounded-md md:w-1/2 shadow-md px-4 py-6'>
        <Navbar />
        <Header />
        <Router>
          <Routes>
            <Route path='/' Component={Calculator} />
            <Route path='results/' Component={Results} />
          </Routes>
        </Router>
       
      </div>
     
   </div>
  )
}

export default App
