// src/components/Dashboard.js
import React, { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import KPICard from '../../Components/KPICard'; // KPICard is in the same components folder


const DashboardC = () => {
  // 1. STATE FOR STORING KPI DATA
  // Initialize state with default or loading values.
  // This 'kpiData' state will hold the numbers fetched from your database.
  const [kpiData, setKpiData] = useState({
    activeInterns: 'Loading...',
    activePrograms: 'Loading...',
    partnerCompanies: 'Loading...',
    pendingApplications: 'Loading...',
    remainingSlots: 'Loading...',
  });

  // 2. useEffect HOOK FOR DATA FETCHING
  // The useEffect hook is where you'll perform side effects,
  // such as data fetching from an API.
  useEffect(() => {
    const fetchKpiData = async () => {
      try {
        // --- THIS IS THE PRIMARY PLACE TO EMBED YOUR DATABASE FETCHING LOGIC ---
        // Replace this with your actual API endpoint
        const response = await fetch('/api/dashboard-kpis'); // Example: /api/dashboard-kpis
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming your API returns data in a similar structure:
        // {
        //   totalActiveInterns: 45,
        //   totalActivePrograms: 12,
        //   totalPartnerCompanies: 8,
        //   totalPendingApplications: 7,
        //   totalRemainingSlots: 20
        // }

        // Update the state with the fetched data
        setKpiData({
          activeInterns: data.totalActiveInterns,
          activePrograms: data.totalActivePrograms,
          partnerCompanies: data.totalPartnerCompanies,
          pendingApplications: data.totalPendingApplications,
          remainingSlots: data.totalRemainingSlots,
        });

      } catch (error) {
        console.error("Failed to fetch KPI data:", error);
        // Optionally, update state to show an error message
        setKpiData({
          activeInterns: 'Error',
          activePrograms: 'Error',
          partnerCompanies: 'Error',
          pendingApplications: 'Error',
          remainingSlots: 'Error',
        });
      }
    };

    fetchKpiData(); // Call the async function to fetch data when the component mounts
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  const programsFilter = ['BSBA', 'BSIT', 'BSENT', 'BEED', 'IND. ENG.'];

  return (
    <div className="p-5 md:p-8 bg-gray-100 min-h-screen">
      {/* Breadcrumbs */}
      <div className="text-gray-600 text-sm mb-5 flex items-center">
        <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span> Dashboard &gt;
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Filters Sidebar */}
        <aside className="bg-white rounded-lg shadow-md p-5 w-full md:w-52 flex-shrink-0 border border-gray-300">
          <div className="bg-red-800 text-white font-bold text-center py-2 px-4 -mx-5 -mt-5 mb-5 rounded-t-lg">
            Filters
          </div>
          <ul className="list-none p-0 m-0 text-sm">
            <li className="py-2 text-gray-700 font-semibold">Programs</li>
            {programsFilter.map((program, index) => (
              <li key={index} className="py-2 text-gray-600 hover:text-black cursor-pointer transition-colors duration-200">
                {program}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Dashboard Area - KPI Grid */}
        <main className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <KPICard
              title="Active Intern"
              value={kpiData.activeInterns} // Using state value
              description="(Currently active)"
            />
            <KPICard
              title="Active Programs"
              value={kpiData.activePrograms} // Using state value
              description="Ready for interns"
            />
            <KPICard
              title="Partner Companies"
              value={kpiData.partnerCompanies} // Using state value
              description="Active Partnership"
            />
            <KPICard
              title="Pending Applications"
              value={kpiData.pendingApplications} // Using state value
              description="(New applications)"
            />
            {/* The empty card placeholder from your image */}
            <div className="hidden lg:block"></div>

            <KPICard
              title="Remaining Slots"
              value={kpiData.remainingSlots} // Using state value
              description="(Across all programs)"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardC;