import dotenv  from "dotenv"
import { connectDB } from "./src/db/index.js"
import app from "./app.js"

dotenv.config(
    {
        path:"./.env"
    }
)

connectDB().then(()=>{

    app.get("/",(req,res)=>{
        res.send("hello ji")
    })

    app.listen(process.env.PORT,()=>{
        console.log(`mongodb connected successful at the port http://localhosh:${process.env.PORT}`);
        
    })
}).catch((err)=>{
    console.log(`error connecting db ${err.message}`);
})