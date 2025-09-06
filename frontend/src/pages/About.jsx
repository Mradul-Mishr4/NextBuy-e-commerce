import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      
      {/* About Us Section */}
      <div className="text-center">
        <div className="text-4xl sm:text-5xl font-bold mb-4">
          <Title text1="About" text2="Us" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-12 mt-12">
        <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-300">
          <img 
            src={assets.about_img} 
            alt="Our team working" 
            className="w-full h-auto object-cover" 
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            We are a passionate team dedicated to delivering high-quality products that you'll love.
            Our journey began with a simple idea: to create a seamless shopping experience
            that combines modern design with timeless quality. We believe that great style
            should be accessible to everyone.
          </p>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 mt-6">Our Vision</h3>
            <p>
              Our vision is to be more than just an e-commerce store. We aspire to build a community
              around our brand, inspiring confidence and creativity through our unique collections.
              We're committed to sustainable practices and ethical sourcing, ensuring that every
              purchase you make is a choice you can feel good about.
            </p>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="text-center mt-20">
        <div className="text-4xl sm:text-5xl font-bold mb-4">
          <Title text1="WHY" text2="Choose US" />
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quality Assurance Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transform transition-transform hover:scale-105 duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Quality Assurance</h4>
          <p className="text-gray-600">
            Every product is carefully selected and crafted with the finest materials to ensure
            durability, comfort, and style.
          </p>
        </div>
        
        {/* Customer Satisfaction Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transform transition-transform hover:scale-105 duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Customer Satisfaction</h4>
          <p className="text-gray-600">
            Your happiness is our priority. We offer dedicated support and hassle-free returns
            to ensure you have the best experience possible.
          </p>
        </div>
        
        {/* Affordable Prices Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transform transition-transform hover:scale-105 duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 6v2m0 6a9 9 100-18 0 9 9 0 0018 0z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Affordable Prices</h4>
          <p className="text-gray-600">
            We believe that premium quality shouldn't come with a premium price tag. Our products
            are designed to be stylish and affordable.
          </p>
        </div>
      </div>
      <div className="text-center mt-20">
      <NewsLetterBox />
      </div>
      </div>
  );
};

export default About;