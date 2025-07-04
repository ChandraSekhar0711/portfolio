import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg font-[Ovo]'>Introduction</h4>
      <h2 className='text-center text-5xl font-[Ovo]'>About Me</h2>
      <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.user_image} alt='userImage' className='w-full rounded-3xl'/>
        </div>
        <div className='flex-1'>
            <p className='mb-10 max-w-2xl font-[Ovo]'>
                Skilled Senior SRE with 3 years of experience in systems engineering, cloud-native tech, and full-stack development.
Expert in building scalable, reliable systems using Docker, Kubernetes, and AWS.
Full-stack proficiency with React.js, Node.js, MongoDB, and Python for seamless DevOps collaboration.
            </p>
            <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                {infoList.map((item,index)=>{
                    return(
                        <li key={index} className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-progress hover:hover:bg-[#fcf4ff] hover:-translate-y-1 duration-500 hover:shadow-[4px_4px_0_#000]'>
                        <Image src={item.icon} alt={item.title} className='w-7 mt-3'/>
                        <h3 className='my-4 font-semibold text-gray-700'>{item.title}</h3>
                        <p className='text-gray-600 text-sm'>{item.description}</p>
                    </li>
                    )
                    
                })}
            </ul>
            <h4 className='my-6 text-gray-700 font-[Ovo]'>Tools I Use</h4>
            <ul className='flex items-center gap-3 sm:gap-5'>
                {toolsData.map((item,index)=>{
                    return (
                        <li key={index} className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500 '>
                            <Image  src={item} alt={item} className='w-5 sm:w-7'/>
                        </li>
                    )
                })}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default About
