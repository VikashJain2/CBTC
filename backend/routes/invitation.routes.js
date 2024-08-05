import express from 'express'
import authMiddleware from "../middleware/auth.middleware.js"
import { fetchNotification, removeNotification, sendNotification } from '../controllers/invitation.controller.js'
const invitationRouter = express.Router()

invitationRouter.post("/invitation", authMiddleware,sendNotification)
invitationRouter.post("/get",authMiddleware,fetchNotification)
invitationRouter.post("/remove",removeNotification)
export default invitationRouter