import { v2 as connectCloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
// import connectCloudinary from "../config/cloudinary.js";
//funtion for addind product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      size,
      subCategory,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];

    const images = [image1, image2].filter((item) => item !== undefined);
    let imagesUrls = await Promise.all(
      images.map(async (item) => {
        let result = await connectCloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    //adding product-data to database
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      size: JSON.parse(size), // Assuming sizes is a JSON string bcz u cannot send array directly from frontend
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      image: imagesUrls,
      date: Date.now(),
    };
    // Here you would typically save productData to your database
    // For example:
    console.log("Product data to be saved:", productData);
    const product = new productModel(productData);
    await product.save();
    res.status(201).json({
      message: "Product added successfully",
      product: product,
    });
    // console.log(
    //   name,
    //   description,
    //   price,
    //   category,
    //   size,
    //   subCategory,
    //   bestSeller
    // );
    // console.log(imagesUrls);

    // res.status(200).json({
    //   message: "Product added successfully",
    // });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// function for listing products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// function for removing products
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//fuction for get the information of single products
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
