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
    <div className='flex justify-center h-full items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 p-4 sm:p-6'>
        <div className='w-full max-w-md bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-sm flex flex-col items-center relative'>
            <h2 className='text-2xl sm:text-3xl font-bold text-teal-400 mb-6'>Create a Note</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                <input type="text" name="noteTitle" onChange={handleChange} className='w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-500' placeholder='Note Title'/>
                <textarea name="noteData" className='w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-500 min-h-[120px] resize-none' placeholder='Note Content' onChange={handleChange}/>
                
                <div className='flex flex-col gap-1 mt-2'>
                    <label className='text-sm text-slate-400 ml-2'>Note Avatar</label>
                    <input type="file" className='w-full px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500/20 file:text-teal-400 hover:file:bg-teal-500/30 transition-all cursor-pointer' name="noteAvatar" onChange={handleChange}/>
                </div>
                
                <div className='flex flex-col gap-1 mb-2'>
                    <label className='text-sm text-slate-400 ml-2'>Cover Image</label>
                    <input type="file" className='w-full px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500/20 file:text-teal-400 hover:file:bg-teal-500/30 transition-all cursor-pointer' name="noteCoverImage" onChange={handleChange}/>
                </div>

                <button type="submit" className='w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02] transition-all cursor-pointer'>Add Note</button>
            </form>
            
            {message && (
                <div className='absolute -bottom-16 w-full text-center'>
                    <p className='inline-block px-6 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full shadow-lg backdrop-blur-md animate-bounce'>
                        {message}
                    </p>
                </div>
            )}
        </div>
    </div>
  )
}

export default AddNote