import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Dog, LogOut, LogIn, UserPlus, Package, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.users);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Dog className="text-primary-color" size={24} />
            <span className="font-bold text-xl">Pet Store</span>
          </Link>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/pets/manage"
                  className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                >
                  <Settings size={18} />
                  <span>Manage Pets</span>
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                >
                  <Package size={18} />
                  <span>My Orders</span>
                </Link>
                <span className="text-gray-700">
                  Welcome, {currentUser.username}
                </span>
                <Link
                  to="/logout"
                  className="flex items-center space-x-1 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="button--primary flex items-center space-x-1 px-4 py-2 rounded-md"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
                <Link
                  to="/login"
                  className="button--secondary flex items-center space-x-1 px-4 py-2 rounded-md"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;