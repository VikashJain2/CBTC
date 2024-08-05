import mongoose from "mongoose";

const invitataionSchema = new mongoose.Schema({
  fromUser: {
    type: String,
    required: true,
  },
  fromUserName: {
    type: String,
    required: true,
  },
  fromUserEmail: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  toUser: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isInvitation: {
    type: Boolean,
    default: false,
  },
  type:{
    type: String,
  },
  organizer:{
    type:String,
  }
},{timestamps:true});

const invitationModel = mongoose.model("invitation", invitataionSchema);
export default invitationModel;
