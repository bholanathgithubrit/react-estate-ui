import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import express from "express"
const app = express()

app.use(cookieParser())
export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        console.log(hashPassword)
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        })
        console.log(newUser)
        res.status(201).json({ message: "User created Successfully" })

    }
    catch(error){
        console.log(error)
        res.status(404).json({message:"Failed to create User"})
    }
}
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(400).json({ message: "Invalid username!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Password!" });

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );
    console.log(token)
    
    //Store token in cookie
    
    const { password: userPassword, ...userInfo } = user;
    // Store token in local storage (client-side)

    res.cookie('token', "token", {
      httpOnly: true,
      secure: true,
      maxAge: age,
    })

    return res.status(201).send({
      message:"login"
    })
    //res.json(userInfo)
    // You can also store the token in session storage or other storage mechanisms
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};
  
export const logout = (req, res) => {
  // const token = req.headers.authorization
  // console.log(token + "this is")
  console.log(req.cookies["token"])
  res.clearCookie('token').status(201).json({message:"LogOut successfully"})
}