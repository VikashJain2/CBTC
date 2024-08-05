import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { deleteTicket, fetchGuestList, fetchTicket, placeOrder, verifyOrder } from '../controllers/order.controller.js'

const orderRouter = express.Router()

orderRouter.post("/place-order",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/user-tickets",authMiddleware,fetchTicket)
orderRouter.post("/list/:id",fetchGuestList)
orderRouter.post("/remove",deleteTicket)
export default orderRouter