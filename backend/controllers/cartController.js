import userModel from "../models/userModel.js";
//add product to  user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    if (!userId || !itemId || !size) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Logic to add item to cart
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Increment quantity if item already in cart
      } else {
        cartData[itemId][size] = 1; // Add item with quantity 1
      }
    } else {
      cartData[itemId] = { [size]: 1 }; // Add new item with size and quantity 1
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({
      success: true,
      message: "Item added to cart successfully",
      cartData,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update user cart
const updateCart = async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;
  if (!userId || !itemId || !size || quantity === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity; // Update the quantity for the specified item and size
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({
      success: true,
      message: "Item updated into cart successfully",
      cartData,
    });
  } catch (error) {
    console.error("Error in updateCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({
      success: true,
      message: "User cart data fetched successfully",
      cartData,
    });
  } catch (error) {
    console.error("error in getUserCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//
export { addToCart, updateCart, getUserCart };
