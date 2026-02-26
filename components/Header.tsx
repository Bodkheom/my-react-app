
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="bg-white border-b py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-8">
          <div className="flex items-center space-x-6 text-[11px] font-bold text-gray-500">
            <a href="#" className="hover:text-red-600 transition uppercase tracking-tighter">Login</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-red-600 transition uppercase tracking-tighter">Student Portal</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-red-600 transition uppercase tracking-tighter">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
