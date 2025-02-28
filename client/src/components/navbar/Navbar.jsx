import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Navbar() {
  const [open, setOpen] = useState(false)
  const {currentUser}=useContext(AuthContext)
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>RealState</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agent</a>
      </div>
      <div className="right">
        {/* {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar||currentUser.data.avatar || "/noavatar.jpeg"} alt="" />
            <span>{currentUser.username||currentUser.data.username}</span>
            <Link to="/profile" className="profile">

            <div className="notification">3</div>
            <span>Profile</span>
              
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign-in</a>
            <a href="/register" className="register">
              Sign-up
            </a>
          </>
        )} */}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu  active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agent</a>
          <a href="/">Sign-In</a>
          <a href="/">Sign-Up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
