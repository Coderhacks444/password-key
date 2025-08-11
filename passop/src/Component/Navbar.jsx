import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-yellow-200 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-400">
          <a href="#">Password Keys</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
                </div>

        {/* Call-to-Action Button */}
        <div className="hidden md:block">
          <a
            href="#"
            className="bg-amber-450 text-gray-300 px-6 py-2 rounded-lg shadow-md hover:bg-blue-400 transition duration-300"
          >
            <span className='text-yellow-600'>Coder</span> <span className='text-orange-600'>Hacks</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h16.5m-16.5 4h16.5m-16.5 4h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="space-y-2 p-4">
            <li>
              <a href="#" className="block text-gray-600 hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-600 hover:text-blue-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-600 hover:text-blue-500">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-600 hover:text-blue-500">
                Contact
              </a>
            </li>
           </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
