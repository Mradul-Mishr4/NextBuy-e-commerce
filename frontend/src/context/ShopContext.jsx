import { createContext } from "react";
// import { products } from "../assets/frontend_assets/assets";
import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const ShopContext = createContext();
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const ShopContextProvider = (props) => {
  // const backendUrl = "http://localhost:3000";
  // const backendUrl = "https://ecommerce-app-backend.onrender.com";
  const currency = "₹";
  const delivery_fee = 10;
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");

  // Handle token persistence
  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
    }
  }, [token]);
  const [search, setSearch] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(true);
  const [cartItems, setCartItems] = React.useState({});
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light"); // Default theme
  const [products, setProducts] = useState([]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Add the theme class to the document body
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  // const addToCart = (itemId, size) => {
  //     setCartItems((prev) => {
  //         const newCart = { ...prev };
  //         if (newCart[itemId][size]) {
  //             newCart[itemId] += 1; // Increment quantity if item already in cart
  //         } else {
  //             newCart[itemId] = 1; // Add item with quantity 1
  //         }
  //         console.log(newCart);
  //         return newCart;
  //     });
  // };
  const getProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to fetch products. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("An error occurred while fetching products.");
    }
  };
  useEffect(() => {
    getProducts();
  }, []); // Remove products from dependency to prevent infinite loop
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Increment quantity if item already in cart
      } else {
        cartData[itemId][size] = 1; // Add item with quantity 1
      }
    } else {
      cartData[itemId] = { [size]: 1 }; // Add new item with size and quantity 1
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        toast.success("Item added to cart!");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart. Please try again.");
      }
    } else {
      toast.success("Item added to cart!");
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalCount += cartItems[item][size];
          }
        } catch (error) {
          console.error("Error calculating cart count:", error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    if (cartItems[itemId] && cartItems[itemId][size]) {
      if (quantity <= 0) {
        delete cartItems[itemId][size];
        if (Object.keys(cartItems[itemId]).length === 0) {
          delete cartItems[itemId];
        }
      } else {
        cartItems[itemId][size] = quantity;
      }
      setCartItems({ ...cartItems });
    }
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        const productData = products.find((product) => product._id === item);
        try {
          if (productData && cartItems[item][size] > 0) {
            totalAmount += productData.price * cartItems[item][size];
          }
        } catch (error) {
          console.error("Error calculating cart amount:", error);
        }
      }
    }
    return totalAmount;
  };
  const getCartItems = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items. Please try again.");
    }
  };

  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        toast.success("Order placed successfully!");
        return { success: true };
      } else {
        toast.error("Failed to place order. Please try again.");
        return { success: false };
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
      return { success: false };
    }
  };

  useEffect(() => {
    if (token) {
      getCartItems(token);
    }
  }, [token]); // Only run when token changes
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    navigate,
    getCartAmount,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    updateQuantity,
    addToCart,
    getCartCount,
    theme,
    toggleTheme,
    backendUrl,
    token,
    setToken,
    getProducts,
    getCartItems,
    placeOrder,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
