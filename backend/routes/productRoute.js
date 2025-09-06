import express from "express";
import {
  addProduct,
  listProducts,
  singleProduct,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

//using one particular router you can create multiple routes:
const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list", listProducts);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);

export default productRouter;
