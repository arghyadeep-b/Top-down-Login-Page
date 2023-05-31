// import './SocialContainer.css'
import React, { useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {auth,ga,fa,ta} from "./Firebase"
import {signInWithPopup} from "firebase/auth";




   export function SocialContainer() {
    const [isActive, setIsActive] = useState(false);
    const[value,setValue]=useState('')
  
  
  
  
  
  //googleauth
    
    const googleClick =()=>{
  
      signInWithPopup(auth,ga).then((data)=>{
         setValue(data.user.email)
         localStorage.setItem('email',data.user.email)
      })
     }
     useEffect(()=>{
         setValue(localStorage.getItem('email'))
     })
  
  
  
  
  
  
     //facebookauth
     const facebookClick =()=>{
   
       signInWithPopup(auth,fa).then((data)=>{
          setValue(data.user.email)
          localStorage.setItem('email',data.user.email)
       })
      }
      useEffect(()=>{
          setValue(localStorage.getItem('email'))
      })
  
  
  
  
  
  
      //twitterauth
      const twitterClick =()=>{
   
        signInWithPopup(auth,ta).then((data)=>{
           setValue(data.user.email)
           localStorage.setItem('email',data.user.email)
        })
       }
       useEffect(()=>{
           setValue(localStorage.getItem('email'))
       })
  
       

    return (
        <div className="social-container">
            <button onClick={facebookClick} className="social"><FontAwesomeIcon icon={faFacebookF} /></button>



            <button onClick={googleClick} className="social"><FontAwesomeIcon icon={faGoogle} /></button>


            <button  onClick={facebookClick} className="social"><FontAwesomeIcon icon={faTwitter} /></button>
        </div>
    );
}





