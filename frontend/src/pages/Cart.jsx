import React, { useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    cartItems,
    currency,
    products,
    delivery_fee,
    updateQuantity,
    navigate,
  } = React.useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // No need for a separate productData state since we can find it on the fly
  useEffect(() => {
    const tempdata = [];
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          tempdata.push({
            _id: item,
            size: size,
            quantity: cartItems[item][size],
          });
        }
      }
    }
    setCartData(tempdata);
  }, [cartItems, products]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Title */}
      <div className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        <Title text1="Your" text2={"Cart"} />
      </div>

      {/* Cart Items Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            if (!productData) return null; // Handle case where product data is not found

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between py-6 border-b last:border-b-0"
              >
                <div className="flex items-center gap-6 w-full sm:w-auto mb-4 sm:mb-0">
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {productData.name}
                    </h2>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <div className="flex items-center mt-2">
                      <p className="text-sm text-gray-500 mr-2">Quantity:</p>
                      <input
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value > 0) {
                            updateQuantity(item._id, item.size, value);
                          }
                        }}
                        className="cursor-pointer border max-w-[50px] text-center rounded py-1 px-2"
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:gap-12 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="text-lg sm:text-xl font-semibold text-gray-800">
                    {currency}
                    {(productData.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    aria-label="Remove item"
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Remove"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Cart Totals and Checkout */}
      <div className="flex justify-end my-12">
        <div className="w-full sm:w-[400px] flex flex-col items-end">
          <CartTotal />
          <button
            onClick={() => navigate("/placeorder")}
            className="w-full sm:w-auto bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 my-8 px-8 py-4 text-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
