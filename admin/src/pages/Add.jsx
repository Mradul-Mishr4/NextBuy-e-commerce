import React from "react";
import { assets } from "../assets/assets.js";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
// few problems in this code , afte uploading images and its description page isn't get load for new fillings
// next either you true or false for bestsellers it aloways flase in database
// the tags of size it by default empty it should take small value as default
// i try to solve above problems few of them are solved it feels laggy.
const Add = ({ token }) => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  // const [image3, setImage3] = useState("");
  // const [image4, setImage4] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [size, setSize] = useState(["S"]); // Default to Small size

  // Function to handle size selection
  const handleSizeClick = (sizeValue) => {
    setSize((prev) =>
      prev.includes(sizeValue)
        ? prev.filter((item) => item !== sizeValue)
        : [...prev, sizeValue]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestSeller", bestSeller);
    formData.append("size", JSON.stringify(size)); // Send array as JSON string

    // Append images
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    // if (image3) formData.append("image3", image3);
    // if (image4) formData.append("image4", image4);

    try {
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      console.log(response.data);
      // Reset form fields after submission
      if (response.data) {
        setImage1(false);
        setImage2(false);
        setDescription("");
        setName("");
        setPrice("");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      // Replace with your actual API endpoint
    } catch (error) {
      // Handle network or other errors
      alert("An error occurred. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start w-full gap-3"
    >
      <div className="mb-2">
        <p className="">Upload Image</p>
        <div className="flex gap-2 ">
          <label htmlFor="image1">
            <img
              className="w-50"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              placeholder="image"
              id="image1"
              hidden
            ></input>
          </label>
          <label htmlFor="image2">
            <img
              className="w-50"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              placeholder="image"
              id="image2"
              hidden
            ></input>
          </label>
        </div>
      </div>
      <div className="w-full ">
        <p className="mb-4">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500] px-3 py-2"
          type="text"
          placeholder="Type Here... "
        />
        <p className="mb-4">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className="w-full max-w-[500] px-3 py-2"
          placeholder="Write Context Here ... "
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Sub Category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            value={price}
            placeholder="25"
          />
        </div>
        <div className=" flex gap-3 ">
          <p className="mb-2">Product Size:</p>
          <div
            onClick={() => handleSizeClick("S")}
            className={`${
              size.includes("S") ? "bg-amber-200" : "bg-slate-200"
            } px-3 py-1 cursor-pointer `}
          >
            <p>S</p>
          </div>
          <div
            onClick={() => handleSizeClick("M")}
            className={`${
              size.includes("M") ? "bg-amber-200" : "bg-slate-200"
            } px-3 py-1 cursor-pointer`}
          >
            <p>M</p>
          </div>
          <div
            onClick={() => handleSizeClick("L")}
            className={`${
              size.includes("L") ? "bg-amber-200" : "bg-slate-200"
            } px-3 py-1 cursor-pointer`}
          >
            <p>L</p>
          </div>
          <div
            onClick={() => handleSizeClick("XL")}
            className={`${
              size.includes("XL") ? "bg-amber-200" : "bg-slate-200"
            } px-3 py-1 cursor-pointer`}
          >
            <p>XL</p>
          </div>
          <div
            onClick={() => handleSizeClick("XXL")}
            className={`${
              size.includes("XXL") ? "bg-amber-200" : "bg-slate-200"
            } px-3 py-1 cursor-pointer`}
          >
            <p>XXL</p>
          </div>
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
        />
        <label className="cursor-pointer" htmlFor="bestSeller">
          ADD TO BESTSELLER{" "}
        </label>
      </div>
      <button type="submit" className="border">
        submit
      </button>
    </form>
  );
};

export default Add;
