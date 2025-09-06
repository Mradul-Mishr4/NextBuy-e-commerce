import React, { useContext, useEffect } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const { products, backendUrl, token, currency, setCartItems } =
    useContext(ShopContext);
  const [ordersData, setOrdersData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const verifyStripePayment = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const success = urlParams.get("success");
      const sessionId = urlParams.get("session_id");
      const orderId = urlParams.get("orderId");

      if (success && sessionId && orderId) {
        const response = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          { orderId, success, sessionId },
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems({});
          toast.success("Payment successful!");
        } else {
          toast.error("Payment verification failed");
        }

        // Clean up URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error("Payment verification failed");
    }
  };

  const loadOrderData = async () => {
    try {
      if (!token) {
        return;
      }
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/order/userOrders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      const data = await response.json();

      if (data.success) {
        let allOrderData = [];
        data.orders.map((order) => {
          order.items.map((item) => {
            const product = products.find((p) => p._id === item._id);
            if (product) {
              allOrderData.push({
                ...item,
                ...product,
                orderId: order._id,
                orderDate: new Date(order.date).toLocaleDateString(),
                status: order.status,
                paymentMethod: order.paymentMethod,
                payment: order.payment,
              });
            }
          });
        });
        setOrdersData(allOrderData);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && products.length > 0) {
      verifyStripePayment();
      loadOrderData();
    }
  }, [token, products]);

  // Assuming a 'size' and 'quantity' property are added to each product object
  // for the purpose of this example.
  // const sampleOrders = products.slice(0, 3).map((product) => ({
  //   ...product,
  //   size: "M", // Example size
  //   quantity: 2, // Example quantity
  //   orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
  //   orderDate: "Aug 9, 2025",
  //   status: "Shipped",
  // }));

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      {/* Page Title */}

      <div className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
        <Title text1="Your" text2={"Orders"} />
      </div>

      {/* Orders List */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        {loading ? (
          <p className="text-center text-gray-500 text-lg py-8">
            Loading orders...
          </p>
        ) : ordersData.length > 0 ? (
          ordersData.map((order, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-center py-6 border-b last:border-b-0"
            >
              {/* Product Details */}
              <div className="flex items-center gap-6 w-full sm:w-auto mb-4 sm:mb-0">
                <img
                  src={order.image[0]}
                  alt={order.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {order.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Size:{" "}
                    <span className="font-medium">
                      {Array.isArray(order.size)
                        ? order.size.join(", ") // if array
                        : order.size
                            .replace(/X+/g, "X") // fix weird "XXX"
                            .replace(/,/g, ", ") // ensure spacing
                            .trim()
                            .toUpperCase()}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantity:{" "}
                    <span className="font-medium">{order.quantity}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Order ID:{" "}
                    <span className="font-medium">{order.orderId}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Order Date:{" "}
                    <span className="font-medium">{order.orderDate}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment:{" "}
                    <span className="font-medium">{order.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Status and Price */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 w-full sm:w-auto justify-between sm:justify-start">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className="inline-block bg-green-100 text-green-700 font-semibold text-xs px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Total</p>
                  <span className="text-lg sm:text-xl font-semibold text-gray-800">
                    {currency}
                    {(order.price * order.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Action Button */}
                <button
                  onClick={loadOrderData}
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg py-8">
            {token
              ? "You have no past orders."
              : "Please login to view your orders."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Order;
