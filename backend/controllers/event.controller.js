import { Schema } from "mongoose";
import eventModel from "../models/event.model.js";

const createEvent = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const userId = req.body.userId;
  // console.log(userId);
  try {
    const event = await eventModel.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      image: image_filename,
      userId: userId,
      price: req.body.price,
      category: req.body.category,
      isFree: req.body.isFree,
      organizer: req.body.organizer,
    });

    res.json({ success: true, message: "Event Created Successfully", event });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const fetchAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find({}).sort({$natural: -1});
    return res.json({
      success: true,
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const userId = req.body.userId;
    // console.log(userId);
    const events = await eventModel.find({ userId });
    if (!events) {
      return res.json({ success: false, message: "You don't have any events" });
    }
    res.json({
      success: true,
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await eventModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Event Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await eventModel.findById(id);
    res.json({ success: true, message: "Event fetched successfully", event });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const updateEvent = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const id = req.params.id;
  try {
    const event = await eventModel.findByIdAndUpdate(id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.endDateTime,
        image: image_filename,
        price: req.body.price,
        category: req.body.category,
        isFree: req.body.isFree,
        organizer: req.body.organizer,
      },
    });
    res.json({ success: true, message: "Event Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
export {
  createEvent,
  getAllEvents,
  deleteEvent,
  fetchAllEvents,
  updateEvent,
  getSingleEvent,
};
