import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import * as motion from "motion/react-client";

const Header = () => {
  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{
          duration: 0.8,
          scale: {
            type: "spring",
            visualDuration: 0.4,
            bounce: 0.5,
            stiffness: 100,
          },
        }}
      >
        <Image
          src={assets.profilePic}
          alt="profile"
          className="w-32 h-32 rounded-full overflow-hidden object-cover"
        />
      </motion.div>

      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-[Ovo]"
      >
        Hi! I'm ChandraSekharRao Thogiri{" "}
        <Image src={assets.hand_icon} alt="handIcon" className="w-6" />
      </motion.h3>
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
        }}
        className="text-3xl sm:text-6xl lg:text-[66px] font-[Ovo]"
      >
        SRE / Frontend Developer
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.7,
        }}
        className="max-w-2xl mx-auto font-[Ovo]"
      >
        I'm an SRE / frontend Developer with 3+ years of experience.
      </motion.p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <motion.a
        initial={{ y:30,opacity:0 }}
        whileInView={{ y:0,opacity:1 }}
        transition={{
          duration: 0.6,
          delay:1
        }}
          href="#contact"
          className="px-10 py-3 border rounded-full bg-black text-white flex items-center gap-2"
        >
          Contact Me{" "}
          <Image src={assets.right_arrow_white} alt="profile" className="w-4" />
        </motion.a>
        <motion.a
        initial={{ y:30,opacity:0 }}
        whileInView={{ y:0,opacity:1 }}
        transition={{
          duration: 0.6,
          delay:1.2
        }}
          href="/sample-resume.pdf"
          download
          className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2"
        >
          My Resume{" "}
          <Image src={assets.download_icon} alt="profile" className="w-4" />
        </motion.a>
      </div>
    </div>
  );
};

export default Header;
