import React, { useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    cartItems,
    products,
    getCartAmount,
    delivery_fee,
    placeOrder,
    token,
    setCartItems,
    backendUrl,
  } = useContext(ShopContext);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = React.useState("cod");

  const eventHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    // Prepare order data
    const orderItems = [];
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          const productInfo = products.find((product) => product._id === item);
          if (productInfo) {
            orderItems.push({
              _id: item,
              name: productInfo.name,
              price: productInfo.price,
              quantity: cartItems[item][size],
              size: size,
            });
          }
        }
      }
    }

    const orderData = {
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
      address: formData,
      paymentMethod,
    };

    switch (paymentMethod) {
      case "stripe":
        try {
          const response = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
          } else {
            toast.error("Failed to create Stripe session. Please try again.");
          }
        } catch (error) {
          console.error("Stripe payment error:", error);
          toast.error("Failed to process Stripe payment. Please try again.");
        }
        break;

      case "razorpay":
        try {
          const response = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            const { order, orderId } = response.data;
            const options = {
              key: import.meta.env.VITE_RAZORPAY_KEY_ID,
              amount: order.amount,
              currency: order.currency,
              name: "Forever",
              description: "Order Payment",
              order_id: order.id,
              receipt: order.receipt,
              handler: async function (response) {
                try {
                  const verifyResponse = await axios.post(
                    `${backendUrl}/api/order/verifyRazorpay`,
                    {
                      orderId,
                      razorpay_payment_id: response.razorpay_payment_id,
                    },
                    { headers: { token } }
                  );
                  if (verifyResponse.data.success) {
                    setCartItems({});
                    navigate("/order");
                  } else {
                    toast.error("Payment verification failed");
                  }
                } catch (error) {
                  console.error("Payment verification error:", error);
                  toast.error("Payment verification failed");
                }
              },
              prefill: {
                name: formData.fullName,
                email: formData.email,
                contact: formData.phoneNumber,
              },
              theme: {
                color: "#3399cc",
              },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            toast.error(
              "Failed to initiate Razorpay payment. Please try again."
            );
          }
        } catch (error) {
          console.error("Razorpay payment error:", error);
          toast.error("Failed to process Razorpay payment. Please try again.");
        }
        break;

      case "cod":
      default:
        const result = await placeOrder(orderData);
        if (result.success) {
          navigate("/order");
        }
        break;
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        {/* Delivery Information Section */}
        <div className="flex-1">
          <div className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
            <Title text1="Delivery" text2={"Information"} />
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <form
              onSubmit={onSubmitHandler}
              className="w-full flex flex-col gap-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex flex-col flex-1">
                  <span className="font-medium text-gray-700 mb-1">
                    Full Name
                  </span>
                  <input
                    type="text"
                    onChange={eventHandler}
                    value={formData.fullName}
                    name="fullName"
                    placeholder="Enter your full name"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <span className="font-medium text-gray-700 mb-1">Email</span>
                  <input
                    type="email"
                    onChange={eventHandler}
                    value={formData.email}
                    name="email"
                    placeholder="Enter your email"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </label>
              </div>

              <label className="flex flex-col">
                <span className="font-medium text-gray-700 mb-1">Address</span>
                <input
                  type="text"
                  onChange={eventHandler}
                  value={formData.address}
                  name="address"
                  placeholder="Enter your address"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  required
                />
              </label>

              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex flex-col flex-1">
                  <span className="font-medium text-gray-700 mb-1">City</span>
                  <input
                    type="text"
                    onChange={eventHandler}
                    value={formData.city}
                    name="city"
                    placeholder="Enter your city"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <span className="font-medium text-gray-700 mb-1">State</span>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    onChange={eventHandler}
                    value={formData.state}
                    name="state"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex flex-col flex-1">
                  <span className="font-medium text-gray-700 mb-1">
                    Zip Code
                  </span>
                  <input
                    type="text"
                    onChange={eventHandler}
                    value={formData.zipCode}
                    name="zipCode"
                    placeholder="Enter your zip code"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <span className="font-medium text-gray-700 mb-1">
                    Country
                  </span>
                  <input
                    type="text"
                    onChange={eventHandler}
                    value={formData.country}
                    name="country"
                    placeholder="Enter your country"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </label>
              </div>

              <label className="flex flex-col">
                <span className="font-medium text-gray-700 mb-1">
                  Phone Number
                </span>
                <input
                  type="tel"
                  onChange={eventHandler}
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  required
                />
              </label>

              {/* Final submission button */}
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Confirm and Pay
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary & Payment Section */}
        <div className="flex-1 lg:w-1/2">
          <div className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
            <Title text1="Order" text2={"Summary"} />
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <CartTotal />

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Payment Method
              </h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-500 w-4 h-4"
                  />
                  <span className="font-medium text-gray-700">
                    Stripe (Credit Card)
                  </span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-500 w-4 h-4"
                  />
                  <span className="font-medium text-gray-700">
                    Razorpay (UPI, Netbanking)
                  </span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50">
                  <input
                    type="radio"
                    defaultChecked
                    name="payment"
                    value="cod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-500 w-4 h-4"
                  />
                  <span className="font-medium text-gray-700">
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
