import React from "react";
import "./Logout.css"
import { useNavigate } from "react-router-dom";
import {BiPowerOff} from "react-icons/bi"
import { toast } from "react-toastify";


function Logout(){
    const navigate = useNavigate();
    const handleClick=async()=>{
        localStorage.clear();
        navigate("login");
        notification2("You have been logged out !");
    }

    const notification2 = (message)=>toast.success(message,
    {position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
    });
  return (
    <div className="logout" onClick={handleClick}>
        <BiPowerOff/>
    </div>
  )
};

export default Logout;
