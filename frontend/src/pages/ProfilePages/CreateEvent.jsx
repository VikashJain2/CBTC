import React, { useContext, useEffect, useRef } from "react";
import Button from "../../components/Button";
import upload from "../../assets/upload_area.png";
import "./HomePage.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { eventContext } from "../../context/eventContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateEvent = () => {
  const navigate = useNavigate()
  const { token, url } = useContext(eventContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState(false);
  const [free, setFree] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    category: "",
    organizer: "",
  });
  const fileInputRef = useRef(null);

  const handleFileRef = () => {
    fileInputRef.current.click();
  };

  const handleCheck = () => {
    setFree((prev) => !prev);
  };
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("image", image);
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("organizer", data.organizer);
    formData.append("isFree", free);
    formData.append("startDateTime", startDate);
    formData.append("endDateTime", endDate);

    const response = await axios.post(url + "/api/event/add-event", formData, {
      headers: { token },
    });
    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        title: "",
        description: "",
        location: "",
        price: "",
        category: "",
        organizer: "",
      });
      setImage(false);
      setEndDate(null);
      setStartDate(Date.now());
      navigate("/dashboard/home")
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="CEvent">
      <Button title="Create Event" />

      <form className="create-event-container" onSubmit={handleSubmit}>
        <div className="create-event-inputs">
          <input
            type="text"
            placeholder="Event Name"
            className="create-event-input"
            required
            onChange={onChangeHandler}
            name="title"
            value={data.title}
          />
          <input
            type="text"
            placeholder="Category"
            className="create-event-input"
            required
            onChange={onChangeHandler}
            name="category"
            value={data.category}
          />
        </div>

        <div className="create-event-inputs">
          <textarea
            rows="15"
            placeholder="Description"
            required
            name="description"
            onChange={onChangeHandler}
            value={data.description}
          ></textarea>
          {image ? (
            <div className="upload" onClick={handleFileRef}>
              <img
                src={URL.createObjectURL(image)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt=""
              />
            </div>
          ) : (
            <div className="upload" onClick={handleFileRef}>
              <img
                src={upload}
                style={{
                  width: "58px",
                  height: "58px",
                }}
                alt=""
              />

              <p>Drag photo here</p>
            </div>
          )}
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="location">
          <i className="fa-solid fa-location-dot"></i>{" "}
          <input
            type="text"
            placeholder="Event location or Online"
            style={{
              borderRadius: "10px",
              border: "none",
              outline: "none",
              width: "100%",
            }}
            required
            onChange={onChangeHandler}
            name="location"
            value={data.location}
          />
        </div>

        <div className="date-time">
          <div className="start-date">
            <i className="fa-solid fa-calendar-days"></i>
            <p>Start-date:</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm:aa"
              wrapperClassName="datePicker"
              required
            />
          </div>

          <div className="start-date">
            <i className="fa-solid fa-calendar-days"></i>
            <p>End-date:</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm:aa"
              wrapperClassName="datePicker"
              required
            />
          </div>
        </div>
        <div
          className="create-event-inputs"
          style={{
            width: "100%",
          }}
        >
          <div className="create-event-inputs-price">
            <div
              className="input-price"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <i
                className="fa-solid fa-dollar-sign"
                style={{
                  fontSize: "0.8rem",
                }}
              ></i>
              <input
                type="text"
                placeholder="Price"
                className="create-event-input"
                disabled={free}
                onChange={onChangeHandler}
                name="price"
                value={data.price}
              />
            </div>

            <div
              className="input-checkbox"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <label
                htmlFor="isFree"
                style={{
                  fontSize: "0.8rem",
                }}
              >
                Free Ticktet
              </label>
              <input
                type="checkbox"
                style={{
                  width: "20px",
                  height: "15px",
                }}
                className="create-event-input"
                onChange={handleCheck}
              />
            </div>
          </div>
          <div className="create-event-inputs-name">
            <input
              type="text"
              placeholder="Orgnizer Name"
              className="create-event-input"
              style={{
                width: "100%",
              }}
              required
              onChange={onChangeHandler}
              name="organizer"
              value={data.organizer}
            />
          </div>
        </div>

        <button className="event-btn" type="submit">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
