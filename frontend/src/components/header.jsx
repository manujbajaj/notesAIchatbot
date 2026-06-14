import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Authcontext } from './authContext';
import api from '../api';
import { Link } from 'react-router-dom';


const Header = () => {  
  const [open,setOpen]=useState(false)

  const {user,setUser}=useContext(Authcontext)

  const handleLogout=async()=>{
    const res=await api.post('/users/logout')
    
    setUser(null)
  }

  useEffect(()=>{
    const getUser = async () => {
      try {
        const res = await api.get("/users/user");        
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  },[])


  return (
    <div className='sticky top-0 z-50 flex justify-between items-center px-4 sm:px-8 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg' >
        <div className='text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 tracking-wider drop-shadow-md'><Link to='/'>Logo.</Link></div>
        <div className='hidden md:flex justify-center gap-10 w-1/3 font-medium text-slate-300'>
          <div className='cursor-pointer hover:text-teal-400 transition-colors duration-200'><Link to='/'>Home</Link></div>
          <div className='cursor-pointer hover:text-teal-400 transition-colors duration-200'>Contact us.</div>
          <div className='cursor-pointer hover:text-teal-400 transition-colors duration-200'>About</div>
          <div className='cursor-pointer hover:text-teal-400 transition-colors duration-200'><Link to='/ai-chat'>Ai ChatBot</Link></div>
        </div>
        <div className='flex items-center gap-4'>
            <div className='hidden md:block'>
            {user?(
                <div className='flex items-center gap-4 text-slate-200 font-medium'>
                <div>
                Hi, <span className='text-teal-400'>{user.firstName}</span>
                </div>
                <button onClick={handleLogout} className='px-5 py-2 rounded-full border border-slate-600 hover:border-rose-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300 cursor-pointer'>logout</button>
                </div>
            ):(
                <button className='px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg shadow-teal-500/25 hover:scale-105 transition-all duration-300 cursor-pointer'>
                <Link to="/login">
                    Login
                </Link>
                </button>
            )}
            </div>
            <div className='md:hidden absolute right-5 cursor-pointer text-2xl text-slate-300' onClick={()=>setOpen(!open)}>
                ☰
            </div>
        </div>
        <div className='md:hidden'>
          {open&&(
            <div className='absolute top-[72px] right-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl flex flex-col p-6 gap-6 font-medium text-slate-300'>
              <Link to='/' onClick={()=>setOpen(false)} className='hover:text-teal-400 transition-colors duration-200'>Home</Link>
              <div className='cursor-pointer hover:text-teal-400 transition-colors duration-200'>Contact us.</div>
              <div className='cursor-pointer hover:text-teal-400 transition-colors duration-200'>About</div>
              <Link to='/ai-chat' onClick={()=>setOpen(false)} className='hover:text-teal-400 transition-colors duration-200'>Ai ChatBot</Link>
              <div className='w-full h-[1px] bg-slate-800 my-2'></div>
              {user ? (
                 <div className='flex flex-col gap-4'>
                    <div className='text-slate-200'>Hi, <span className='text-teal-400'>{user.firstName}</span></div>
                    <button onClick={() => { handleLogout(); setOpen(false); }} className='w-full py-3 rounded-xl border border-rose-500/50 text-rose-400 hover:bg-rose-500/10 transition-all duration-300 cursor-pointer'>Logout</button>
                 </div>
              ) : (
                 <Link to="/login" onClick={()=>setOpen(false)} className='text-center py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold'>Login</Link>
              )}
            </div>
          )}
        </div>
    </div>
  )
}

export default Header