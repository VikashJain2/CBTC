import invitationModel from "../models/invitation.model.js";
import userModel from "../models/user.model.js";

const sendNotification = async (req, res) => {
  const fromUser = req.body.userId;
  let message;
  try {
    // const exist = await invitationModel.findById(req.body.toUser)
    // if(exist){
    //     return res.json({success:false, message:"Notification Already Sent"})
    // }
    const userInfo = await userModel.findById(fromUser).select("-password");
    // console.log(userInfo);
    if (req.body.type == "invite") {
      message = `Dear ${req.body.username},You have an invitation to join ${req.body.eventName} by ${req.body.organizer}`;
    }
    if (req.body.type == "accept") {
      message = `Dear ${req.body.username}, Your invitation to join ${req.body.eventName} by ${req.body.organizer} has been accepted by ${userInfo.name}`;
    }
    if (req.body.type == "reject") {
      message = `Dear ${req.body.username}, Your invitation to join ${req.body.eventName} by ${req.body.organizer} has been rejected by ${userInfo.name}`;
    }
    const notification = await invitationModel.create({
      fromUser: fromUser,
      fromUserName: userInfo.name,
      fromUserEmail: userInfo.email,
      eventId: req.body.eventId,
      toUser: req.body.toUser,
      username: req.body.username,
      eventName: req.body.eventName,
      userEmail: req.body.userEmail,
      message: message,
      isInvitation: req.body.isInvitation,
      type: req.body.type,
      organizer: req.body.organizer,
    });
    res.json({ success: true, message: "Invitation send successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
const fetchNotification = async (req, res) => {
  const userId = req.body.userId;

  try {
    const notification = await invitationModel.find({ toUser: userId }).sort({$natural:-1});

    res.json({
      success: true,
      message: "Notification fetched successfully",
      data: notification,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
const removeNotification = async (req, res) => {
  const id = req.body.id;
  try {
    const notification = await invitationModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Notification Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
export { sendNotification, fetchNotification, removeNotification };
