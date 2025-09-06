import React, { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        {
          success,
          orderId,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/order");
        toast.success("Payment verified successfully!");
      } else {
        navigate("/cart");
        toast.error("Payment verification failed!");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      navigate("/cart");
      toast.error("Payment verification failed!");
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    } else {
      navigate("/cart");
    }
  }, [success, orderId, token]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Verifying payment...</p>
      </div>
    </div>
  );
};

export default Verify;
