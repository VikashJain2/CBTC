import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { eventContext } from "../../context/eventContext";
import { toast } from "react-toastify";

const AcceptButton = ({
  eventId,
  eventName,
  toUser,
  organizer,
  username,
  userEmail,
  id
}) => {
    // const navigate = useNavigate()
  const { url, token } = useContext(eventContext);
  const removeNotification = async()=>{
    const response = await axios.post(url+"/api/notification/remove",{id})
    if(response.data.success){
        window.location.reload()
    }else{
        toast.error(response.data.message)
    }
  }
  const handleAccept = async (invitationValue, typeValue) => {
    const isInvitation = invitationValue;
    const type = typeValue;
    const response = await axios.post(
      url + "/api/notification/invitation",
      {
        eventId,
        eventName,
        toUser,
        isInvitation,
        organizer,
        username,
        userEmail,
        type,
      },
      { headers: { token } }
    );
    // console.log(notification);
    if (response.data.success) {
      toast.success("Response Send Successfully");
     await removeNotification()
    } else {
      toast.error(response.data.message);
    }
  };
  const handleReject = async (invitationValue, typeValue) => {
    const isInvitation = invitationValue;
    const type = typeValue;
    const response = await axios.post(
      url + "/api/notification/invitation",
      {
        eventId,
        eventName,
        toUser,
        isInvitation,
        organizer,
        username,
        userEmail,
        type,
      },
      { headers: { token } }
    );
    // console.log(notification);
    if (response.data.success) {
      toast.success("Response Send Successfully");
     await removeNotification()
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="btn-container">
      <button onClick={() => handleAccept(false, "accept")}>Accept</button>
      <button onClick={()=>handleReject(false,"reject")}>Reject</button>
    </div>
  );
};

export default AcceptButton;
