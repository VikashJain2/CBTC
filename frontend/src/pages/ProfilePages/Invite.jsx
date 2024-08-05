import React, { useContext, useEffect, useState } from 'react'
import { eventContext } from '../../context/eventContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Invite = ({eventId,eventName,setShowInvite,organizer}) => {
    const {url,token} = useContext(eventContext)
    const [usersList, setUsersList] = useState([])
    const [toUser, setToUser] = useState("")
    // const [isInvitation,setIsInvitation] = useState(false)
    // let message =  `You have an invitation to join ${eventName} by ${organizer}`
    const fetchUsersList = async()=>{
        const response = await axios.get(url+"/api/user/get-all");
        if(response.data.success){
            setUsersList(response.data.data)
            // console.log(response.data.data);
            
        }else{
            toast.error(response.data.message)
        }
    }
  
    const handleInvite = async(toUser,invitationValue,username,userEmail,typeValue)=>{
        const isInvitation = invitationValue
        const type = typeValue
        const response = await axios.post(url+"/api/notification/invitation",{eventId,eventName,toUser,isInvitation,organizer,username,userEmail,type},{headers:{token}})

        if(response.data.success){
            toast.success(response.data.message)
            setShowInvite(false)
        }
        else{
            toast.error(response.data.message)
        }
    }
    useEffect(()=>{
        
         fetchUsersList()
         
         
    },[token])
  return (
    <div className="invite-container">
        <div className="search-user">
            <h3>Send Invitation</h3>
            <i className="fa-solid fa-xmark crossicon" onClick={()=>setShowInvite(false)}></i>
        </div>
        <div className="search-input">
            <input type="text" placeholder='Search name or email'/>
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>

       {
        usersList.map((user,index)=>{
return <div className="all-user-list" key={index}>


            <div className="users-list">
            <div className="user-profile-icon">
            <p>{user.email? user.email.split("").shift():<></>}</p>
            </div>
            <div className="user-info">
            <p className='user-name'>{user.name}</p>
            <p className='user-email'>{user.email}</p>
            </div>
            
          </div>
          <p className='invite-btn' onClick={()=>handleInvite(user._id,true,user.name,user.email,"invite")}>Invite</p>
          </div>
        })
       }
    </div>
  )
}

export default Invite
