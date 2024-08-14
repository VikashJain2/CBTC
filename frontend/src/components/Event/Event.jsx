import React, { useContext } from "react";
import { events } from "../../assets/assets";
import Card from "../Card/Card";
import "./Event.css";
import { eventContext } from "../../context/eventContext";
import Loader from "../Loader";
const Event = () => {
  const { allEvents, loading } = useContext(eventContext);
  return (
    <div className="event">
      <div className="event-heading">
        <h2>
          Trusted By <br /> Thousand of Events
        </h2>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="event-container">
          {allEvents.map((item, index) => {
            return (
              <Card
                key={index}
                img={item.image}
                price={item.price}
                date={item.startDateTime}
                title={item.title}
                category={item.category}
                isFree={item.isFree}
                organizer={item.organizer}
                id={item._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Event;
