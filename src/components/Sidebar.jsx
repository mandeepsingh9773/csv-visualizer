import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";



const Navbar = () => {
  return (
    <div className="font-custom1 flex flex-wrap h-auto">
      <section className="relative">
        {/* navbar */}
        <nav className="flex justify-between bg-white text-black h-auto w-screen">
          <div className="px-5 xl:px-12 py-4 flex w-full items-center">
            <a className="text-3xl font-heading" href="/">
              Logo
            </a>
            {/* Nav Links */}
            <ul className="hidden md:flex px-4 mx-auto font-heading space-x-12">
              <li>
                <a className="hover:text-gray-400" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-gray-400" href="/">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-gray-400" href="/">
                  Collections
                </a>
              </li>
              <li>
                <a className="hover:text-gray-400" href="/">
                  Contact Us
                </a>
              </li>
            </ul>
            {/* Header Icons */}
            <div className="hidden xl:flex space-x-5 items-center">
              <a className="flex items-center " href="/">
                <FaCircleUser className="h-6 w-6 hover:text-gray-600" />
              </a>
              {/* Sign In / Register */}
              <a className="flex items-center" href="/">
                <FaGear className="h-6 w-6 hover:text-gray-600" />
              </a>
            </div>
          </div>
          {/* Responsive navbar */}

          <a className="navbar-burger self-center mr-12 xl:hidden" href="/">
            <FaCircleUser className="h-6 w-6 hover:text-gray-600" />
          </a>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
