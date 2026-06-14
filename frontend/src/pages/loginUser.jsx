import React, { useState } from 'react'
import api from '../api'
import { useContext } from 'react'
import { Authcontext } from '../components/authContext'
import { Link, useNavigate } from 'react-router-dom'

const LoginUser = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {user,setUser}=useContext(Authcontext)
    const [res,setRes]=useState(null)

    const navigate=useNavigate()

    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data={email,password}
        try {
            const res=await api.post("/users/login",data)
            
            
            
            setUser(res.data.data)
    
            navigate("/")
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className='p-4 sm:p-5 flex justify-center items-center h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950'>
        <div className='w-full max-w-md bg-slate-900/50 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-sm flex flex-col items-center'>
            <h2 className='text-2xl sm:text-3xl font-bold text-teal-400 mb-8'>Welcome Back</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
                <input className='w-full px-5 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-500' type="text" placeholder='Email Address' onChange={handleEmailChange}/>
                <input className='w-full px-5 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-500' type="password" placeholder='Password' onChange={handlePasswordChange}/>
                <button className='w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02] transition-all cursor-pointer' type="submit">Login</button>
            </form>
            <Link to='/register' className='mt-6 text-teal-400 hover:text-teal-300 transition-colors font-medium'>Not registered? Click here</Link>
        </div>
    </div>
  )
}

export default LoginUser