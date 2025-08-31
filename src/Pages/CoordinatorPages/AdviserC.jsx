import React, { useState, useEffect } from 'react';
import AddAdviser from './AddAdviser'; 

const AdviserC = () => {
  const [advisers, setAdvisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddAdviserForm, setShowAddAdviserForm] = useState(false);

  useEffect(() => {
    const fetchAdvisers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise(resolve =>
          setTimeout(() => {
            const mockAdvisers = [
              { id: '111', lastname: 'Dela Cruz', firstname: 'Juan', mi: 'S.', program: 'BSIT', email: 'juan.delacruz@gmail.com' },
              { id: '112', lastname: 'Reyes', firstname: 'Maria', mi: 'L.', program: 'BSBA', email: 'maria.reyes@gmail.com' },
              { id: '113', lastname: 'Santos', firstname: 'Pedro', mi: 'A.', program: 'BSENT', email: 'pedro.santos@gmail.com' },
              { id: '114', lastname: 'Cruz', firstname: 'Ana', mi: 'M.', program: 'BEED', email: 'ana.cruz@gmail.com' },
              { id: '115', lastname: 'Garcia', firstname: 'Jose', mi: 'P.', program: 'IND. ENG.', email: 'jose.garcia@gmail.com' },
            ];
            resolve({ ok: true, json: () => Promise.resolve(mockAdvisers) });
          }, 1000)
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setAdvisers(data);
      } catch (err) {
        console.error("Failed to fetch advisers:", err);
        setError("Failed to load advisers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisers();
  }, []);

  const handleAddNewAdviser = () => {
    setShowAddAdviserForm(true);
  };

  const handleRemoveAdviser = (id) => {
    const isConfirmed = window.confirm(`Are you sure you want to remove adviser with ID: ${id}?`);
    if (isConfirmed) {
      setAdvisers(prev => prev.filter(adviser => adviser.id !== id));
      alert(`Adviser ${id} removed (simulated).`);
    }
  };

  return (
    <div className="p-5 md:p-8 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Programs Advisers</h1>
        <p className="text-gray-600 text-sm">List of Program Advisers</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-red-800">
            <tr>
              {['ID no.', 'Lastname', 'Firstname', 'MI.', 'Program', 'Email', 'REMOVE'].map((title, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider ${
                    idx === 0 ? 'rounded-tl-lg' : idx === 6 ? 'text-center rounded-tr-lg' : ''
                  }`}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Loading advisers...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-red-500">{error}</td>
              </tr>
            ) : advisers.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No advisers found.</td>
              </tr>
            ) : (
              advisers.map(adviser => (
                <tr key={adviser.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{adviser.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{adviser.lastname}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{adviser.firstname}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{adviser.mi}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{adviser.program}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{adviser.email}</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button
                      onClick={() => handleRemoveAdviser(adviser.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      aria-label={`Remove adviser ${adviser.firstname} ${adviser.lastname}`}
                    >
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

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleAddNewAdviser}
          className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Add new Adviser
        </button>
      </div>

      {/* Add Adviser Modal */}
      {showAddAdviserForm && (
        <div className="fixed inset-0 bg-red-900  bg-opacity-50 flex items-center justify-center z-50">
          
            <AddAdviser
              onAddSuccess={(newAdviser) => {
                setAdvisers(prev => [...prev, newAdviser]);
                setShowAddAdviserForm(false);
              }}
              onCancel={() => setShowAddAdviserForm(false)}
            />
          
        </div>
      )}
    </div>
  );
};

export default AdviserC;
