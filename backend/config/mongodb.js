import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
  } catch (err) {
    console.error("MongoDB connection error (catch):", err);
  }
};

export default connectDB;
