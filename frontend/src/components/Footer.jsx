import React from 'react'
import logo from "../assets/eventLogo.png"
import "./Footer.css"
const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-container">
        <div className="footer-logo" align="center">
            <img src={logo} alt="" className='logo'/>
        </div>
        <p>&copy; 2024 EventPlanner360. All Rights Reserverd</p>
      </div>
    </div>
  )
}

export default Footer
