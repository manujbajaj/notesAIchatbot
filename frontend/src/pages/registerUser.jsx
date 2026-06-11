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
    <div className='h-full p-7 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <input onChange={handleChange} placeholder='enter the email' className='border-1' type="text" name='email' />
            <input onChange={handleChange} placeholder='enter the username'  className='border-1' type="text" name='userName' />
            <input onChange={handleChange} placeholder='enter the password'  className='border-1' type="text" name='password' />
            <input onChange={handleChange} placeholder='enter the firstname'  className='border-1' type="text" name='firstName' />
            <input onChange={handleChange} placeholder='enter the lastname'  className='border-1' type="text" name='lastName' />
            <input onChange={handleChange} placeholder='upload avatar'  className='border-1' type="file" name="avatar" />
            <input onChange={handleChange} placeholder='upload cover image'  className='border-1' type="file" name='coverImage' />
            <button type="submit">
                Register
            </button>
        </form>
    </div>
  )
}

export default RegisterUser