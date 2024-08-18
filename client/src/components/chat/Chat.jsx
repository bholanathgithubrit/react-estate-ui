import "./chat.scss";
import {useState} from "react"
function Chat() {
  const [chat,setChat]=useState(true);
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <div className="message">
          <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
          <span>Bholanath Maity</span>
          <p>Price of the appartment</p>
        </div>
        <div className="message">
          <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
          <span>Bholanath Maity</span>
          <p>Price of the appartment</p>
        </div>
        <div className="message">
          <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
          <span>Bholanath Maity</span>
          <p>Price of the appartment</p>
        </div>
        <div className="message">
          <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
          <span>Bholanath Maity</span>
          <p>Price of the appartment</p>
        </div>
        <div className="message">
          <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
          <span>Bholanath Maity</span>
          <p>Price of the appartment</p>
        </div>
        <div className="message">
          <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
          <span>Bholanath Maity</span>
          <p>Price of the appartment</p>
        </div>
        <div className="message">
          <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
          <span>Bholanath Maity</span>
          <p>Price of the appartment</p>
        </div>
        <div className="message">
          <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
          <span>Bholanath Maity</span>
          <p>Price of the appartment</p>
        </div>
        <div className="message">
          <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
          <span>Bholanath Maity</span>
          <p>Price of the appartment</p>
        </div>
      </div>
      {chat && <div className="chatBox">
        <div className="top">
          <div className="user">
            <img src="https://i.ibb.co/SXn43F3/bhola.jpg" alt="" />
            Bholanath Maity
          </div>
          <span className="close" onClick={()=>setChat(false)}>X</span>
        </div>
        <div className="center">
          <div className="chatMessage own">
            <p>hi, i am bhola</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage ">
            <p>hi, i am bhola</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>hi, i am bhola</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage ">
            <p>hi, i am bhola</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>hi, i am bhola</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>hi, i am bhola</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage ">
            <p>hi, i am bhola</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>hi, i am bhola</p>
            <span>1 Hour ago</span>
          </div>
        </div>
        <div className="bottom">
          <textarea></textarea>
          <button>Send</button>
        </div>
      </div>}
    </div>
  );
}

export default Chat;
