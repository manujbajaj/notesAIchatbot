import React, { useEffect, useState } from 'react'
import api from '../api'

const AddNote = () => {
  const [noteData,setNoteData]=useState({
    noteTitle:"",
    noteData:"",
    noteAvatar:null,
    noteCoverImage:null
  })

  const [message,setMessage]=useState("")

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
    e.preventDefault();

    try {
      const res=await api.post("/notes/notes",noteData)

      setMessage("successfull addint the note")

      setInterval(()=>{
        setMessage("")
      },2000)

    } catch (error) {
      console.log(error.message)
    }
  }

  

  return (
    <div className='flex justify-center h-full items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col border-2 gap-2 h-80 w-80 p-20'>
          <input type="text" name="noteTitle" onChange={handleChange} className='border-1' placeholder='note title'/>
          <input type="text" name="noteData" className='border-1' placeholder='note data' onChange={handleChange}/>
          <input type="file" placeholder='note avatar' className='border-1' name="noteAvatar" onChange={handleChange}/>
          <input type="file" placeholder='note cover image' className='border-1' name="noteCoverImage" onChange={handleChange}/>
          <button type="submit" className='border-1'>Add Note</button>
        </form>
        
        <p className='bg-green-500'>
          {message}
        </p>
    </div>
  )
}

export default AddNote