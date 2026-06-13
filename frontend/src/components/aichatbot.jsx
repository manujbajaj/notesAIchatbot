import React from 'react'
import { useState } from 'react'
import api from '../api'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Aichat = () => {
    const [prompt,setPrompt]=useState("")
    const [output,setOutput]=useState("")
    const [loading,setLoading]=useState(false)

    const handleChange=async(e)=>{
        const {name,value,files}=e.target;

        setPrompt(value)
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(output);
            alert("Copied!");
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        setLoading(true)

        const res=await api.post("/AI/generate-text",{prompt});



        setOutput(res.data.output)

        setLoading(false)


        
    }
    
  return (
    <div className='w-full h-full max-h-full p-4'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 h-full items-center w-full'>
            {loading? <Box className='border p-2 w-full h-1/2 flex justify-center items-center' sx={{ display: 'flex' }}>
                    <CircularProgress size={100} aria-label="Loading…" />
                    </Box>
            :
            <textarea name="output-box" disabled className='border p-2 w-full h-1/2' value={output}></textarea>}
            <input type="text" className='border outline-0 w-1/3 h-1/8  p-2' placeholder='ask whatever you want to' onChange={handleChange} ></input>
            {output.length>0&&(
                <button onClick={copyToClipboard}>Copy</button>
            )}
            <button type="submit" className='border rounded-xl pt-3 pb-3 text-xl font-bold w-1/4 cursor-pointer'>send</button>
        </form>
    </div>
  )
}


export default Aichat