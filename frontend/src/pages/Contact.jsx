import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      <div className="text-center mb-12">
        <div className="text-4xl sm:text-5xl font-bold">
          <Title text1="Contact" text2="Us" />
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Our Information
        </h3>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Contact Info */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-6 h-6 mt-1 text-gray-600">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5v2a10 10 0 0010 10h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 01-2-2V5z"
                  />
                </svg>
              </span>
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Phone</h4>
                <p className="text-gray-600">+1 (234) 567-8900</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-6 h-6 mt-1 text-gray-600">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4"
                  />
                </svg>
              </span>
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Email</h4>
                <p className="text-gray-600">support@yourstore.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-6 h-6 mt-1 text-gray-600">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"
                  />
                </svg>
              </span>
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Address</h4>
                <p className="text-gray-600">
                  123 Main Street, City, State, Zip Code
                </p>
              </div>
            </div>
          </div>

          {/* Contact Image */}
          <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-105 duration-300">
            <img
              src={assets.contact_img}
              alt="Contact us image"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;
