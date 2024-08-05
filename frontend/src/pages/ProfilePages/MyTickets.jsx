import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { eventContext } from "../../context/eventContext";
import Card from "../../components/Card/Card";
import { format } from "date-fns";
import Ticket from "./Ticket";
import Button from "../../components/Button";
import NotFound from "./NotFound";

const MyTickets = () => {
  const { url, token, myTickets } = useContext(eventContext);

  useEffect(() => {
   
  }, []);

  return (
    <div className='home'>
    <Button title="Event Tickets" button={false}/>
    <h3 style={{padding:"25px"}}>My Tickets</h3>
    <div className="event">

    {
      myTickets
      .length<=0?<NotFound title="No ticket found"/>
    :
    <div className="event-container">
      {
      myTickets.map((item) => {
        return <Ticket id={item._id} img={item.eventImage} title={item.eventTitle} date={item.eventStartDate} ticketNumber={item.ticketNumber}/>
      })}
    
    </div>
}
</div>

</div>
  );
};

export default MyTickets;
