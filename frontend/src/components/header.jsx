import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Authcontext } from './authContext';
import api from '../api';
import { Link } from 'react-router-dom';


const Header = () => {  

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
    <div className=' flex justify-between items-center bg-gray-300 p-3' >
        <div>Logo.</div>
        <div className='flex justify-between gap-10 w-1/3'>
          <div className='cursor-pointer'><Link to='/'>Home</Link></div>
          <div className='cursor-pointer'>Contact us.</div>
          <div className='cursor-pointer'>About</div>
          <div className='cursor-pointer'><Link to='/ai-chat'>Ai ChatBot</Link></div>
        </div>
        <div className=''>
          {user?(
            <div className='flex items-center gap-3'>
              <div>

              Hi, {user.firstName}
              </div>
              <button onClick={handleLogout} className='border-1 rounded-2xl pl-4 pt-1 pb-1 cursor-pointer pr-4'>logout</button>
            </div>
          ):(
            <button className='border-1 rounded-2xl pl-4 pt-1 pb-1 cursor-pointer pr-4'>
              
              <Link to="/login">
                Login
              </Link>
            </button>
          )}
        </div>
    </div>
  )
}

export default Header