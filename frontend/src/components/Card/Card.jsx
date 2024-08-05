import React, { useContext } from 'react'
import "./Card.css"
import { eventContext } from '../../context/eventContext'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
const Card = ({img,price,date,title,category,isFree,organizer,id}) => {
  const {url} = useContext(eventContext)
  const navigate = useNavigate()
  return (
    <div className='card' onClick={()=>navigate(`/event-detail/${id}`)}>
      <div className="card-img">
        <img src={url+"/images/"+img} alt="" />
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
      <div className='organizer-name'>
          <p>{organizer}</p>
          </div>
      
    </div>
  )
}

export default Card
