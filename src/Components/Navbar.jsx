import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-teal-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white transition duration-300 hover:text-cyan-200">Privotech Journal</Link>
          <ul className="flex items-center space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition duration-300 ${isActive ? "text-cyan-200 font-bold" : "text-white hover:text-cyan-200"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `transition duration-300 ${isActive ? "text-cyan-200 font-bold " : "bg-white text-green-500 hover:text-cyan-200 p-2 px-4 rounded-full"}`
                }
              >
                Add Post
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;