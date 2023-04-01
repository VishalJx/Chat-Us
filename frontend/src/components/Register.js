import React, {useState} from "react";
import "./Register.css"
import { Link } from "react-router-dom";
import { BsFillEyeFill,BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

function Register(){
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");


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
        })

    const notification2 = (message)=>toast.success(message,
        {position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        })

    // ----to set data inside form----


    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(handleValidation()){
            fetch("/register",{
                method:'post',
                headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify({
                email:email,   //RHS variable is from useState
                username:username,
                password:password
                })
            }).then(resp=>resp.json())
            .then(data=>{
                if(data.error){
                notification1(data.error)
                }else{
                notification2(data.message)
                navigate("/login");
                }
                })
            }
    }

    // ----for validations of form inputs----
    const handleValidation=()=>{
        const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(username.length < 4){
            notification1("Username must be at least 3 characters");
            return false;
        }
        else if(!mailRegex.test(email)){
            notification1("Invalid Email");
            return false;
        }
        else if(password !== cpassword){
            notification1("Confirm password do not match !!");
            return false;
        } 
        return true;
    }

    // ----to show and hide password----
    const showIcon=()=>{
        setShow(!show)
    }
    const showIcon2=()=>{
    setShow2(!show2)
    }



  return (
    <>
    <div className="register">
        <form className="form">
            <div className="header">
                <img src="" alt="" />
                <h1 style={{fontSize:"3rem", color:"white",paddingBottom:"1rem"}}>ChatUs</h1>
            </div>

            <input type="text" placeholder="Username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>

            <input type="email" placeholder="Email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

            <div className="style" style={{width:"100%",display:"flex", alignItems:"center"}}>
                <input type={show?"text":"password"} placeholder="Password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <span onClick={()=>showIcon()}>{show?<BsFillEyeSlashFill style={{color:"white", fontSize:"1.2rem", margin:"0.8rem",cursor:"pointer"}}/>:<BsFillEyeFill style={{color:"white", fontSize:"1.2rem", margin:"0.8rem",cursor:"pointer"}}/>}</span>
            </div>
            
            <div className="style" style={{width:"100%",display:"flex", alignItems:"center"}}>
                <input type={show2?"text":"password"} placeholder="Password" name="cpassword" value={cpassword} onChange={(e)=>{setCPassword(e.target.value)}}/>
                <span onClick={()=>showIcon2()}>{show2?<BsFillEyeSlashFill style={{color:"white", fontSize:"1.2rem", margin:"0.8rem",cursor:"pointer"}}/>:<BsFillEyeFill style={{color:"white", fontSize:"1.2rem", margin:"0.8rem",cursor:"pointer"}}/>}</span>
            </div> 

            <button className="button" onClick={(e)=>handleSubmit(e)}>REGISTER</button>

            <span style={{fontSize:"1.1rem", color:"white",paddingBottom:"0rem"}}>Already have an account ? <Link to='/login' style={{color:"grey"}}>Login</Link></span>
        </form>
    </div>
    </>
  )
};


export default Register;
