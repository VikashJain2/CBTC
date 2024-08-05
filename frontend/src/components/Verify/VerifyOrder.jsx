import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { eventContext } from '../../context/eventContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const VerifyOrder = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const {url} = useContext(eventContext)
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate()
    const verifyPayment = async()=>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if(response.data.success){
            navigate("/dashboard/ticket")
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment()
    })
  return (
    <>
    <Navbar/>
    <div className='verify'>
      <div className="spinner"></div>
    </div>
    </>
  )
}

export default VerifyOrder
