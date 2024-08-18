import "./homePage.scss";
import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar.jsx"
import {AuthContext} from "../../context/AuthContext"
function HomePage() {
  const {currentUser} =useContext(AuthContext)
  console.log(currentUser)
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & get your Dream Place</h1>
          <p>Find your dream home with us! Browse thousands of listings, get expert advice, and experience the best in real estate services. Your perfect property awaits - search now and make it yours!</p>
          <SearchBar/>
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="./bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
