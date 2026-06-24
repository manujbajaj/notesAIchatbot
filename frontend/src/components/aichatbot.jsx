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
    <div className='w-full h-full max-h-full p-6 flex flex-col bg-slate-900 rounded-xl'>
        <h2 className='text-2xl font-bold text-teal-400 mb-4 text-center'>AI Assistant</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 h-full items-center w-full'>
            {loading? <Box className='w-full h-1/2 flex justify-center items-center bg-slate-800/50 rounded-2xl border border-slate-700' sx={{ display: 'flex' }}>
                    <CircularProgress size={60} sx={{ color: '#2dd4bf' }} aria-label="Loading…" />
                    </Box>
            :
            <textarea name="output-box" disabled className='w-full h-1/2 p-4 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none resize-none shadow-inner' value={output}></textarea>}
            
            <div className='sm:flex-col w-full flex gap-2 sm:gap-3 mt-auto'>
                <input type="text" className='flex-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all px-4 sm:px-6 py-3 placeholder:text-slate-500 shadow-md' placeholder='Ask whatever you want...' onChange={handleChange} ></input>
                <button type="submit" className='px-4 sm:px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-102 transition-all cursor-pointer'>Send</button>
            </div>
            
            {output.length>0&&(
                <button type="button" onClick={copyToClipboard} className='mt-2 px-6 py-2 rounded-full border border-teal-500/50 text-teal-400 hover:bg-teal-500/10 transition-colors duration-300'>Copy to Clipboard</button>
            )}
        </form>
    </div>
  )
}


export default Aichat