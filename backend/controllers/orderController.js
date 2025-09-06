import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
//global delivery charge
const deliveryCharge = 20;
const currency = "USD";
// Gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Validate Stripe configuration
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is not configured");
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      date: Date.now(),
      paymentMethod: "COD",
      payment: false,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} }); // Clear the cart after placing the order
    res.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const placeOrderStripe = async (req, res) => {
  console.log("=== Starting placeOrderStripe function ===");
  console.log("Request body:", req.body);
  console.log("Request headers origin:", req.headers.origin);

  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    console.log("Extracted data:", { userId, items, amount, address, origin });

    // Validate required fields
    if (!userId || !items || !amount || !address) {
      console.log("Missing required fields:", {
        userId: !!userId,
        items: !!items,
        amount: !!amount,
        address: !!address,
      });
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Stripe secret key not configured");
      return res.status(500).json({
        success: false,
        message: "Payment gateway not configured",
      });
    }

    console.log("Creating order data...");
    const orderData = {
      userId,
      items,
      amount,
      address,
      date: Date.now(),
      paymentMethod: "Stripe",
      payment: false,
    };

    console.log("Saving order to database...");
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    console.log("Order saved with ID:", newOrder._id);

    console.log("Creating line items for Stripe...");
    // Create line items for Stripe
    const lineItems = items.map((item) => {
      console.log("Processing item:", item);
      return {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    console.log("Line items created:", lineItems);

    // Add delivery charges
    console.log("Adding delivery charges...");
    lineItems.push({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100, // Convert to cents
      },
      quantity: 1,
    });

    console.log("Final line items:", lineItems);

    console.log("Creating Stripe checkout session...");
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      metadata: {
        orderId: newOrder._id.toString(),
      },
    });

    console.log("Stripe session created successfully:", session.id);

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error in placeOrderStripe:", error);
    console.error("Error stack:", error.stack);

    res.status(500).json({
      success: false,
      message: "Failed to create Stripe session",
      error: error.message,
    });
  }
};

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      date: Date.now(),
      paymentMethod: "Razorpay",
      payment: false,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error in placeOrderRazorpay:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};
// fet all order for admin panel to change status and handling orders
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error in allOrders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error in userOrders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    console.error("Error in updateStatus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, sessionId, userId } = req.body;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment verified" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error in verifyStripe:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { orderId, razorpay_payment_id } = req.body;

    if (razorpay_payment_id) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
      res.json({ success: true, message: "Payment verified" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error in verifyRazorpay:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyStripe,
  verifyRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
