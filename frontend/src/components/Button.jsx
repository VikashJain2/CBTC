import React from 'react'
import "./Button.css"
import { useNavigate } from 'react-router-dom';
const Button = ({title, button}) => {
  const navigate = useNavigate()
    const date = new Date();
// const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const formattedDate = `${date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'long' })}`;
// console.log(formattedDate);
  return (
    <div className='button'>
        <div className="info">
        <h3>{title}</h3>
        <p>{formattedDate}</p>
       
        </div>
     {
      !button ? <></>: <button className='create-btn' onClick={()=>navigate("/dashboard/events")}>&#xFF0B;Create</button>
     }
     
    </div>
  )
}

export default Button
