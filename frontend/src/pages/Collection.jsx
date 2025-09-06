import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((item) => item !== value));
    }
  };

  const togglesubCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSubCategory([...subCategory, value]);
    } else {
      setSubCategory(subCategory.filter((item) => item !== value));
    }
  };

  const applyFilterAndSort = () => {
    let productCopy = products.slice();

    // Apply Search Filter
    if (search && showSearch) {
      productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Apply Category Filters
    if (categories.length > 0) {
      productCopy = productCopy.filter((item) => categories.includes(item.category));
    }

    // Apply Subcategory Filters
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory));
    }
    
    // Apply Sorting
    switch (sortType) {
      case 'low-high':
        productCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        productCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        // No sorting for 'relevant'
        break;
    }

    setFilteredProducts(productCopy);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [categories, subCategory, search, showSearch, sortType, products]);

  return ( 
    <div className='container mx-auto px-4 py-8 sm:py-12'>
      <div className='flex flex-col sm:flex-row gap-8 sm:gap-12'>
        
        {/* Filters Sidebar */}
        <div className='w-full sm:w-1/4'>
          <p onClick={() => setShowFilters(!showFilters)} className='text-xl font-bold mb-4 flex items-center justify-between cursor-pointer'>
            FILTERS
            <img 
              src={assets.dropdown_icon} 
              className={`h-4 sm:hidden transform transition-transform ${showFilters ? 'rotate-180' : ''}`} 
              alt="toggle filters"
            />
          </p>
          <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'h-auto opacity-100' : 'h-0 opacity-0 sm:h-auto sm:opacity-100'}`}>
            {/* Categories Filter */}
            <div className='bg-gray-50 p-4 rounded-lg mb-6 shadow-sm border border-gray-200'>
              <p className='mb-4 text-sm font-semibold text-gray-800'>CATEGORIES</p>
              <div className='flex flex-col gap-3 text-sm text-gray-700'>
                <label className='flex items-center gap-3'>
                  <input type="checkbox" className='w-4 h-4 rounded accent-blue-500' value={'Men'} onChange={toggleCategory} />Men
                </label>
                <label className='flex items-center gap-3'>
                  <input type="checkbox" className='w-4 h-4 rounded accent-blue-500' value={'Women'} onChange={toggleCategory} />Women
                </label>
                <label className='flex items-center gap-3'>
                  <input type="checkbox" className='w-4 h-4 rounded accent-blue-500' value={'Kids'} onChange={toggleCategory} />Kids
                </label>
              </div>
            </div>
            
            {/* Subcategories Filter */}
            <div className='bg-gray-50 p-4 rounded-lg mb-6 shadow-sm border border-gray-200'>
              <p className='mb-4 text-sm font-semibold text-gray-800'>TYPES</p>
              <div className='flex flex-col gap-3 text-sm text-gray-700'>
                <label className='flex items-center gap-3'>
                  <input type="checkbox" className='w-4 h-4 rounded accent-blue-500' value={'Topwear'} onChange={togglesubCategory} />Topwear
                </label>
                <label className='flex items-center gap-3'>
                  <input type="checkbox" className='w-4 h-4 rounded accent-blue-500' value={'Bottomwear'} onChange={togglesubCategory} />Bottomwear
                </label>
                <label className='flex items-center gap-3'>
                  <input type="checkbox" className='w-4 h-4 rounded accent-blue-500' value={'Winterwear'} onChange={togglesubCategory} />Winterwear
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className='flex-1'>
          <div className='flex items-center justify-between mb-8'>
            <div className='text-3xl sm:text-4xl font-bold text-gray-800'>
              <Title text1={'All'} text2={'Collections'} />
            </div>
            {/* Product Sort Dropdown */}
            <select 
              onChange={(e) => setSortType(e.target.value)} 
              value={sortType}
              className='border border-gray-300 text-sm px-4 py-2 rounded-lg ml-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Price: Low to High</option> 
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
          
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 sm:gap-6'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <ProductItem 
                  key={index} 
                  id={item._id} 
                  image={item.image} 
                  name={item.name} 
                  price={item.price} 
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10">No products found matching your criteria.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;