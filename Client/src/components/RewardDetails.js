import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaWallet } from "react-icons/fa"; 

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-gray-400">
          My Dashboard
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/profile">
          <FaUserCircle className="text-2xl hover:text-gray-400 cursor-pointer" />
        </Link>
        <Link to="/wallet">
          <FaWallet className="text-2xl hover:text-gray-400 cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
