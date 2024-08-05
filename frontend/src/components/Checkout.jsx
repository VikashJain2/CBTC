import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { eventContext } from '../context/eventContext'

const Checkout = ({event}) => {
    const {url, token} = useContext(eventContext)
    const onCheckOut = async(e)=>{
        e.preventDefault()
     
        const order ={
            eventId: event.id,
            eventImage: event.image,
            eventStartDate: event.startDate,
            eventTitle: event.title,
            price: event.price,
            isFree: event.isFree,
            organizer:event.organizer
        }

        const response = await axios.post(url+"/api/order/place-order",order,{headers:{token}})
        if(response.data.success){
          window.location.replace(response.data.session_url)
        }
        else{
          alert(response.data.message)
        }
    }
    useEffect(()=>{
console.log(event);
    },[])
  return (
    <form onSubmit={onCheckOut}>
      <button className='btn' type='submit'>
        {
            event.isFree ? 'Get Ticket' : "Buy Ticket"
        }
      </button>
    </form>
  )
}

export default Checkout
