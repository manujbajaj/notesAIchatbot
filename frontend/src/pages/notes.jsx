import React from 'react'
import api from '../api'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


const Notes = () => {
    const [loading,setLoading]=useState(true)
    const [notes,setNotes]=useState([])
    useEffect(()=>{
        const getNotes=async()=>{
            const notesData=await api.get("/notes/notes")
    
            setNotes(notesData.data.data)
            setLoading(false)
            
        }
        getNotes()
    },[])

    if(loading){
        return(
            <Box className="mt-3 p-5" sx={{ width: '100%' }}>
            <LinearProgress aria-label="Loading…" />
            </Box>
        )
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 sm:p-8 gap-4 sm:gap-6 bg-slate-950 h-full overflow-y-auto'>
        {notes.length>0?(notes.map((note)=>(
            <div className='bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] group' key={note._id}>
                <div className='flex flex-col gap-3 mb-4'>
                    <h1 className='text-lg sm:text-xl font-bold text-teal-300 truncate'>Title: {note.noteTitle}</h1>
                    <p className='text-slate-400 leading-relaxed'>{note.noteData}</p>
                </div>
                <Link to={'/edit-note/'+String(note._id)} className='mt-auto'>
                    <button className='w-full py-2.5 rounded-xl font-semibold text-slate-300 bg-slate-800 border border-slate-700 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-400 transition-all duration-300 cursor-pointer'>
                        Edit
                    </button>
                </Link>
            </div>
        ))):(
            <div className='col-span-full flex justify-center items-center h-64 text-slate-400 text-lg sm:text-xl'>No Notes found. Create one!</div>
        )}
    </div>
  )
}

export default Notes