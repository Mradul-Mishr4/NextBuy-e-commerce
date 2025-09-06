import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";
const Product = () => {
  const { productId } = useParams();
  const { products, currency, cartItems, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = React.useState(false);
  const [image, setImage] = useState(false);
  const [size, setSize] = useState("");

  const fetchProductDetails = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        console.log(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductDetails();
  }, [productId, products]);
  return productData ? (
    <div className="border-t-2 transition-opacity ease-in duration-500 opacity-100">
      {/* //product data  */}
      <div className="flex mt-10  gap-12 flex-col sm:flex-row  ">
        {/* product images */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-auto">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                alt=""
                className={`w-20 h-20 object-cover border rounded cursor-pointer flex-shrink-0 
          ${item === image ? "ring-2 ring-blue-600" : ""}`}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt=""
              className="w-full max-h-[500px] object-contain border rounded"
            />
          </div>
        </div>

        {/* product details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex item-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-3 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.size.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                    item === size ? "border-blue-800 border-2" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p> Cash on delivery on this product</p>
            <p>Easy exachange and return policy </p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm"> Description</b>
          <p className="border px-5 py-3 text-sm ">Review</p>
        </div>
        <div className="flex flex-col border gap-4 px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis,
            facilis.
          </p>
          <p>
            E-commerce Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quo, recusandae? Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Quam autem modi dolores accusamus voluptates voluptatum
            molestias. Quia molestiae ducimus inventore?
          </p>
        </div>
      </div>
      {/* display related products here */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};
export default Product;
