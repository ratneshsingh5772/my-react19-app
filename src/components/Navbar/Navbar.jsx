import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../program/AuthContextInstance";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <Link to="/" className="text-black text-xl font-bold">MyReactApp</Link>
          </div>

          <div className="hidden sm:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-black hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-300">Home</Link>
              <Link to="/about" className="text-black hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-300">About</Link>
              <Link to="/theme" className="text-black hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-300">Theme</Link>
              <Link to="/authlogin" className="text-black hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-300">Auth Login</Link>
              <Link to="/bankaccount" className="text-black hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-300">Bank Account</Link>
              <a href="/contact" className="text-black hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-300">Contact</a>
              <span className="text-black px-3 py-2 text-sm font-medium">
                {user ? `Signed in as: ${user.name}` : "Guest"}
              </span>
            </div>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:bg-gray-100 hover:text-black px-2 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <Link to="/" className="text-black hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium transition duration-300">Home</Link>
            <Link to="/about" className="text-black hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium transition duration-300">About</Link>
            <a href="/contact" className="text-black hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium transition duration-300">Contact</a>
            <div className="text-black px-3 py-2 text-sm font-medium border-t border-gray-200 mt-2 pt-2">
              {user ? `Signed in as: ${user.name}` : "Guest"}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}