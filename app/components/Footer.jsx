import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-20">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Image
            className="w-10 h-10 rounded-full object-cover"
            src={assets.profilePic}
            alt="Profile"
          />
          <div className="font-semibold font-[Ovo]">
            <div>Chandra Sekhar</div>
          </div>
        </div>
        <div className="w-max flex items-center gap-2 mx-auto">
          <Image className="w-6" src={assets.mail_icon} alt="mail" />
          chandutogiri3@gmail.com
        </div>
      </div>
      <div className="text-center sm:flex items-center  justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
        <p>© 2025 ChandraSekharRao Thogiri. All rights reserved.</p>
        <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
            <li><a href="https://github.com/ChandraSekhar0711" target="_blank">Github</a></li>
            <li><a href="https://github.com/ChandraSekhar0711" target="_blank">LinkedIn</a></li>
            <li><a href="https://github.com/ChandraSekhar0711" target="_blank">Twitter</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
