import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./Sidebar.css"
import { eventContext } from '../../context/eventContext'
import logo from "../../assets/eventLogo.png"
import { toast } from 'react-toastify'
const Sidebar = () => {
  const {token,setToken} = useContext(eventContext)
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    setToken("")
    navigate("/login")
  }

  return (

    <div className='sidebar'>
        
        <div className="sidebar-options">
        <NavLink to="/" className="sidebar-option">
        <i className="fa-solid fa-arrow-left"></i>
        <p>BACK</p>
            </NavLink>
            {/* <h2 className='sidebar-heading'>Dashboard</h2> */}
        <NavLink to="/dashboard/home" className="sidebar-option">
            <i className="fa-solid fa-home"></i>
            <p>Home</p>
            </NavLink>
            <NavLink to="/dashboard/events" className="sidebar-option">
            <i className="fa-regular fa-calendar"></i>
            <p>Events</p>
            </NavLink>
            <NavLink to="/dashboard/ticket" className="sidebar-option">
            <i className="fa-solid fa-ticket"></i>
            <p>Tickets</p>
            </NavLink>
             <NavLink to="/dashboard/notification" className="sidebar-option">
            <i className="fa-regular fa-bell"></i>
            <p>Notification</p>
            </NavLink>
            
        </div>
        <div className="sidebar-logout">
        <div className="sidebar-link-2">
        <i className="fa-solid fa-gear"></i> <li>Setting</li>
            </div>
            <div className="sidebar-link-2" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i>  <li>Logout</li>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
