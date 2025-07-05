import { assets, infoList, toolsData } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import * as motion from "motion/react-client";
import { scale } from "motion";
const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 1,
        
      }}
      id="about"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
        }}
        className="text-center mb-2 text-lg font-[Ovo]"
      >
        Introduction
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
        className="text-center text-5xl font-[Ovo]"
      >
        About Me
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.8,
        }}
        className="flex w-full flex-col lg:flex-row items-center gap-20 my-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
          }}
          className="w-64 sm:w-80 rounded-3xl max-w-none"
        >
          <Image
            src={assets.profile_img1}
            alt="userImage"
            className="w-full rounded-3xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
          className="flex-1"
        >
          <p className="mb-10 max-w-2xl font-[Ovo]">
            Skilled Senior SRE with 3 years of experience in systems
            engineering, cloud-native tech, and full-stack development. Expert
            in building scalable, reliable systems using Docker, Kubernetes, and
            AWS. Full-stack proficiency with React.js, Node.js, MongoDB, and
            Python for seamless DevOps collaboration.
          </p>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
          >
            {infoList.map((item, index) => {
              return (
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  key={index}
                  className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-progress hover:hover:bg-[#fcf4ff] hover:-translate-y-1 duration-500 hover:shadow-[4px_4px_0_#000]"
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    className="w-7 mt-3"
                  />
                  <h3 className="my-4 font-semibold text-gray-700">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.li>
              );
            })}
          </motion.ul>
          <motion.h4
          initial={{y:20, opacity: 0 }}
        whileInView={{ y:0,opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 1.3,
        }}
          className="my-6 text-gray-700 font-[Ovo]">Tools I Use</motion.h4>
          <motion.ul
          initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.6,
        }}
          className="flex items-center gap-3 sm:gap-5">
            {toolsData.map((item, index) => {
              return (
                <motion.li
                whileHover={{scale:1.1}}
                  key={index}
                  className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500 "
                >
                  <Image src={item} alt={item} className="w-5 sm:w-7" />
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
