import React, { useEffect } from "react";
import { useContext } from "react";
// import { useContext } from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
const RelatedProduct = ({ category, subCategory }) => {
  const { products } = React.useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = React.useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category == item.category);
      productsCopy = productsCopy.filter(
        (item) => item.subCategory === subCategory
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2 mt-10">
        <Title text1={"Related"} text2={"Products"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-5">
        {relatedProducts.map((item, index) => (
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

export default RelatedProduct;
