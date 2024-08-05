import React, { useContext } from "react";
import { eventContext } from "../../context/eventContext";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
const Ticket = ({ img, date, title, ticketNumber, id }) => {
  const { url } = useContext(eventContext);
  const handleDelete = async () => {
    const response = await axios.post(url + "/api/order/remove", { id });
    if (response.data.success) {
      toast.success(response.data.message);
      window.location.reload();
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="card">
      <div className="card-img">
        <img src={url + "/images/" + img} alt="" />
      </div>

      <div className="icons">
        <i className="fa-solid fa-trash" onClick={handleDelete}></i>
      </div>
      <div className="card-info">
        <p className="card-date">{format(date, "do MMMM yyyy, h:mm a")}</p>
        <h3 className="card-name">{title}</h3>
        {/* <button className='card-btn'>Buy Tickets</button> */}
      </div>
      <div className="ticketNumber">
        <p>Ticket No: {ticketNumber}</p>
      </div>
    </div>
  );
};

export default Ticket;
