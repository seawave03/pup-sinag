import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, LayoutDashboard, ClipboardList } from 'lucide-react';

const SupervisorNav = () => {
  const navItems = [
    { name: 'Dashboard', path: '/supervisor/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Evaluation', path: '/supervisor/evaluation', icon: <ClipboardList size={20} /> },
    
  ];

  return (
    <nav className="bg-red-900 text-white py-3 px-6 shadow-md flex justify-between items-center mt-5">
      <div className="flex gap-6 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1 rounded-md hover:bg-yellow-600 transition ${
                isActive ? 'bg-red-700' : ''
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <NavLink
        to="/supervisor/profile"
        className="flex items-center gap-2 hover:text-yellow-300 transition"
      >
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
    
  );
};

export default SupervisorNav;
