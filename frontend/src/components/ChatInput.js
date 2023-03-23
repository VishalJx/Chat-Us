import React,{useState} from "react";
import "./ChatInput.css";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";

function ChatInput({handleSendMsg}){
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg ] = useState("");

    const handleEmojiPicker=()=>{
        setShowEmojiPicker(!showEmojiPicker);
    };
    const handleEmojiClick=(event, emoji)=>{
        let message = msg;
        message += emoji;
        setMsg(message)
        console.log(emoji)
    };

    const sendChat = (event) => {
      event.preventDefault();
        handleSendMsg(msg);
        setMsg("");
    };

  return (
    <div className="chat-input">
      <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPicker}/>
            {
                showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
            }
        </div>
      </div>
      <form className="form-input" onSubmit={(event) => sendChat(event)}>
        <input type="text" placeholder="type your messsage here ..." value={msg} onChange={(e)=>setMsg(e.target.value)}></input>
        <button className="send">
            <IoMdSend/>
        </button>
      </form>
    </div>
  )
};

export default ChatInput;
