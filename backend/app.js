import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

const app=express()

app.use(express.static("./public"))

app.use(cookieParser())

app.use(cors())

app.use(express.urlencoded({extended:true}))



import { userRouter } from "./src/routes/user.routes.js"
import { noteRouter } from "./src/routes/note.routes.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/notes",noteRouter)



export default app