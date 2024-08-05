import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { eventContext } from "../../context/eventContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./GuestList.css";
const GuestList = () => {
  const { url, token } = useContext(eventContext);
  const [list, setList] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [ticketNumber, setTicketNumber] = useState([]);
  const fetchGuestList = async () => {
    const response = await axios.post(url + `/api/order/list/${id}`);
    if (response.data.success) {
      setList(response.data.data.userArray);
      console.log(response.data.data);
      setTicketNumber(response.data.data.ticketNumber);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchGuestList();
    }
  }, [token]);

  return (
    <div className="guest-list">
      <Button title="Guest List" button={false} />

      <div className="list add flex-col">
        <p
          style={{
            color: "gray",
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          All Attendent List
        </p>
        <div className="list-table">
          
          <div className="list-table-format title">
            <b>User Id</b> <b>Ticket Number</b>
            <b>Name</b>
            <b>Email</b>
          </div>
          {list.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <p>{item._id}</p>
                <p>{ticketNumber[index]}</p>
                <p>{item.name}</p>
                <p>{item.email}</p>
                {/* <p>&#x20B9;{item.price}</p>
                <p className='cursor'>X</p> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GuestList;
