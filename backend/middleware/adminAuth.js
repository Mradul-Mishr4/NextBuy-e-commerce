import jwt from "jsonwebtoken";
const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ message: "Forbidden access" });
    }
    next();
  } catch (error) {
    console.error("Error in adminAuth middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default adminAuth;
