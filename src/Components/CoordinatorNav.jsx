import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { User, LayoutDashboard, GraduationCap, BookOpen, Building, FileText , Presentation, LogOut } from 'lucide-react'; // Import LogOut icon

const CoordinatorNav = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const navItems = [
    { name: 'Dashboard', path: '/coordinator/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Advisers', path: '/coordinator/adviser', icon: <Presentation size={20} /> },
    { name: 'Interns', path: '/coordinator/interns', icon: <GraduationCap size={20} /> },
    { name: 'Programs', path: '/coordinator/programs', icon: <BookOpen size={20} /> },
    { name: 'Companies', path: '/coordinator/companies', icon: <Building size={20} /> },
    { name: 'Reports', path: '/coordinator/reports', icon: <FileText size={20} /> },
  ];

  // Handler for logout functionality
  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: Implement actual logout logic here:
    // 1. Clear authentication tokens (e.g., from localStorage, sessionStorage, or a global state management).
    //    Example: localStorage.removeItem('authToken');
    // 2. Redirect the user to the login page.
    navigate('/IogIn'); // Changed: This will now navigate directly to the /login route
  };

  return (
    // Main navigation container:
    // flex-wrap: Allows items to wrap onto multiple lines on smaller screens.
    // py-2 px-4: Smaller padding for mobile, md:py-3 md:px-6 for larger screens.
    // gap-x-2 gap-y-1: Smaller horizontal/vertical gap for mobile, md:gap-6 for larger screens.
    // mb-2 md:mb-0: Margin adjustments for proper spacing on small screens.
    <nav className="bg-red-900 text-white py-2 px-4 md:py-3 md:px-6 shadow-md flex flex-wrap justify-between items-center mt-5">
      {/* Container for main navigation items:
          flex-wrap: Ensures items wrap if space is limited.
          gap-x-2 gap-y-1: Provides tighter spacing for small screens.
          md:gap-6: Expands gap on medium and larger screens.
          mb-2 md:mb-0: Adds bottom margin on small screens to separate from profile link if it wraps. */}
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
      {/* Profile and Logout links container */}
      <div className="flex items-center gap-4 mt-2 md:mt-0">
        {/* Profile link:
            mt-2 md:mt-0: Adds top margin on small screens if the nav items wrap. */}
        <NavLink
          to="/coordinator/profile"
          className="flex items-center gap-2 hover:text-yellow-300 transition"
        >
          <User size={24} />
          <span className="text-sm md:text-base">Profile</span>
        </NavLink>
        {/* Logout Button/Link */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white hover:text-yellow-300 transition bg-transparent border-none cursor-pointer p-0"
        >
          <LogOut size={24} />
          <span className="text-sm md:text-base">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default CoordinatorNav;
