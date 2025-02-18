import React from 'react';
import { Bell, Menu } from 'lucide-react';
import UserDropdown from './UserDropdown';

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export default function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-40">
      <div className=" mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            
            <span className="ml-4 text-xl font-bold text-gray-900 hidden sm:block">Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}