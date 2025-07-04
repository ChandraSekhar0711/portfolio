import { assets } from '@/assets/assets'
import { Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Contact = () => {
  return (
    <div id='contact'className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('/footer-bg-color.png')] bg-no-repeat bg-center bg-[length:90%_auto]">
      <h4 className='text-center mb-2 text-lg font-[Ovo]'>
        Connect With Me
      </h4>
      <h2 className='text-center mb-2 text-5xl font-[Ovo]'>
        Get In Touch
      </h2>
      <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Outfit'>
        I'd love to hear from you! If you have any questions, comments, or feedback, please use the form below.    </p>
      <form action="" className='max-w-2xl mx-auto'>
        <div className='grid grid-cols-2 gap-6 mt-10 mb-8'>
          <input type="text" name="name" id="name" placeholder='Enter your name...' required
          className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white'/>
          <input type="email" name="email" id="email" placeholder='Enter your email...' required
          className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white'/>
        </div>
        <textarea name="message" id="message" rows="6" placeholder='Enter your message' 
          className='w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6'></textarea>
        <button type='submit'
        className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white 
                    rounded-2xl mx-auto hover:bg-black duration-500' >
                      Submit Now <Image src={assets.right_arrow_white} alt='submitArrow' className='w-4'/></button>

        {/* <p className='mt-4'>sending...</p> */}
      </form>
    </div>
  )
}

export default Contact
