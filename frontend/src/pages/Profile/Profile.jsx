import React, { useContext, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { eventContext } from '../../context/eventContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const {token} = useContext(eventContext)
const navigate = useNavigate()
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    })
  return (
    <div className='profile'>
   {/* <Sidebar/> */}
    
    </div>
  )
}

export default Profile
