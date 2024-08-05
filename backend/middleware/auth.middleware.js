import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
    // console.log(token);
  if (!token) {
    return res.json({ success: false, message: "User not authenicated" });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodeToken.id);
    req.body.userId = decodeToken.id;
    // console.log(req.body.userId);
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

export default authMiddleware;
