import express from "express";
import {
  userOrders,
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  verifyStripe,
  verifyRazorpay,
  updateStatus,
} from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
const orderRouter = express.Router();

//Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

//verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

//User features
orderRouter.post("/userOrders", authUser, userOrders);

export default orderRouter;
