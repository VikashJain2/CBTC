import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
    default: Date.now(),
  },
  endDateTime: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  organizer:{
    type: String,
    required: true
  }
},{timestamps: true});

const eventModel = mongoose.model("event", eventSchema);
export default eventModel;
