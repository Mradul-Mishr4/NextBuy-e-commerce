import React, { useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { currency } from "../App.jsx";
const List = ({ token }) => {
  const [list, setList] = React.useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });
      console.log(response.data);
      // Handle the response data as needed
      if (response.data.success) {
        // Process the list of products
        setList(response.data.products);
      } else {
        toast.error("Failed to fetch products. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error appropriately
    }
  };
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product deleted successfully.");
        await fetchProducts(); // Refresh the product list after deletion
      } else {
        toast.error("Failed to delete product. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product.");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <p className="mb-5 text-2xl ">All Products Lists</p>
      <div className="flex flex-col gap-2">
        <div className="hidden  md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] text-center text-sm font-semibold text-gray-500 border-b-2 border-gray-200">
          <b>Image</b>
          <b>Description</b>
          <b>Price</b>
          <b>Name</b>
          <b>Action</b>
        </div>
        {list.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] text-center text-sm font-semibold text-gray-500 border-b border-gray-200"
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-16 h-16 object-cover"
            />
            <span>{product.description}</span>
            <span>
              {currency}
              {product.price}
            </span>
            <span>{product.name}</span>
            <span>
              <button
                onClick={() => removeProduct(product._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
