import React from "react";
import { useEffect } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Orders = ({ token }) => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [updatingOrder, setUpdatingOrder] = React.useState(null);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/order/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      console.log(response);
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error("Failed to fetch orders. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId);
      const response = await fetch(`${backendUrl}/api/order/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ orderId, status }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Order status updated successfully!");
        fetchOrders(); // Refresh the orders list
      } else {
        toast.error("Failed to update order status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating order status.");
    } finally {
      setUpdatingOrder(null);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []); // Remove orders from dependency to prevent infinite loop
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Orders</h1>

      {loading ? (
        <div className="text-center py-8">
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="border p-4 mb-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order._id}</h3>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment: {order.paymentMethod} -{" "}
                    {order.payment ? "Paid" : "Pending"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: <span className="font-medium">{order.status}</span>
                  </p>
                </div>
                <div className="text-lg font-bold">₹{order.amount}</div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Items:</h4>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 py-2 border-b last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} | Quantity: {item.quantity} | Price: ₹
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="bg-gray-50 p-3 rounded flex-1 mr-4">
                  <h4 className="font-medium mb-2">Delivery Address:</h4>
                  <p className="text-sm">
                    {order.address.fullName}
                    <br />
                    {order.address.address}
                    <br />
                    {order.address.city}, {order.address.state}{" "}
                    {order.address.zipCode}
                    <br />
                    {order.address.country}
                    <br />
                    Phone: {order.address.phoneNumber}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Update Status:
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    disabled={updatingOrder === order._id}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  {updatingOrder === order._id && (
                    <p className="text-xs text-blue-600 mt-1">Updating...</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
