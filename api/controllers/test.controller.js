import jwt from "jsonwebtoken"
export const shouldBeLoggedIn=async (req,res)=>{
    console.log(req.userId)
    res.status(200).json({message:"You Are Authenticated"})
}
export const shouldBeAdmin=async (req,res)=>{
    console.log(req.cookies,"hi")
    const token=req.cookies.token 
    console.log(token)
    if(!token)return res.status(401).json({message:"Not Authenticated!"})

    jwt.verify(token,process.env.JWT_SECRET_KEY, async (err,payload)=>{
        if(err) return res.status(403).json({message:"Token is Not Valid"})
        if(!payload.isAdmin)return res.status(403).json({message:"NOt Authorized"})
    })
    res.status(200).json({message:"You Are Authenticated"})
}