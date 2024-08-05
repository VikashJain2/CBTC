import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    eventId:{
        type: String,
        required: true
    },
    eventImage: {
        type: String,
        required: true,
    },
    ticketNumber: {
        type: Number,
        required: true
    },
    payment:{
        type: Boolean,
        default: false
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventStartDate:{
        type: Date,
        required: true,
    },


})

const ticketModel = mongoose.model("ticket",ticketSchema)
export default ticketModel