import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, LayoutDashboard, Folder, ClipboardList } from 'lucide-react';

const InternNav = () => {
  const navItems = [
    { name: 'Dashboard', path: '/intern/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Documents', path: '/intern/documents', icon: <Folder size={20} /> },
    { name: 'Evaluation', path: '/intern/evaluation', icon: <ClipboardList size={20} /> },
  ];

  return (
   
    <nav className="bg-red-900 text-white py-2 px-4 md:py-3 md:px-6 shadow-md flex flex-wrap justify-between items-center mt-5">
    
      <div className="flex flex-wrap gap-x-2 gap-y-1 md:gap-6 items-center mb-2 md:mb-0">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              // Individual NavLink styling:
              // px-2 py-1: Smaller padding for mobile, md:px-3 md:py-1 for larger screens.
              `flex items-center gap-2 px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-yellow-600 transition ${
                isActive ? 'bg-red-700' : ''
              }`
            }
          >
            {item.icon}
            {/* Text visibility/size:
                text-sm: Smaller font for mobile, md:text-base for larger screens. */}
            <span className="text-sm md:text-base">{item.name}</span>
          </NavLink>
        ))}
      </div>
      {/* Profile link:
          mt-2 md:mt-0: Adds top margin on small screens if the nav items wrap. */}
      <NavLink
        to="/intern/profile"
        className="flex items-center gap-2 hover:text-yellow-300 transition mt-2 md:mt-0"
      >
        <User size={24} />
        <span className="text-sm md:text-base">Profile</span>
      </NavLink>
    </nav>
  );
};

export default InternNav;
