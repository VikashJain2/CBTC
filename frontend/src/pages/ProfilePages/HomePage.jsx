import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import "./HomePage.css";
import { eventContext } from "../../context/eventContext";
import Card from "../../components/Card/Card";
import search from "../../assets/search.jpg";
import EventCard from "./EventCard";
import Invite from "./Invite";
import NotFound from "./NotFound";
const HomePage = () => {
  // const [events, setEvents] = useState([])
  const [showInvite,setShowInvite] = useState(false)
  const [eventId,setEventId] = useState("")
  const [eventName,setEventName] = useState("")
  const [organizer,setOrganizer] = useState("")
  const { url, events, setEvents,fetchEvents,token} = useContext(eventContext);

  return (
    <div className="home">
      <Button title="Dashboard" button={true} />
      <h3 style={{ padding: "25px" }}>My Events</h3>
      <div className="event">
        {events.length <= 0 ? (
          <NotFound title="No events found. Add your first event"/>
        ) : (
          <div className="event">
            <div className="Home-event">
              <div className="event-container">
                {events.map((event, index) => {
                  return (
                    <EventCard
                      key={index}
                      img={`${url}/images/${event.image}`}
                      title={event.title}
                      description={event.description}
                      price={event.price}
                      category={event.category}
                      date={event.startDateTime}
                      isFree={event.isFree}
                      organizer={event.organizer}
                      id={event._id}
                      setShowInvite = {setShowInvite}
                      setEventId={setEventId}
                      setEventName={setEventName}
                      setOrganizer={setOrganizer}
                    />
                  );
                })}
              </div>
              {
                showInvite ? <Invite eventId={eventId} eventName={eventName} setShowInvite={setShowInvite} organizer={organizer}/> : <></>
              }
             
            </div>
          
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
