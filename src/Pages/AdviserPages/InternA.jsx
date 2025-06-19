import React, { useState, useEffect } from 'react';

const InternA = () => {
  // State to store the list of interns
  const [interns, setInterns] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true); // Keep initial state as true
  // State for error messages
  const [error, setError] = useState(null);

  // Filter states
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock options for now:
  const companyOptions = ['All', 'AAA', 'BBB', 'CCC', 'DDD'];
  const statusOptions = ['All', 'Endorsed', 'Pending'];

  // useEffect to fetch interns data
  useEffect(() => {
    // The mock data setup and client-side filtering logic
    // is placed directly inside useEffect or a function
    // called within it, ensuring it runs on component mount
    // and when dependencies change.

    const processInternsData = async () => {
      setLoading(true); // Set loading to true at the start of data fetching/processing
      setError(null);

      try {
        // --- START OF SIMULATED DATA & CLIENT-SIDE FILTERING (REMOVE THIS ENTIRE BLOCK FOR REAL DB) ---
        const mockInterns = [
          { studNo: '111', lastname: 'Dela Cruz', firstname: 'Juan', mi: 'S.', email: 'juan@gmail.com', program: 'BSIT', adviser: 'Mr. Dela Cruz', company: 'AAA', supervisor: 'Mrs. Cruz', status: 'Endorsed' },
          { studNo: '113', lastname: 'Santos', firstname: 'Pedro', mi: 'A.', email: 'pedro@mail.com', program: 'BSIT', adviser: 'Mr. Dela Cruz', company: 'CCC', supervisor: 'Ms. Johnson', status: 'Endorsed' },
          { studNo: '116', lastname: 'Tan', firstname: 'Michael', mi: 'J.', email: 'michael@email.com', program: 'BSIT', adviser: 'Mr. Dela Cruz', company: 'BBB', supervisor: 'Mr. Smith', status: 'Pending' },
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        let filteredInternsClientSide = mockInterns.filter(intern => {
          if (selectedCompany !== 'All' && intern.company !== selectedCompany) {
            return false;
          }
          if (selectedStatus !== 'All' && intern.status !== selectedStatus) {
            return false;
          }
          if (searchTerm) {
            const fullName = `${intern.firstname} ${intern.lastname}`.toLowerCase();
            if (!fullName.includes(searchTerm.toLowerCase())) {
              return false;
            }
          }
          return true;
        });

        setInterns(filteredInternsClientSide);
        // --- END OF SIMULATED DATA & CLIENT-SIDE FILTERING ---

      } catch (err) {
        console.error("Failed to process interns data:", err);
        setError(err.message || "Failed to load interns. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after data is processed (or an error occurs)
      }
    };

    processInternsData(); // Call the function directly inside useEffect

    // Dependencies: This useEffect will re-run whenever any of these filter states change.
  }, [selectedCompany, selectedStatus, searchTerm]);


  // Handlers for filter changes
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-5 md:p-8 bg-gray-100 min-h-screen">
      {/* Header and Filters */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-8 border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Interns</h1>
            <p className="text-gray-600 text-sm">Interns record</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Company Name Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              value={selectedCompany}
              onChange={handleCompanyChange}
            >
              {companyOptions.map((company) => (
                <option key={company} value={company}>
                  {company === 'All' ? 'Company name' : company}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'Status' : status}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Type interns name"
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interns Table Container */}
      <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-red-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">
                Stud. no.
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
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Supervisor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tr-lg">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  Loading interns...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : interns.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  No interns found matching your criteria.
                </td>
              </tr>
            ) : (
              interns.map((intern) => (
                <tr key={intern.studNo}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.studNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.lastname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.firstname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.mi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.supervisor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternA;