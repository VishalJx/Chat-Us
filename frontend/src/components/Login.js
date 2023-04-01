import React, {useState} from "react";
import { BsFillEyeFill,BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import "./Login.css";


function Login(){
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // ----Toast notification settings----
    const notification1 = (message)=>toast.error(message,
        {position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
        });

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

      
  const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const postData =async()=>{
    //checking validity of email using regex
    if(!mailRegex.test(email)){
      notification1("Invalid Email")
      return        //to not to execute further
    }
    //Sending data to server
    fetch("/login",{
      method:'post',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,   //RHS variable is from useState
        password:password
      })
    }).then(resp=>resp.json())
    .then(data=>{
      if(data.error){
        notification1(data.error)
      }else{
        notification2(data.message);
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        navigate('/');
      }
    })
  }


    // ----to show and hide password----
    const showIcon=()=>{
        setShow(!show)
    }

  return (
    <>
    <div className="login register">
        <form className="form">
            <div className="header">
                <img src="" alt="" />
                <h1 style={{fontSize:"3rem", color:"white",paddingBottom:"1rem"}}>ChatUs</h1>
            </div>

            <input type="email" placeholder="Email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

            <div className="style" style={{width:"100%",display:"flex", alignItems:"center"}}>
                <input type={show?"text":"password"} placeholder="Password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <span onClick={()=>showIcon()}>{show?<BsFillEyeSlashFill style={{color:"white", fontSize:"1.2rem", margin:"0.8rem",cursor:"pointer"}}/>:<BsFillEyeFill style={{color:"white", fontSize:"1.2rem", margin:"0.8rem",cursor:"pointer"}}/>}</span>
            </div>
            
            <button className="button" onClick={(e)=>{e.preventDefault();postData()}}>LOGIN</button>

            <span style={{fontSize:"1.1rem", color:"white",paddingBottom:"0rem"}}>Don't have an account ? ? <Link to='/register' style={{color:"grey"}}>Register</Link></span>
        </form>
    </div>
    </>
  )
};

export default Login;
