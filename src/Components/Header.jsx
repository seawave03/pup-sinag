// src/Header.jsx
import PUP_MBC_WT from '../assets/PUP_MBC_WT.png';

function Header() {
  return (
    <header className="flex items-start p-4 bg-red-900 shadow-md">
      {/* Logo */}
      <img src={PUP_MBC_WT} alt="PUP Logo" className="w-16 h-16 mr-4" />

      {/* Text block */}
      <div className="text-white text-left leading-tight">
        <h1 className="text-lg font-bold">
           Polytechnic University of the Philippines - Mariveles, Bataan Campus
        </h1>
        <h3 className="text-sm font-semibold">
         PUP System for Internship Navigation and Guidance(SINAG)
        </h3>
        <h6 className="text-xs italic">
          The Country's 1st PolytechnicU
        </h6>
      </div>
    </header>
  );
}

export default Header;
