import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, LayoutDashboard, GraduationCap, BookOpen, Building, FileText , Presentation } from 'lucide-react';

const CoordinatorNav = () => {
  const navItems = [
    { name: 'Dashboard', path: '/coordinator/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Advisers', path: '/coordinator/adviser', icon: <Presentation size={20} /> },
    { name: 'Interns', path: '/coordinator/interns', icon: <GraduationCap size={20} /> },
    { name: 'Programs', path: '/coordinator/programs', icon: <BookOpen size={20} /> },
    { name: 'Companies', path: '/coordinator/companies', icon: <Building size={20} /> },
    { name: 'Reports', path: '/coordinator/reports', icon: <FileText size={20} /> },
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
        to="/coordinator/profile"
        className="flex items-center gap-2 hover:text-yellow-300 transition"
      >
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
    
  );
};

export default CoordinatorNav;
