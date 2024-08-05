import React, { useContext, useEffect, useState } from "react";
import "./EventDetail.css";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { eventContext } from "../../context/eventContext";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import { format } from "date-fns";
import CheckoutButton from "../CheckoutButton";
const EventDetail = () => {
  const { url } = useContext(eventContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [eventData, setEventData] = useState({
    id:"",
    title: "",
    description: "",
    location: "",
    price: "",
    category: "",
    organizer: "",
    isFree: false,
    image: "",
    startDate: Date.now(),
    endDate: Date.now(),
  });
  const fetchEventDetail = async () => {
    const response = await axios.get(url + `/api/event/single-event/${id}`);
    if (response.data.success) {
      setEventData({
        id:response.data.event._id,
        title: response.data.event.title,
        description: response.data.event.description,
        location: response.data.event.location,
        price: response.data.event.price,
        category: response.data.event.category,
        organizer: response.data.event.organizer,
        image: response.data.event.image,
        startDate: response.data.event.startDateTime,
        endDate: response.data.event.endDateTime,
        isFree: response.data.event.isFree,
      });

    //   console.log(eventData);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(()=>{
    fetchEventDetail();
  },[])
  return (
    <div className="event-detail">
      <Navbar />

      <div className="event-page">
        <div className="event-image">
          <img
            src={url + "/images/" + eventData.image}
            alt=""
            width={750}
            height={1000}
            className="img"
          />
        </div>
        <div className="event-data">
          <div className="event-title">
            <h2>{eventData.title}</h2>
          </div>

          <div className="event-pricing">
            {eventData.isFree ? (
              <p className="event-price">Free</p>
            ) : (
              <p className="event-price">${eventData.price}</p>
            )}
            <p className="event-category">{eventData.category}</p>

            <p className="event-organizer">
              <span>by</span>&nbsp;&nbsp;{eventData.organizer}
            </p>
          </div>

          <CheckoutButton event={eventData}/>

          <div className="event-date-location">
            <i
              className="fa-solid fa-calendar-days"
              height={34}
              width={34}
              style={{
                color: "red",
              }}
            ></i>
            <div className="event-date">
              <p>
                {format(eventData.startDate, "do MMMM yyyy")} -{" "}
                {format(eventData.startDate, "h:mm a")}
              </p>
              <p>
                {format(eventData.endDate, "do MMMM yyyy")} -{" "}
                {format(eventData.endDate, "h:mm a")}
              </p>
            </div>
          </div>

          <div className="event-location">
            <i
              className="fa-solid fa-location-dot"
              style={{
                color: "red",
              }}
            ></i>
            <p>{eventData.location}</p>
          </div>
        </div>
      </div>

      <div className="event-description">
        <h3>About Event</h3>

        <p className="event-para">{eventData.description}</p>
      </div>
    </div>
  );
};

export default EventDetail;
