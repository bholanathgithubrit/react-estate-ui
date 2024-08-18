import List from "../../components/list/List.jsx"; 
import Chat from "../../components/chat/Chat.jsx"
import "./profilePage.scss"
import apiRequest from "../../lib/apiRequest.js"
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext.jsx";
import {useContext} from "react"
import {Link} from "react-router-dom"
import Cookies from 'js-cookie';

function ProfilePage() {
const {currentUser,updateUser}=useContext(AuthContext)
  console.log(currentUser)
  const navigate=useNavigate()
  const handleLogout=async ()=>{
    try{
      const token = Cookies.get("token")
      const config = {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      const res=await apiRequest.post("/auth/logout",{},config)
      console.log(res.data.message)
      console.log(Cookies.get("token"))
      Cookies.remove('token')
      updateUser(null)
      navigate("/")
    }
    catch(err){ 
      console.log(err)
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update"><button>Update Profile</button></Link>
          </div>
          <div className="info">
            <span>
              Avatar: <img src={currentUser.avatar || currentUser.data.avatar || "/noavatar.jpeg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username || currentUser.data.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email || currentUser.data.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
            <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
