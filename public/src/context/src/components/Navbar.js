import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">PrimeXBook</Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/books" className="hover:text-primary-light transition">Books</Link>
          
          {currentUser ? (
            <>
              <Link to="/dashboard" className="hover:text-primary-light transition">Dashboard</Link>
              <button 
                onClick={logout}
                className="bg-secondary px-4 py-2 rounded hover:bg-secondary-dark transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-primary-light transition">Sign In</Link>
              <Link 
                to="/signup" 
                className="bg-secondary px-4 py-2 rounded hover:bg-secondary-dark transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
