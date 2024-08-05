import React, { useContext } from 'react'
import { eventContext } from '../context/eventContext'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'

const CheckoutButton = ({event}) => {
  const {token} = useContext(eventContext)
    const hasEventFinished = new Date(event.endDate) < new Date()
  return (
    <div className='checkout-btn'>
      {
        hasEventFinished ?(
          <p className='btn-text'>Sorry, tickets are no longer available</p>
        ): (
          <>
          {
            !token ? <button className='btn'>
              <Link to="/login">Get Tickets</Link>
            </button> :  <Checkout event={event}/>
          }
          </>
        )
      }
    </div>
  )
}

export default CheckoutButton
