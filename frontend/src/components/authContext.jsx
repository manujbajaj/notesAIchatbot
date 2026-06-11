import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'


export const Authcontext=createContext()

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
  return (
    <Authcontext.Provider value={{user,setUser}}>
        {children}
    </Authcontext.Provider>
  )
}

export  {AuthProvider}  