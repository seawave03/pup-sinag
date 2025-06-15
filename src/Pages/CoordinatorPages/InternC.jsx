import React, { useState, useEffect } from 'react';

const InternC = () => {
  // State to store the list of interns
  const [interns, setInterns] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);

  // Filter states
  const [selectedProgram, setSelectedProgram] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  // NEW STATE: For the Status filter
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Dropdown options (simulated - ideally fetched from DB)
  // TODO: Database Connection Point 1:
  // If your program and company options also come from the database,
  // you would fetch them here using a separate useEffect or at the same time
  // as the interns data if they are small enough to be bundled.
  const programOptions = ['All', 'BSIT', 'BSBA', 'BSENT', 'BEED', 'IND. ENG.'];
  const companyOptions = ['All', 'AAA', 'BBB', 'CCC', 'DDD']; // Example company names
  // NEW OPTION: For the Status filter
  const statusOptions = ['All', 'Endorsed', 'Pending']; // Example status options

  // Simulated data fetching from a "database"
  // This useEffect will re-run when filters or search term changes
  useEffect(() => {
    const fetchInterns = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(null);   // Clear any previous errors

      try {
        // TODO: Database Connection Point 2: This entire block is commented out for now.
        // When you're ready to connect to your real backend database, uncomment this
        // and remove the simulated data below.

        // let apiUrl = '/api/interns'; // Your actual API endpoint for interns

        // // Construct query parameters based on current filter/search states
        // const params = new URLSearchParams();
        // if (selectedProgram !== 'All') {
        //   params.append('program', selectedProgram);
        // }
        // if (selectedCompany !== 'All') {
        //   params.append('company', selectedCompany);
        // }
        // // NEW PARAMETER for backend filter
        // if (selectedStatus !== 'All') {
        //   params.append('status', selectedStatus);
        // }
        // if (searchTerm) {
        //   params.append('name', searchTerm);
        // }

        // // Append parameters to the URL if they exist
        // if (params.toString()) {
        //   apiUrl += `?${params.toString()}`;
        // }

        // // Example: Real fetch call
        // const response = await fetch(apiUrl);

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        // setInterns(data); // Update state with fetched (and backend-filtered) data

        // uncomment nalang ung sa taas para sa db setup
        // --- START OF SIMULATED DATA ---
        // TODO: Database Connection Point 3: Remove this mock data and filtering
        // when you uncomment and use your real backend API.
        const mockInterns = [
          {
            studNo: '111', lastname: 'Dela Cruz', firstname: 'Juan', mi: 'S.', email: 'juan@gmail.com',
            program: 'BSIT', adviser: 'Mr. Dela Cruz', company: 'AAA', supervisor: 'Mrs. Cruz', status: 'Endorsed'
          },
          {
            studNo: '112', lastname: 'Reyes', firstname: 'Maria', mi: 'L.', email: 'maria@example.com',
            program: 'BSBA', adviser: 'Ms. Garcia', company: 'BBB', supervisor: 'Mr. Smith', status: 'Pending'
          },
          {
            studNo: '113', lastname: 'Santos', firstname: 'Pedro', mi: 'A.', email: 'pedro@mail.com',
            program: 'BSIT', adviser: 'Mr. Dela Cruz', company: 'CCC', supervisor: 'Ms. Johnson', status: 'Endorsed'
          },
          {
            studNo: '114', lastname: 'Lim', firstname: 'Chen', mi: 'P.', email: 'chen@domain.com',
            program: 'BEED', adviser: 'Mrs. Tan', company: 'AAA', supervisor: 'Mr. Lee', status: 'Pending'
          },
          {
            studNo: '115', lastname: 'Gonzales', firstname: 'Sofia', mi: 'R.', email: 'sofia@company.org',
            program: 'IND. ENG.', adviser: 'Mr. Ramos', company: 'DDD', supervisor: 'Dr. Kim', status: 'Endorsed'
          },
          {
            studNo: '116', lastname: 'Tan', firstname: 'Michael', mi: 'J.', email: 'michael@email.com',
            program: 'BSIT', adviser: 'Mr. Dela Cruz', company: 'BBB', supervisor: 'Mr. Smith', status: 'Endorsed'
          },
          {
            studNo: '117', lastname: 'Aquino', firstname: 'Sarah', mi: 'K.', email: 'sarah@mail.net',
            program: 'BSBA', adviser: 'Ms. Garcia', company: 'CCC', supervisor: 'Ms. Johnson', status: 'Pending'
          },
        ];
        // hanggang dito irereove kung may db na

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Apply client-side filtering for sample data (REMOVE THIS FOR REAL DB)
        let filteredInterns = mockInterns.filter(intern => {
          // Program Filter
          if (selectedProgram !== 'All' && intern.program !== selectedProgram) {
            return false;
          }
          // Company Filter
          if (selectedCompany !== 'All' && intern.company !== selectedCompany) {
            return false;
          }
          // NEW FILTER: Status Filter
          if (selectedStatus !== 'All' && intern.status !== selectedStatus) {
            return false;
          }
          // Name Search (case-insensitive and partial match)
          if (searchTerm) {
            const fullName = `${intern.firstname} ${intern.lastname}`.toLowerCase();
            if (!fullName.includes(searchTerm.toLowerCase())) {
              return false;
            }
          }
          return true;
        });

        setInterns(filteredInterns); // Update state with filtered sample data
        // --- END OF SIMULATED DATA ---

      } catch (err) {
        console.error("Failed to fetch interns:", err);
        setError("Failed to load interns. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchInterns(); // Call the fetch function
  }, [selectedProgram, selectedCompany, selectedStatus, searchTerm]); // NEW DEPENDENCY: selectedStatus added

  // Handler for program filter change
  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  // Handler for company filter change
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  // NEW HANDLER: For status filter change
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // REMOVED: handlePendingInternsClick function is no longer needed.

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
            {/* Programs Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              value={selectedProgram}
              onChange={handleProgramChange}
            >
              {programOptions.map((program) => (
                <option key={program} value={program}>
                  {program === 'All' ? 'Programs' : program}
                </option>
              ))}
            </select>

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

            {/* NEW FILTER: Status Filter */}
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
                Program
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Adviser
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
                <td colSpan="10" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  Loading interns...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="10" className="px-6 py-4 whitespace-nowrap text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : interns.length === 0 ? (
              <tr>
                <td colSpan="10" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.program}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.adviser}</td>
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

export default InternC;
