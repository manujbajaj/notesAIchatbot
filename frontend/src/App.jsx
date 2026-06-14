import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Routes,Route} from "react-router-dom"
import LandingPage from './pages/landingPage'
import Header from './components/header'
import AddNote from './pages/addNote'
import LoginUser from './pages/loginUser'
import RegisterUser from './pages/registerUser'
import Notes from './pages/notes'
import EditNote from './pages/editnote'
import Aichat from './components/aichatbot'
import FloatingChatbot from './components/floatingChatbot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col'>
      <Header/>
      <div className='flex-1 flex flex-col'>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<LoginUser/>}/>
          <Route path='/register' element={<RegisterUser/>}/>
          <Route path='/user-notes' element={<Notes/>}/>
          <Route path='/add-note' element={<AddNote/>}/>
          <Route path='/edit-note/:id' element={<EditNote/>}/>
          <Route path='/ai-chat' element={<Aichat/>}/>
        </Routes>
      </div>

        <FloatingChatbot/>

        
        
      
    </div>
  )
}

export default App
