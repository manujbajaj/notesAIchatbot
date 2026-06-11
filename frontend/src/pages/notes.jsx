import React from 'react'
import api from '../api'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Notes = () => {
    const [loading,setLoading]=useState(true)
    const [notes,setNotes]=useState([])
    useEffect(()=>{
        const getNotes=async()=>{
            const notesData=await api.get("/notes/notes")
    
            setNotes(notesData.data.data)
            
        }
        getNotes()
    },[])
  return (
    <div className='grid grid-cols-2 p-5 gap-4 grid-'>
        {notes.length>0?(notes.map((note)=>(
            <div className='border flex justify-around' key={note._id}>
                <div className='flex flex-col gap-1'>

                <h1 className='font-extrabold'>Title: {note.noteTitle}</h1>
                <p>{note.noteData}</p>
                </div>
                <Link to={'/edit-note/'+String(note._id)}><button className='border p-3 pl-5 pr-5 rounded-2xl font-bold'>edit</button></Link>
            </div>
        ))):(
            <div>No Note found</div>
        )}
    </div>
  )
}

export default Notes