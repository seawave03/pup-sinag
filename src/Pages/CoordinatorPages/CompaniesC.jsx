import React, { useState, useEffect } from 'react';

const CompaniesC = () => {
  // State to store the list of companies
  const [companies, setCompanies] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Simulated data fetching from a "database"
  // This useEffect will re-run when the search term changes
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(null);   // Clear any previous errors

      try {
        // TODO: Database Connection Point 1: Replace this simulated API call.
        // This is where you will make your actual API request to your backend.
        // Example: let apiUrl = '/api/companies';
        // if (searchTerm) {
        //   apiUrl += `?name=${encodeURIComponent(searchTerm)}`; // Pass search term to backend
        // }
        // const response = await fetch(apiUrl);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        // setCompanies(data); // Update state with fetched and backend-filtered data


        // --- START OF SIMULATED DATA ---
        // TODO: Database Connection Point 2: Remove this mock data and filtering
        // when you uncomment and use your real backend API.
        const mockCompanies = [
          { no: '001', name: 'AAA', email: 'aaa@gmail.com', supervisor: 'Mrs. Cruz', address: '.st.', moa: '.pdf' },
          { no: '002', name: 'BBB Corp', email: 'info@bbbcorp.com', supervisor: 'Mr. Smith', address: '123 Main St.', moa: 'bbb_moa.pdf' },
          { no: '003', name: 'XYZ Innovations', email: 'contact@xyz.net', supervisor: 'Ms. Johnson', address: '456 Oak Ave.', moa: 'xyz_agreement.pdf' },
          { no: '004', name: 'Global Tech', email: 'support@globaltech.org', supervisor: 'Dr. Lee', address: '789 Pine Ln.', moa: 'global_tech_moa.pdf' },
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Apply client-side filtering for sample data (REMOVE THIS FOR REAL DB)
        let filteredCompanies = mockCompanies.filter(company => {
          if (searchTerm) {
            return company.name.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return true;
        });

        setCompanies(filteredCompanies); // Update state with filtered sample data
        // --- END OF SIMULATED DATA ---

      } catch (err) {
        console.error("Failed to fetch companies:", err);
        setError("Failed to load companies. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchCompanies(); // Call the fetch function
  }, [searchTerm]); // Re-run effect when search term changes

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handler for "Edit MOA" button (placeholder)
  const handleEditMoa = () => {
    console.log("Edit MOA button clicked!");
    // TODO: Navigation/Action Point 3:
    // This would likely open a modal or navigate to a page for editing MOA documents.
    alert("Functionality to edit MOA would go here!");
  };

  // Handler for "Add new Company" button (placeholder)
  const handleAddCompany = () => {
    console.log("Add new Company button clicked!");
    // TODO: Navigation/Action Point 4:
    // This would likely open a modal or navigate to a form for adding a new company.
    alert("Functionality to add a new company would go here!");
  };

  // REMOVED: handleBackToHome function is no longer needed.

  return (
    <div className="p-5 md:p-8 bg-gray-100 min-h-screen">
      {/* Header and Action Buttons */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-8 border border-gray-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Company</h1>
            <p className="text-gray-600 text-sm">List of companies with MOA</p>
          </div>
          {/* Aligned Buttons and Search Bar */}
          <div className="flex flex-wrap items-center gap-3 justify-end w-full sm:w-auto">
            {/* Action Buttons */}
            <button
              onClick={handleEditMoa}
              className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
            >
              Edit MOA
            </button>
            <button
              onClick={handleAddCompany}
              className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
            >
              Add new Company
            </button>
            {/* Search Input aligned horizontally */}
            <div className="relative">
              <input
                type="text"
                placeholder="Company"
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm w-full"
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
        {/* The second row for search input has been removed as it's now aligned with buttons */}
      </div>

      {/* Companies Table Container */}
      <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-red-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">
                No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Company name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Supervisor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tr-lg">
                MOA
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  Loading companies...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : companies.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  No companies found matching your criteria.
                </td>
              </tr>
            ) : (
              companies.map((company) => (
                <tr key={company.no}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.no}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.supervisor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {/* Render MOA as a clickable link if it's a path, or just text */}
                    {company.moa ? (
                      <a href={company.moa} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {company.moa}
                      </a>
                    ) : (
                      'N/A'
                    )}
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

export default CompaniesC;
