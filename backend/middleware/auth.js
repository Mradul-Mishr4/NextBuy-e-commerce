import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({
      success: false,
      message: "authentication token is required",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error("error in authorization middleware", error);
    return res.json({
      success: false,
      message: "Invalid token",
    });
  }
};
export default authUser;
