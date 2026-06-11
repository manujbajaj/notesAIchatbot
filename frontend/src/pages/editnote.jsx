import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

const EditNote = () => {
    const id=useParams();

    const [noteData,setNoteData]=useState({
      noteTitle:"",
      noteData:""
    })

    

    const handleChange=(e)=>{
    const {name,files,value}=e.target
    
    setNoteData((prev)=>(
        {
          ...prev,
          [name]:files?files[0]:value
        }
      ))
    }

    const handleSubmit=async(e)=>{
      e.preventDefault()
      console.log(id.id);
      
      const res=await api.patch("/notes/notes/"+String(id.id),noteData)

      console.log(res);
      
    }



  return (
    <div className='flex h-full justify-center items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input type="text" className='border-1' onChange={handleChange} placeholder='enter the note title' name='noteTitle'/>
        <input type="text" onChange={handleChange} className='border-1' placeholder='enter the note data' name='noteData'/>
        <input type="file" onChange={handleChange} className='border-1' placeholder='enter the note avatar' name='data'/>
        <input type="file" onChange={handleChange} className='border-1' placeholder='enter the note coverImage' name='data'/>

        <button type="submit" className='border'>Edit Note</button>
      </form>
    </div>
  )
}

export default EditNote