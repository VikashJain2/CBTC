import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth.middleware.js";
import { createEvent, deleteEvent, fetchAllEvents, getAllEvents, getSingleEvent, updateEvent } from "../controllers/event.controller.js";
const eventRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({storage:storage})

eventRouter.post("/add-event",upload.single("image"),authMiddleware,createEvent)
eventRouter.post("/get-events",authMiddleware,getAllEvents)
eventRouter.post("/delete",deleteEvent)
eventRouter.get("/events",fetchAllEvents)
eventRouter.get("/single-event/:id",getSingleEvent)
eventRouter.post("/update/:id",upload.single("image"),updateEvent)
export default eventRouter