import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-500 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          {/* Placeholder Logo */}
          <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
            <span className="text-yellow-500 font-bold">C</span>
          </div>
          <span className="text-lg font-semibold">CoderHacks</span>
        </div>

        {/* Copyright */}
        <p className="text-sm">
          © 2024 CoderHacks. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
