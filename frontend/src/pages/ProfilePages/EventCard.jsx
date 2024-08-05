import React, { useContext } from 'react'
import "./EventCard.css"
import { format } from 'date-fns';
import axios from 'axios';
import { eventContext } from '../../context/eventContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const EventCard = ({img,price,date,title,category,isFree,organizer,id,setShowInvite,setEventId,setEventName,setOrganizer}) => {
    const {url} = useContext(eventContext)
    const handleDelete = async()=>{
        const response = await axios.post(url+"/api/event/delete",{id})
        if(response.data.success){
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }
    const handleInvite = ()=>{
      setShowInvite(true)
      setEventId(id)
      setEventName(title)
      setOrganizer(organizer)
    }
    return (
        <div className='card'>
          <div className="card-img">
            <img src={img} alt="" />
          </div>
        <div className="icons">
       <Link to={`/dashboard/update/${id}`}> <i className="fa-regular fa-pen-to-square"></i></Link>
        <i className="fa-solid fa-trash" onClick={handleDelete}></i>
        <i className="fa-solid fa-users" onClick={handleInvite}></i>
        </div>
          <div className="card-info">
            <div className="card-price">
              {
                isFree? <h3>Free</h3> :<h3>${price}</h3>
              }
              
              <p>{category}</p>
             
            </div>
            <p className="card-date">{format(date, 'do MMMM yyyy, h:mm a')}</p>
            <h3 className="card-name">{title}</h3>
            {/* <button className='card-btn'>Buy Tickets</button> */}
          </div>
          <div className='organizer'>
          <p>{organizer}</p>
          <Link to={`/dashboard/guest-list/${id}`}>Guest List</Link>
          </div>
          
        </div>
      )
}

export default EventCard
