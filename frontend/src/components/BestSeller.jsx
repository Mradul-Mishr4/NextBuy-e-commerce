import React from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    const bestproducts = products.filter((item) => item.bestSeller);
    setBestSellers(bestproducts.slice(0, 10));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Seller"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, cum.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6 ">
        {bestSellers.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
