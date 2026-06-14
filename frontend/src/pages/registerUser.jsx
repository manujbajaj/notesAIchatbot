import React from 'react'
import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

const RegisterUser = () => {
    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        userName:"",
        avatar:null,
        coverImage:null
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        const {name,value,files}=e.target

        setFormData((prev)=>({
            ...prev,
            [name]:files?files[0]:value
        }))
    }

    const handleSubmit=async()=>{
        try {
            const res=await api.post("/users/register",formData)

            console.log(res.data);

            navigate("/login")
            
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='h-full p-4 sm:p-7 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 overflow-y-auto'>
        <div className='w-full max-w-lg bg-slate-900/50 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-sm flex flex-col items-center my-8'>
            <h2 className='text-2xl sm:text-3xl font-bold text-teal-400 mb-8'>Create an Account</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                <input onChange={handleChange} placeholder='Email Address' className='w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-500' type="text" name='email' />
                <input onChange={handleChange} placeholder='Username'  className='w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-500' type="text" name='userName' />
                <input onChange={handleChange} placeholder='Password'  className='w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-500' type="password" name='password' />
                <div className='flex flex-col sm:flex-row gap-4'>
                    <input onChange={handleChange} placeholder='First Name'  className='w-full sm:w-1/2 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-500' type="text" name='firstName' />
                    <input onChange={handleChange} placeholder='Last Name'  className='w-full sm:w-1/2 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-500' type="text" name='lastName' />
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <label className='text-sm text-slate-400 ml-2'>Avatar</label>
                    <input onChange={handleChange} className='w-full px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500/20 file:text-teal-400 hover:file:bg-teal-500/30 transition-all cursor-pointer' type="file" name="avatar" />
                </div>
                <div className='flex flex-col gap-1 mb-2'>
                    <label className='text-sm text-slate-400 ml-2'>Cover Image</label>
                    <input onChange={handleChange} className='w-full px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500/20 file:text-teal-400 hover:file:bg-teal-500/30 transition-all cursor-pointer' type="file" name='coverImage' />
                </div>
                <button type="submit" className='w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02] transition-all cursor-pointer'>
                    Register
                </button>
            </form>
        </div>
    </div>
  )
}

export default RegisterUser