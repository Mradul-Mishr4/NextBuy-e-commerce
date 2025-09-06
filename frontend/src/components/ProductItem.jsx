import React from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; 

const ProductItem = ({id,image, name ,price}) => {
    const{ currency } = React.useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className='text-gray-700 hover:scale-110 cursor-pointer rounded-xl shadow-md border border-gray-200 transition-shadow hover:shadow-lg '>
      <div className="rounded-xl shadow-md border border-gray-200 transition-shadow hover:shadow-lg bg-white p-2 flex flex-col">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center mb-2">
        <img
          src={image[0]}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="pt-1 pb-1 pl-1 text-sm">{name}</p>
      <p className="text-gray-500 pl-1 font-medium">{currency}{price}</p>
    </div>
    </Link>
  )
}

export default ProductItem