import { AuthContext } from "../../context/AuthContext";
import {useContext,useState} from "react"
import "./profileUpdatePage.scss";
import apiRequest from "../../lib/apiRequest.js" 
import {useNavigate} from "react-router-dom"
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";
import Cookies from 'js-cookie';
function ProfileUpdatePage() {
  const {currentUser,updateUser}=useContext(AuthContext)
  const [error,setError]=useState("")
  const [avatar,setAvatar]=useState([])
  const navigate=useNavigate()
  console.log(currentUser)

  const [username,setUsername]=useState(currentUser.username || currentUser.data.username)
  const [email,setEmail]=useState(currentUser.email || currentUser.data.email)
  const [password,setPassword]=useState(null)

  const handleSubmit=async (e)=>{
    e.preventDefault()
    // const formData=new FormData(e.target)
    // console.log(formData)
    // const {username,email,password}=Object.fromEntries(formData)
    // if(password===undefined)password=currentUser.password
    console.log(username,email,password)
    const token = Cookies.get("token");
    console.log(token)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
    try{
      const res=await apiRequest.put(`/users/${currentUser.id ||currentUser.data.id}`,{
        username,email,password,avatar:avatar[0]
      },config)//update in the database
      updateUser(res.data)//update in the localStorage
      navigate("/profile")
    }
    catch(err){
      console.log(err.response.data.message)
      setError(err.response.data.message)
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username || currentUser.data.username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email || currentUser.data.email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] ||(currentUser.avatar || currentUser.data.avatar) || "/noavatar.jpeg"} alt="" className="avatar" />
        <UploadWidget uwConfig={{
          cloudName:"dk0f8cdip",
          uploadPreset:"estate",
          multiple:false,
          maxImageFileSize:200000,//2 mb
          folder:"avatars"
        }}
        setState={setAvatar}/>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;