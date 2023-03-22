import React from "react";
import "./Welcome.css";
import robot from "../assets/robot.gif"

function Welcome({currentUser}){

  return (
    <div className="welcome">
      <img src={robot} alt="" />
      <h1> Welcome, <span>{currentUser.username}</span></h1>
      <h3>Please select a chat to start messaging..</h3>
    </div>
  )
};

export default Welcome;
