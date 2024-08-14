import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const eventContext = createContext(null);

const EventContextProvider = (props) => {
  const url = "http://localhost:3131";
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [notification,setNotification] = useState([])
  const [loading,setLoading] = useState(false)
  const fetchEvents = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/event/get-events",
        {},
        { headers: { token } }
      );

      // console.log(response.data.message);
      setEvents(response.data.data);
      //   console.log(events);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllEvents = async () => {
    setLoading(true)
    try {
      
      const response = await axios.get(url + "/api/event/events", {});
      if (response.data.success) {
        setLoading(false)
        setAllEvents(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
    
  };

  const fetchTickets = async (token) => {
    const response = await axios.post(
      url + "/api/order/user-tickets",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setMyTickets(response.data.ticket);
    } else {
      toast.error(response.data.message);
    }
  };
  const fetchNotification = async(token)=>{
    const response = await axios.post(url+"/api/notification/get",{},{headers:{token}})
    if(response.data.success){
        setNotification(response.data.data)
    }
    else{
        toast.error(response.data.message)
    }
}
  useEffect(() => {
    async function loadData() {
      // console.log(events);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        setEmail(localStorage.getItem("email"));
        await fetchEvents(localStorage.getItem("token"));
        await fetchTickets(localStorage.getItem("token"));
        await fetchNotification(localStorage.getItem("token"))
        //    console.log(events);
      }
    }
    loadData();
  }, [token]);
  const contextvalue = {
    url,
    token,
    setToken,
    email,
    setEmail,
    events,
    setEvents,
    fetchEvents,
    fetchAllEvents,
    allEvents,
    setAllEvents,
    myTickets,
    setMyTickets,
    notification,
    setNotification,
    loading,
    setLoading
  };

  return (
    <eventContext.Provider value={contextvalue}>
      {props.children}
    </eventContext.Provider>
  );
};

export default EventContextProvider;
