import React from 'react';

const NewsLetterBox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Add your form submission logic here, e.g., an API call
        console.log('Form submitted!');
    };
    
    return (
        <div className='container mx-auto px-4 py-16 text-center'>
            <div className='bg-gray-100 p-8 sm:p-12 rounded-3xl shadow-xl'>
                <p className='text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3'>
                    Subscribe to Our Newsletter
                </p>
                <p className='text-lg text-gray-600 mb-8'>
                    Unlock a **20% discount** on your first order! Stay up-to-date with our exclusive offers and latest collections.
                </p>
                <form 
                    onSubmit={onSubmitHandler} 
                    className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto'
                >
                    <input 
                        type='email' 
                        className='w-full sm:flex-1 p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors' 
                        required 
                        placeholder='Enter your email address' 
                    />
                    <button 
                        className='w-full sm:w-auto bg-black text-white font-semibold text-base px-10 py-4 rounded-full hover:bg-gray-800 transition duration-300 transform hover:scale-105' 
                        type='submit' 
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsLetterBox;