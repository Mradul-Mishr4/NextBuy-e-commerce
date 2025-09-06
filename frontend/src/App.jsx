import Navbar from "./components/Navbar";
import React from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import Verify from "./pages/Verify";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Order from "./pages/Order";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
