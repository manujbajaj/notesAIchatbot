import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { Authcontext } from '../components/authContext'

const LandingPage = () => {
  const { user, setUser } = useContext(Authcontext)

  return (
    <main className='flex-1 mt-10 h-full'>
      <div className='flex flex-col items-center justify-center h-full gap-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black px-4 text-center'>
        <div className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 drop-shadow-lg">
          The simplest way to remember.
        </div>
        <div>
          <img src="/notes.png" alt="" className='w-32 h-32  drop-shadow-[0_0_25px_rgba(45,212,191,0.5)]' />
        </div>
        <div className='font-bold text-lg flex flex-col sm:flex-row gap-6 mt-4'>
          <Link to={user ? "/add-note" : "/login"}><p className='px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(45,212,191,0.3)] bg-gradient-to-r from-teal-500 to-cyan-500 text-white cursor-pointer'>
            Add Note
          </p></Link>
          <Link to={user ? "/user-notes" : "/login"}><p className='px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] cursor-pointer' >
            View Note
          </p>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default LandingPage