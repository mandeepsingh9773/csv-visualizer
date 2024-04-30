import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="font-custom1 flex flex-wrap h-auto">
      <section className="relative">
        {/* navbar */}
        <nav className="flex justify-between bg-white text-black h-auto w-screen">
          <div className="px-5 xl:px-12 py-4 flex w-full items-center justify-between">
            <a className="text-3xl font-heading" href="/">
              Logo
            </a>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
