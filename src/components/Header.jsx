import Image from "next/image";
import React from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex  items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src="http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png"
            layout="fill"
            className="object-contain"
          />
        </div>
        <div className="cursor-pointer h-24 w-10 relative  lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
            layout="fill"
            className="object-contain"
          />
        </div>

        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <MagnifyingGlassIcon className="h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>

        <div className="flex space-x-4 items-center">
          <HomeIcon className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition duration-200" />
          <PlusCircleIcon className="h-6 cursor-pointer hover:scale-125 transi duration-200" />
          <img
            src="https://mmtec-talentfy.s3.amazonaws.com/avatars/953ea5c52d96663e1c615a816c456349.png"
            alt="user-image"
            className="h-10 rounded-full  cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
