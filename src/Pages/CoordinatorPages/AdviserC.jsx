import React, { useState, useEffect } from 'react';

const AdviserC = () => {
  // State to store the list of advisers
  const [advisers, setAdvisers] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);

  // Simulated data fetching from a "database"
  useEffect(() => {
    const fetchAdvisers = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(null);   // Clear any previous errors

      try {
        // Simulate an API call with a delay
        const response = await new Promise(resolve => setTimeout(() => {
          // This is your simulated database data.
          // In a real application, you would replace this with an actual fetch call
          // to your backend API, e.g., fetch('/api/advisers').
          const mockAdvisers = [
            { id: '111', lastname: 'Dela Cruz', firstname: 'Juan', mi: 'S.', program: 'BSIT', email: 'juan.delacruz@gmail.com' },
            { id: '112', lastname: 'Reyes', firstname: 'Maria', mi: 'L.', program: 'BSBA', email: 'maria.reyes@gmail.com' },
            { id: '113', lastname: 'Santos', firstname: 'Pedro', mi: 'A.', program: 'BSENT', email: 'pedro.santos@gmail.com' },
            { id: '114', lastname: 'Cruz', firstname: 'Ana', mi: 'M.', program: 'BEED', email: 'ana.cruz@gmail.com' },
            { id: '115', lastname: 'Garcia', firstname: 'Jose', mi: 'P.', program: 'IND. ENG.', email: 'jose.garcia@gmail.com' },
          ];
          // hanggang dito remove para sa db
          
          resolve({ ok: true, json: () => Promise.resolve(mockAdvisers) });
        }, 1000)); // Simulate 1 second loading time

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAdvisers(data); // Update state with fetched data

      } catch (err) {
        console.error("Failed to fetch advisers:", err);
        setError("Failed to load advisers. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is complete (success or error)
      }
    };

    fetchAdvisers(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  // Handler for adding a new adviser (placeholder)
  const handleAddNewAdviser = () => {
    // In a real application, this would open a modal or navigate to a new form
    // to add a new adviser. For now, it just logs to the console.
    console.log("Add new adviser button clicked!");
    // You would typically navigate to an add form or open a modal here
    // For example: navigate('/advisers/new');
    alert("Functionality to add a new adviser would go here!");
  };

  // Handler for removing an adviser (placeholder)
  const handleRemoveAdviser = (id) => {
    // In a real application, this would send a DELETE request to your API
    // and then update the state to remove the adviser from the list.
    console.log(`Remove adviser with ID: ${id}`);
    const isConfirmed = window.confirm(`Are you sure you want to remove adviser with ID: ${id}?`);
    if (isConfirmed) {
      // Simulate removal from DB and then update UI
      setAdvisers(prevAdvisers => prevAdvisers.filter(adviser => adviser.id !== id));
      alert(`Adviser ${id} removed (simulated).`);
    }
  };

  return (
    <div className="p-5 md:p-8 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Programs Advisers</h1>
        <p className="text-gray-600 text-sm">List of Program Advisers</p>
      </div>

      {/* Advisers Table Container */}
      <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-red-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">
                ID no.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Lastname
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Firstname
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                MI.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Program
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider rounded-tr-lg">
                REMOVE
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  Loading advisers...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : advisers.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  No advisers found.
                </td>
              </tr>
            ) : (
              advisers.map((adviser) => (
                <tr key={adviser.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adviser.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adviser.lastname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adviser.firstname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adviser.mi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adviser.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adviser.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleRemoveAdviser(adviser.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      aria-label={`Remove adviser ${adviser.firstname} ${adviser.lastname}`}
                    >
                      {/* Trash Can Icon (SVG) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm4 11a1 1 0 100-2H9a1 1 0 100 2h2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Adviser Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleAddNewAdviser}
          className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Add new Adviser
        </button>
      </div>
    </div>
  );
};

export default AdviserC;
