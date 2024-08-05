import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.json({
        success: false,
        message: "User with this email already exist!",
      });
    }
    const user = await userModel.create({
      name,
      email,
      password,
    });
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        email: user.email,
      },
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const varifyPassword = await bcrypt.compare(password, user.password);
    if (!varifyPassword) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = createToken(user._id);
    const userData = await userModel.find({ email }).select("-password -name");

    let userObj = Object.assign({}, userData);
    const ue = userObj["0"].email;

    res.json({
      success: true,
      token,
      user: {
        email: ue,
      },
      message: "User logged In Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
export { registerUser, loginUser, fetchAllUsers };
