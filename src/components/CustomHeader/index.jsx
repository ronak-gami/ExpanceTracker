import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar, Button } from '@mui/material';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="flex justify-between items-center h-full px-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600">
          Expense Tracker
        </div>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">{user.username}</span>
            <Avatar
              src={user.profilePic}
              alt={user.username}
              className="border-2 border-blue-200 cursor-pointer"
            />
          </div>
        ) : (
          <div className="flex space-x-4">
            <Button 
              variant="outlined" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Login
            </Button>
            <Button 
              variant="contained"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
