import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { eventContext } from "../../context/eventContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const {url,token,setToken,email,setEmail} = useContext(eventContext)
  const [currState, SetCurrState] = useState("Sign Up");
 
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setData((data)=>({...data,[name]:value}))
  }

  const handleLogin = async(e)=>{
    e.preventDefault();
    let newUrl = url

    if(currState==="Login"){
      newUrl+="/api/user/login"
    }else{
      newUrl+="/api/user/register"
    }

    const response = await axios.post(newUrl,data)
    if(response.data.success){
      toast.success(response.data.message)
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("email",response.data.user.email)
      setEmail(response.data.user.email)
      console.log(response.data.user.email);
      navigate("/")
    }
    else{
      toast.error(response.data.message)
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  },[])
  return (
    <div className="login">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-card-header">
          <i className="fa-solid fa-arrow-left" onClick={() => navigate("/")}></i>{" "}
          <h2>{currState}</h2>
        </div>

        <div className="login-fields">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Enter Name" name="name" value={data.name} required  onChange={onChangeHandler}/>
          )}

          <input type="email" placeholder="Enter Email" name="email" value={data.email} required onChange={onChangeHandler}/>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={data.password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="login-btn">
          <button type="submit">
            {currState === "Login" ? "Login" : "Create Account"}
          </button>
        </div>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p className="login-here">
            Create a new account?{" "}
            <span onClick={() => SetCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="login-here">
            Already have an account?{" "}
            <span onClick={() => SetCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
