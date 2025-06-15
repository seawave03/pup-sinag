import React, { useState, useEffect } from 'react';

const ProgramsC = () => {
  // State to store the list of programs
  const [programs, setPrograms] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);

  // Simulated data fetching from a "database"
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(null);   // Clear any previous errors

      try {
        // TODO: Database Connection Point 1: Replace this simulated API call.
        // This is where you will make your actual API request to your backend.
        // Example: const response = await fetch('/api/programs');

        // --- START OF SIMULATED DATA ---
        // TODO: Database Connection Point 2: Remove this mock data
        // when you uncomment and use your real backend API.
        const mockPrograms = [
          { id: 1, name: 'BSIT', adviser: 'Mr. Dela Cruz', numInterns: 45 },
          { id: 2, name: 'BSBA', adviser: 'Ms. Garcia', numInterns: 30 },
          { id: 3, name: 'BSENT', adviser: 'Mr. Santos', numInterns: 20 },
          { id: 4, name: 'BEED', adviser: 'Mrs. Tan', numInterns: 25 },
          { id: 5, name: 'IND. ENG.', adviser: 'Mr. Ramos', numInterns: 15 },
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Use the simulated data
        const data = mockPrograms;
        // --- END OF SIMULATED DATA ---

        // In a real scenario, after `const response = await fetch(apiUrl);`
        // you would check `if (!response.ok) { throw new Error(...) }`
        // and then `const data = await response.json();`

        setPrograms(data); // Update state with fetched data

      } catch (err) {
        console.error("Failed to fetch programs:", err);
        setError("Failed to load programs. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchPrograms(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <div className="p-5 md:p-8 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="mb-8 flex items-center">
        {/* Removed Placeholder for the icon */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Programs</h1>
          <p className="text-gray-600 text-sm">List of Program Advisers</p> {/* Text from your image */}
        </div>
      </div>

      {/* Programs Table Container */}
      <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-red-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">
                Programs
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Advisers
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tr-lg">
                No. of Interns
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  Loading programs...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : programs.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  No programs found.
                </td>
              </tr>
            ) : (
              programs.map((program) => (
                <tr key={program.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {program.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {program.adviser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {program.numInterns}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramsC;
