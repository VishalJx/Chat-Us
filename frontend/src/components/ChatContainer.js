import React,{useState, useEffect, useRef} from "react";
import "./ChatContainer.css";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import {v4 as uuidv4} from "uuid";

function ChatContainer({currentChat, currentUser, socket}){

  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();

  useEffect(()=>{
    if(currentChat){
      (async()=>{
      await fetch("http://localhost:5000/getmsg", {
      method: "post",
      body: JSON.stringify({
          from : currentUser._id,
          to: currentChat._id,
      }),
      headers: {
          "Content-type": "application/json"
      }
      }).then(response => response.json())
      .then((data)=>setMessages(data));
      })();
    }
  
  },[currentChat])

  //Sending message data...
    const handleSendMsg=async(msg)=>{
    await fetch("http://localhost:5000/addmsg", {
    method: "post",
    body: JSON.stringify({
        from : currentUser._id,
        to: currentChat._id,
        message: msg
    }),      
    headers: {
        "Content-type": "application/json"
    }
    }).then(response => response.json())
    .then(data => data);

    socket.current.emit("send-msg",{
      to:currentChat._id,
      from: currentUser._id,
      message:msg,
    });
    const msgs =[...messages];
    msgs.push({fromSelf:true, message:msg});
    setMessages(msgs);
}

useEffect(()=>{
  if(socket.current){
    socket.current.on("msg-recieve",(msg)=>{
      setArrivalMsg({fromSelf:false, message:msg})
    });
  }
},[])

useEffect(()=>{
  arrivalMsg && setMessages((prev)=>[...prev, arrivalMsg]);
},[arrivalMsg])

useEffect(()=>{
  scrollRef.current?.scrollIntoView({behaviour:"smooth"});
},[messages])

  return (
    <>{
        currentChat && (   //further content will be loaded only after the currentChat data is loaded otherwise white screen is show
            <div className="chatContainer">
                <div className="chat-header">
                    <div className="user-details">
                        <div className="profile-pic">
                            <img src={currentChat.profile} alt="" />
                        </div>
                        <div className="username">
                            <h3>{currentChat.username}</h3>
                        </div>
                    </div>
                    <Logout/>
                </div>
                <div className="chat-messages">
                  {
                    messages.map((message)=>{
                      return(
                        <div ref={scrollRef} key={uuidv4()}>
                          <div className={`message ${message.fromSelf ? "sended":"recieved"}`}>
                            <div className="content">
                              <p>
                                {message.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="chat-input">
                    <ChatInput handleSendMsg={handleSendMsg}/>
                </div>
            </div>
        )
    }</>
  )
};

export default ChatContainer;
