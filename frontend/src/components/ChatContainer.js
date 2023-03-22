import React from "react";
import "./ChatContainer.css";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

function ChatContainer({currentChat}){

    const handleSendMsg=async(msg)=>{

    }

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
                <div className="chat-messages"></div>
                <div className="chat-input">
                    <ChatInput handleSendMsg={handleSendMsg}/>
                </div>
            </div>
        )
    }</>
  )
};

export default ChatContainer;
