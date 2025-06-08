// src/Components/NavigationButtons.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import coordinator from '../assets/coordinator.png';
import adviser from '../assets/adviser.png';
import intern from '../assets/intern.png';
import supervisor from '../assets/supervisor.png';

const NavigationBtn = () => {
  const navigate = useNavigate();

const buttons = [
  { label: 'Coordinator', path: '/login/coordinator', img: coordinator },
  { label: 'Adviser', path: '/login/adviser', img: adviser },
  { label: 'Intern', path: '/login/intern', img: intern },
  { label: 'Supervisor', path: '/login/supervisor', img: supervisor },
];


  return (
    <div className= "flex justify-center mt-12">
    <div className="p-6 flex flex-wrap gap-5 ">
      {buttons.map(({ label, path, img }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className="bg-white text-red-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700
           hover:text-white transition-colors duration-300 focus:outline-none focus:ring-4
            focus:ring-red-900 transform hover:scale-105 active:scale-95 border
           border-red-900 w-36 h-52 flex flex-col items-center justify-center"
        >
          <img src={img} alt={`${label} Icon`} className="w-24 h-24 mb-2" />
          <span>{label}</span>
        </button>
      ))}
    </div>
    </div>
  );
};

export default NavigationBtn;
