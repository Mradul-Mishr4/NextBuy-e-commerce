import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
const OurPolicy = () => {
  return (
    <div className='flex fles-col sm:flex-row justify-around gap-12 md:  text-center py-6 '>
     <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-semibold'>Easy Exchange policies </p>
        <p className='text-gray-400 '>We Provide Hussle Free Exchange at our pre-defined store.</p>
     </div>  
     <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-semibold'>We have 7 days return policy. </p>
        <p className='text-gray-400 '>We Provide return at our pre-defined store.</p>
     </div> 
     <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-semibold'>Best Customer Support </p>
        <p className='text-gray-400 '>We Provide 24/7 Customer Support.</p>
     </div> 
       
        
    </div>
  )
}

export default OurPolicy