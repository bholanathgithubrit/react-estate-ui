import Slider from "../../components/slider/Slider.jsx";
import "./singlePage.scss"
//import {singlePostData,userData} from "../../lib/dummydata.js"
import Map from "../../components/map/Map.jsx"
import { useLoaderData } from "react-router-dom"
import DOMPurify from "dompurify"
import apiRequest from "../../lib/apiRequest"
import {AuthContext} from "../../context/AuthContext"
import {useContext,useState} from "react"
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
function SinglePage() {
  const post =useLoaderData()
  console.log(post)
  const [saved,setSave]=useState(post.isSaved)
  const {currentUser}=useContext(AuthContext)
  const navigate=useNavigate()
  const habdleSave=async ()=>{
    setSave((prev)=>!prev)
    if(!currentUser)navigate("/login")
      const token=Cookies.get("token")
    const config={
      headers:{
        Authorization:`Bearer ${token}`
      },
      withCredentials: true,
    }
    try{
      await apiRequest.post("/users/save",{
        postId:post.id
      },config)
    }catch(err){
      console.log(err)
      setSave((prev)=>!prev)
      // res.status(404).json({message:"POst Not Saved"})
    }
  }
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images}/>
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">${post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.postDetail.desc),}}>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featuteText">
                <span>Utilities</span>
                {
                  post.postDetail.utilities==="owner" ? 
                  <p>Owner is reponsible</p>:
                  <p>Tenant is reponsible</p>
                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featuteText">
                <span>pet Policy</span>
                {
                  post.postDetail.pet==="allowed" ? 
                  <p>Pet is Allowed</p>:
                  <p>Pet is Not Allowed</p>
                }
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featuteText">
                <span>Income Policy</span>
                <p>Must have {post.postDetail.income} the rent in the total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size}sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Near By Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]}/>
          </div>
          <div className="buttons">
            <button >
              <img src="/chat.png" alt="" />Send Message
            </button>
            <button onClick={habdleSave} style={{ backgroundColor:saved?"#fece51":"white" }}>
              <img src="/save.png" alt="" />{saved? "Place Saved":"Save the places"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
