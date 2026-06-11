import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { Authcontext } from '../components/authContext'

const LandingPage = () => {
  const {user,setUser}=useContext(Authcontext)

  return (
    <main className='h-screen'>
      <div className='flex text-6xl font-extrabold justify-center gap-7 items-center h-full flex-col'>
        <div>
          The simplest way to remember.
        </div>
        <div>
          <img src="./src/assets/react.svg" alt="" className='size-30' />
        </div>
        <div className='font-bold text-2xl flex gap-5'>
          <p className='border-2 rounded-2xl pl-4 pr-4 pt-2 pb-2 cursor-pointer'><Link to={user?"/add-note":"/login"}>Add Note</Link></p>
          <p className='border-2 rounded-2xl pl-4 pr-4 pt-2 pb-2 cursor-pointer' ><Link to={user?"/user-notes":"/login"}>View Note</Link></p>
        </div>
      </div>
    </main>
  )
}

export default LandingPage