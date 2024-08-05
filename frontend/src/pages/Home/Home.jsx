import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import Event from '../../components/Event/Event'
import { eventContext } from '../../context/eventContext'
import Footer from '../../components/Footer'

const Home = () => {
  const {fetchAllEvents}  = useContext(eventContext)
  useEffect(()=>{
    fetchAllEvents()
  },[])
  return (
    <div>
         <Navbar/>
      <Banner/>
      <Event/>
      <Footer/>
    </div>
  )
}

export default Home
