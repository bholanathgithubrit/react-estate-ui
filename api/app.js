import express from "express"
import cors from "cors"
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import prisma from "./lib/prisma.js"
const app=express()
app.use(cors({origin:process.env.CLIENT_URL,
    credentials: true
})) 
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute) 
app.use("/api/testRoute",testRoute)


app.get("/hello",async(req,res)=>{
    res.cookie("hello","hello",{
        httpOnly:true,
        secure:true
    })
    return res.status(201).send({
        mess:'hello'
    })
})



app.listen(3030,()=>{
    console.log("Sever is running at 3030")
}) 