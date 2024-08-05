import React, { useContext } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { eventContext } from '../../context/eventContext'
import { toast } from 'react-toastify'
import logo from "../../assets/eventLogo.png"
const Navbar = () => {
  const navigate = useNavigate()
  const {token,setToken,email} = useContext(eventContext)
  // console.log(email);

  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setToken("")
    toast.warn("user logged out!")
  }
  // const token = localStorage.getItem("token")
  return (
    <div className='navbar'>
      
      <nav className="container">
        <div className="nav-logo">
            <img src={logo} alt="" className='logo' onClick={()=>navigate("/")}/>
        </div>
        <div className="nav-links">
            <ul className='nav-ul'>
                {/* <li>Events</li> */}
              {
                token ?
                <li onClick={()=>navigate("/dashboard/home")} className='dashboard-link'>Dashboard</li>
                : <></>
              }
                {
                  !token?<li onClick={()=>navigate("/login")}>
                   <div className="login-btn-2">
                  <button>Login</button>
                    </div> 
                  </li>:<li>
                  <div className='user-profile'>
                    <p>{email? email.split("").shift():<></>}</p>
             
                    <div>

                   
                 
                    <ul className="navbar-profile-dropdown">
                      {/* <li className='navbar-profile-icons'>
                      <i className="fa-solid fa-user"></i>
                        <p>Profile</p>
                      </li>
                      <hr /> */}
                    
                      <li onClick={logout} className='navbar-profile-icons'>
                      <i className="fa-solid fa-right-from-bracket"></i>
                        <p>Logout</p>
                      </li>
                    </ul>
                  </div>
                  </div>
                </li>

                }
                
                

                
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
