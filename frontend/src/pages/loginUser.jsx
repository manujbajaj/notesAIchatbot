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
    <div className='p-5 flex justify-center items-center flex-col h-full'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-1 '>
            <input className=' border-1 rounded-lg ' type="text" placeholder='enter email' onChange={handleEmailChange}/>
            <input className='border-1 rounded-lg ' type="text" placeholder='enter password' onChange={handlePasswordChange}/>
            <button className='bg-blue-300 cursor-pointer border-1' type="submit">login</button>

        </form>
        <Link to='/register' className='text-blue-500'>not registerd? click here</Link>

    </div>
  )
}

export default LoginUser