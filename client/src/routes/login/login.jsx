import "./login.scss";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie"
//import Cookies from "js-cookie"
//to make a request to the database we use axios
import apiRequest from "../../lib/apiRequest" 
import {useNavigate} from "react-router-dom"
import {useContext,useState} from "react"
import {AuthContext} from "../../context/AuthContext"
function Login() {
  const [error,setError]=useState("")
  const [isLoading,setisLoading]=useState(null)
  const {updateUser} =useContext(AuthContext)
  const cookie = new Cookies()
  const navigate=useNavigate()
  const handleSubmit= async (e)=>{
    e.preventDefault()
    setisLoading(true)
    setError("")
    const formData=new FormData(e.target)
    const username=formData.get("username")
    const password=formData.get("password")
    try{
      const res=await apiRequest.post("/auth/login",{username,password})
      // localStorage.setItem("user",JSON.stringify(res.data))
      console.log(res.data.token)
      // cookie.set("token",res.data.token, {
      //   //httpOnly: true,
      //   secure: true,
      //   sameSite: "strict",
      //   maxAge: 31536000, // 1 year
      // })
      updateUser(res.data)
      navigate("/")
    }
    catch(err){
      console.log(err)
      //setError(err.message)
      setError("Failed to Login")
    }finally{
      setisLoading(false)
    }
    
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" required minLength={3} maxLength={20}/>
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span> }
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;