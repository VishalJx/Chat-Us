import React,{useState, useEffect} from "react";
import ProfilePic from "./ProfilePic";
import "./Contact.css";

function Contacts({data, changeChat}){
  const [currentUserName , setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [profile, setProfile] = useState(false);

  useEffect(()=>{
    const currentUserData = JSON.parse(
      localStorage.getItem("user")
    );
    setCurrentUserName(currentUserData.username)
    setCurrentUserImage(currentUserData.profile);
    console.log(currentUserImage);
  },[])

  const changeCurrentChat=(index, contact)=>{
    setCurrentSelected(index);
    changeChat(contact);
  };

  const changeProfile=()=>{
    if(profile){
      setProfile(false);
    }else{
      setProfile(true)
    }
    console.log(profile)
  }

  return (
    <div className="main-contact">
        <div style={{textAlign:"center"}} className="contact-title">
          <h2>ChatUs</h2>
        </div>
        {currentUserImage && currentUserImage && (
          <div className="contact">
            {
              data.map((contact, index)=>{
                return(
                  <>
                    <div key={contact._id} className={`contacts ${index===currentSelected?"selected":""}`} onClick={()=>changeCurrentChat(index, contact)}>
                      <div className="contact-fix">
                        <div className="contact-profile">
                          <img src={contact.profile} alt=''></img>
                        </div>
                        <div className="contact-name">
                          <p >{contact.username}</p>
                        </div>
                      </div>
                    </div>
                    
                  </>
                )
              })
            }
          </div>
        )}
        <div className="currentUser">
          <div className="profile">
            <img src={currentUserImage} onClick={changeProfile} alt="" />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
            {
              profile && <ProfilePic changeProfile={changeProfile}/>
            }
    </div>
  )
};

export default Contacts;

