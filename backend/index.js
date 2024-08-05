import "dotenv/config"

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";
import orderRouter from "./routes/order.routes.js";
import invitationRouter from "./routes/invitation.routes.js";
const app = express();


app.use(cors());
app.use(express.json());
connectDB()

app.use("/api/user",userRouter)
app.use("/api/event",eventRouter)
app.use("/api/order",orderRouter)
app.use("/api/notification",invitationRouter)
app.use("/images",express.static("uploads"))
app.listen(process.env.PORT, () => {
  console.log(`Server listing on http://localhost:${process.env.PORT}`);
});
