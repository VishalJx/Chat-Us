import React,{useState, useEffect, useRef} from "react"
import { useNavigate } from "react-router-dom";
import ChatContainer from "./ChatContainer";
import "./Chats.css";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import {io} from "socket.io-client";

function Chats(){
  const socket = useRef();
  const navigate  = useNavigate();
  const [data, setData] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  //if token is not available then we'll navigate back to signup/in page
  useEffect(()=>{

      const token = localStorage.getItem("jwt");
      (async()=>{
        if(!token){
            return navigate("login")
        }else{
          setCurrentUser( JSON.parse(localStorage.getItem("user")));
          setIsLoaded(true);
        }
      })();

    //fetching data of contacts
    fetch(`http://localhost:5000/users`,{
      headers:{
        "Content-Type":"application/json",
        "Authorization":""+localStorage.getItem("jwt")
    },
    }).then(resp=>resp.json())
    .then(result=>{
      setData(result)})
    .catch(err=>console.log(err));
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser]);

  const handleChatChange =(chat)=>{
    setCurrentChat(chat);
  }

  return (
    <div className="chats">
      <div className="chat-container">
        <Contacts data={data} changeChat={handleChatChange}/>
        {
          isLoaded && currentChat ===undefined?(
            <Welcome currentUser={currentUser}/>
          ):(
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )
        }
        {
          /*above data was being loaded in the components way before the loading of useState hook
          hence we used isLoaded; when the data in useEffect will be loaded and isLoad is set as true; 
          then only the prop will be passed in the component*/
        }
      </div>
    </div>
  )
};

export default Chats;
