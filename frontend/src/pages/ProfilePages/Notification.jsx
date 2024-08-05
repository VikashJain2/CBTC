import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { eventContext } from "../../context/eventContext";
import axios from "axios";
import { toast } from "react-toastify";
import AcceptButton from "./AcceptButton";
import { useNavigate } from "react-router-dom";
import "./Notification.css"
import NotFound from "./NotFound";
import ReactTimeAgo from "react-time-ago"
const Notification = () => {
  const { url, token, notification } = useContext(eventContext);
  const navigate = useNavigate();
  const removeNotification = async(id)=>{
    const response = await axios.post(url+"/api/notification/remove",{id})
    if(response.data.success){
        window.location.reload()
    }else{
        toast.error(response.data.message)
    }
  }
  return (
    <div className="notifications">
      <Button title="Notifications" button={false} />
    {
        notification.length <=0? <NotFound title="You don't have any notifications"/>:
    
      <div className="notification-container">
        {notification.map((item, index) => {
          return (
            <div className="notification" key={index}>
              <div className="notification-info">
                <div className="user-profile-icon2">
                  <p>
                    {item.fromUserEmail ? item.fromUserEmail.split("").shift() : <></>}
                  </p>
                </div>

                <div className="user-info">
                    <div className="user">
                    <p className="users-email">From: {item.fromUserName}</p>
                    <i className="fa-solid fa-trash" onClick={()=>removeNotification(item._id)}></i>
                    </div>
                 
                  <p className="message">{item.message}</p>

                  {item.isInvitation ? (
                <button
                  onClick={() => navigate(`/event-detail/${item.eventId}`)}
                 className="see-btn">
                  See event
                </button>
              ) : (
                <></>
              )}

              {item.isInvitation ? (
                <AcceptButton id={item._id} eventId={item.eventId} eventName={item.eventName} toUser={item.fromUser} username={item.fromUserName} userEmail={item.fromUserEmail} organizer={item.organizer}/>
              ) : (
                <></>
              )}
                </div>
              </div>

              <p className="time-ago">{
                <ReactTimeAgo date={item.createdAt} locale="en-US"/>
                }</p>
            </div>
          );
        })}
    
      </div>
}
    </div>
  );
};

export default Notification;
