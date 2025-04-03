import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar, Button } from '@mui/material';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-background-light shadow-header fixed top-0 left-0 right-0 h-16 z-50">
      <div className="flex justify-between items-center h-full px-6">
        <div className="text-2xl font-bold text-primary-DEFAULT">
          Expense Tracker
        </div>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-text-secondary font-medium">{user.username}</span>
            <Avatar
              src={user.profilePic}
              alt={user.username}
              className="cursor-pointer border-2 border-primary-light"
            />
          </div>
        ) : (
          <div className="flex space-x-4">
            <Button 
              variant="outlined" 
              className="!border-primary-DEFAULT !text-primary-DEFAULT hover:!bg-primary-light/10"
              href="/login"
            >
              Login
            </Button>
            <Button 
              variant="contained"
              className="!bg-primary-DEFAULT hover:!bg-primary-dark"
              href="/register"
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
