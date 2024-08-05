import React from 'react'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Routes,Route, useLocation} from 'react-router-dom'
import Login from './pages/Login/Login'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify"
import Profile from './pages/Profile/Profile'
import Sidebar from './components/Sidebar/Sidebar'
import HomePage from './pages/ProfilePages/HomePage'
import CreateEvent from './pages/ProfilePages/CreateEvent'
import Update from './pages/ProfilePages/Update'
import EventDetail from './components/EventDetail/EventDetail'
import Checkout from './components/Checkout'
import VerifyOrder from './components/Verify/VerifyOrder'
import MyTickets from './pages/ProfilePages/MyTickets'
import GuestList from './pages/ProfilePages/GuestList'
import Notification from './pages/ProfilePages/Notification'
const App = () => {
  const location = useLocation()
  // console.log(location.pathname.includes("/dashboard"));
  return (
    <div className='app'>
      {
        location.pathname.includes("/dashboard") ? <Sidebar/> :<></>
      }
      <ToastContainer  className="toast-position"
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard/home' element={<HomePage/>}/>
      <Route path='/dashboard/events' element={<CreateEvent/>}/>
      <Route path='/dashboard/update/:id' element={<Update/>}/>
      <Route path='/event-detail/:id' element={<EventDetail/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/verify' element={<VerifyOrder/>}/>
      <Route path='/dashboard/ticket' element={<MyTickets/>}/>
      <Route path='/dashboard/guest-list/:id' element={<GuestList/>}/>
      <Route path='/dashboard/notification' element={<Notification/>}/>
     </Routes>
      
    </div>
  )
}

export default App
