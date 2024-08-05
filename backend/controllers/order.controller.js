import eventModel from "../models/event.model.js";
import ticketModel from "../models/order.model.js";
import Stripe from "stripe";
import userModel from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5173";
  const userId = req.body.userId;

  const ticketNumber = Math.floor(Math.random() * 99999);
  try {
    const price = req.body.isFree ? 0 : Number(req.body.price) * 100;
    const order = await ticketModel.create({
      userId: userId,
      eventId: req.body.eventId,
      ticketNumber: ticketNumber,
      eventTitle: req.body.eventTitle,
      eventImage: req.body.eventImage,
      eventStartDate: req.body.eventStartDate,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: req.body.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${order._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await ticketModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await ticketModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const fetchTicket = async (req, res) => {
  const userId = req.body.userId;
  try {
    const ticket = await ticketModel.find({ userId });
    res.json({ success: true, ticket });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const fetchGuestList = async (req, res) => {
  try {
    let userId = [];
    let ticketNumber = [];
    const eventId = req.params.id;
    const userTicket = await ticketModel.find({ eventId });

    userTicket.map((item) => {
      userId.push(item.userId);

      ticketNumber.push(item.ticketNumber);
    });
    let user = await userModel
      .find({
        _id: {
          $in: userId,
        },
      })
      .select("-password");

    const userArray = Array.from(Object.values(user));
    userArray.push(ticketNumber);
    res.json({ success: true, data: { userArray, ticketNumber } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
const deleteTicket = async (req, res) => {
  try {
    const ticket = await ticketModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Ticket Cancelled Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
export { placeOrder, verifyOrder, fetchTicket, fetchGuestList, deleteTicket };
