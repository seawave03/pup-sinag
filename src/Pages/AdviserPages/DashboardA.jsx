import React, { useState, useEffect, useRef } from 'react';

// StatusDropdown Component
// This sub-component handles the rendering and logic for each status dropdown.
const StatusDropdown = ({ intern, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper function to determine button styling based on status
  const getStatusButtonClass = (status) => {
    switch (status) {
      case 'Qualified':
        return 'bg-green-500 hover:bg-green-600';
      case 'Declined':
        return 'bg-red-500 hover:bg-red-600';
      case 'Awaiting Review':
      default:
        return 'bg-yellow-500 hover:bg-yellow-600';
    }
  };

  // Helper function to get the icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Qualified':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 ml-1">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        );
      case 'Declined':
      case 'Awaiting Review':
      default: // Default to down arrow for any clickable status
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 ml-1">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const handleOptionClick = (newStatus) => {
    onStatusChange(intern.studNo, newStatus);
    setIsOpen(false); // Close dropdown after selection
  };

  // Removed 'Submitted' from menuOptions
  const menuOptions = ['Awaiting Review', 'Qualified', 'Declined'];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className={`inline-flex justify-center items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${getStatusButtonClass(intern.status)}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{intern.status}</span>
        {getStatusIcon(intern.status)}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {menuOptions.map(option => (
              <a
                key={option}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={(e) => { e.preventDefault(); handleOptionClick(option); }}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const DashboardA = () => {
  // State to store the list of interns and their documents
  const [interns, setInterns] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);
  // State for search term (can be expanded if needed)
  const [searchTerm, setSearchTerm] = useState('');

  // Handler for the Status button click (now called from StatusDropdown)
  const handleStatusChange = (studentNo, newStatus) => {
    console.log(`Attempting to set status for Student No: ${studentNo} to: ${newStatus}`);

    // TODO: Database Integration Point for Status Update:
    // Make an API call to update the intern's status on the backend.
    /*
    const updateStatusOnBackend = async () => {
      try {
        const response = await fetch(`/api/interns/${studentNo}/status`, {
          method: 'PUT', // Or 'PATCH'
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Include if your API requires token
          },
          body: JSON.stringify({ status: newStatus }) // Send the new status to backend
        });

        if (!response.ok) {
          throw new Error(`Failed to update intern status: ${response.status}`);
        }

        // If status is 'Qualified', remove from the list
        if (newStatus === 'Qualified') {
          setInterns(prevInterns => prevInterns.filter(intern => intern.studNo !== studentNo));
          alert(`Status for Intern ${studentNo} updated to ${newStatus} and removed from list.`);
        } else {
          // Otherwise (Awaiting Review, Declined), just update the status in the list
          setInterns(prevInterns => prevInterns.map(intern =>
            intern.studNo === studentNo ? { ...intern, status: newStatus } : intern
          ));
          alert(`Status for Intern ${studentNo} updated to ${newStatus}.`);
        }
      } catch (err) {
        console.error("Error updating status:", err);
        alert(`Failed to update status for ${studentNo}. Please try again.`);
      }
    };
    updateStatusOnBackend();
    */

    // --- START OF CLIENT-SIDE STATUS UPDATE/REMOVAL FOR MOCK DATA (REMOVE THIS FOR REAL DB) ---
    if (newStatus === 'Qualified') {
      setInterns(prevInterns => prevInterns.filter(intern => intern.studNo !== studentNo));
      alert(`Status for Intern ${studentNo} updated to ${newStatus} and removed from list (mock action).`);
    } else {
      setInterns(prevInterns =>
        prevInterns.map(intern =>
          intern.studNo === studentNo ? { ...intern, status: newStatus } : intern
        )
      );
      alert(`Status for Intern ${studentNo} updated to ${newStatus} (mock action).`);
    }
    // --- END OF CLIENT-SIDE STATUS UPDATE/REMOVAL FOR MOCK DATA ---
  };

  // Handler for document link clicks (e.g., to view PDF)
  const handleDocumentClick = (docType, studentNo) => {
    console.log(`Viewing ${docType} for Student No: ${studentNo}`);
    // In a real application, you might open the PDF in a new tab
    // or trigger a modal to view the document content.
    alert(`Opening ${docType} document for ${studentNo}.`);
  };

  // useEffect to fetch interns data
  // This will re-run when the search term changes
  useEffect(() => {
    const fetchInternsDocuments = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(null);   // Clear any previous errors

      try {
        // --- DATABASE INTEGRATION POINT: Main Data Fetching Logic ---
        // When connecting to a database:
        // 1. Uncomment the `fetch` API call below.
        // 2. Remove the `mockInterns` data and the client-side filtering logic.
        // 3. Ensure your backend API '/api/intern-documents' handles:
        //    a. Authentication (checking the adviser's login token).
        //    b. Automatically filtering interns based on the *logged-in adviser's program*.
        //    c. Applying `name` search filter received from the frontend.
        // 4. Remember to send an Authorization header with a token if your API is secured.

        /*
        // Example API call:
        let apiUrl = '/api/intern-documents'; // Your actual API endpoint for intern documents

        const params = new URLSearchParams();
        // Assuming your backend will automatically filter by adviser's program
        if (searchTerm) {
          params.append('name', searchTerm); // Pass search term to backend
        }
        if (params.toString()) {
          apiUrl += `?${params.toString()}`;
        }

        const response = await fetch(apiUrl, {
          // headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } // Include if your API requires token
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInterns(data); // Update state with fetched data
        */

        // --- START OF SIMULATED DATA & CLIENT-SIDE FILTERING (REMOVE THIS ENTIRE BLOCK FOR REAL DB) ---
        // Mock data with initial statuses
        const mockInterns = [
          {
            studNo: '111', lastname: 'Dela Cruz', firstname: 'Juan', mi: 'S.',
            goodMoral: '/docs/juan_good_moral.pdf', cor: '/docs/juan_cor.pdf',
            medicalClearance: '/docs/juan_medical.pdf', insurance: '/docs/juan_insurance.pdf',
            resume: '/docs/juan_resume.pdf', status: 'Awaiting Review'
          },
          {
            studNo: '112', lastname: 'Reyes', firstname: 'Maria', mi: 'L.',
            goodMoral: '/docs/maria_good_moral.pdf', cor: '/docs/maria_cor.pdf',
            medicalClearance: '/docs/maria_medical.pdf', insurance: '/docs/maria_insurance.pdf',
            resume: '/docs/maria_resume.pdf', status: 'Awaiting Review'
          },
          {
            studNo: '113', lastname: 'Santos', firstname: 'Pedro', mi: 'A.',
            goodMoral: '/docs/pedro_good_moral.pdf', cor: '/docs/pedro_cor.pdf',
            medicalClearance: '/docs/pedro_medical.pdf', insurance: '/docs/pedro_insurance.pdf',
            resume: '/docs/pedro_resume.pdf', status: 'Qualified'
          },
          {
            studNo: '114', lastname: 'Lim', firstname: 'Chen', mi: 'P.',
            goodMoral: '/docs/chen_good_moral.pdf', cor: '/docs/chen_cor.pdf',
            medicalClearance: '/docs/chen_medical.pdf', insurance: '/docs/chen_insurance.pdf',
            resume: '/docs/chen_resume.pdf', status: 'Declined'
          },
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Apply client-side filtering for sample data (REMOVE THIS FOR REAL DB)
        let filteredInterns = mockInterns.filter(intern => {
          if (searchTerm) {
            const fullName = `${intern.firstname} ${intern.lastname}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
          }
          return true;
        });

        setInterns(filteredInterns); // Update state with filtered sample data
        // --- END OF SIMULATED DATA ---

      } catch (err) {
        console.error("Failed to fetch interns' documents:", err);
        setError("Failed to load intern documents. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchInternsDocuments(); // Call the fetch function
  }, [searchTerm]); // Re-run effect when search term changes

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-5 md:p-8 bg-gray-100 min-h-screen">
      {/* Header and Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-8 border border-gray-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Intern Documents</h1>
            <p className="text-gray-600 text-sm">Review intern submission documents</p>
          </div>
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by student name"
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

      {/* Interns Documents Table Container */}
      {/* Removed overflow-hidden from this div to prevent dropdown cut-off */}
      <div className="bg-white rounded-lg shadow-md border border-gray-300">
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
                Good Moral
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                COR
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Medical Clearance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Insurance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Resume
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
                  Loading intern documents...
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
                  No intern documents found matching your criteria.
                </td>
              </tr>
            ) : (
              interns.map((intern) => (
                <tr key={intern.studNo}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.studNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.lastname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.firstname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{intern.mi}</td>
                  {/* Document Columns */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {intern.goodMoral ? (
                      <a href={intern.goodMoral} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        .pdf
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {intern.cor ? (
                      <a href={intern.cor} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        .pdf
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {intern.medicalClearance ? (
                      <a href={intern.medicalClearance} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        .pdf
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {intern.insurance ? (
                      <a href={intern.insurance} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        .pdf
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {intern.resume ? (
                      <a href={intern.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        .pdf
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  {/* Status Column (using the new StatusDropdown component) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <StatusDropdown intern={intern} onStatusChange={handleStatusChange} />
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

export default DashboardA;
