import React, { useState, useEffect } from 'react';

const HomeI = () => {
  // --- Placeholder Data (Replace with actual API calls from your database/backend) ---
  const [internData, setInternData] = useState({
    firstName: 'Juan', // Example intern name
    status: 'Documents Pending', // Example status
    profileCompleted: true,
    documentsPending: true,
    awaitingApproval: false,
    internshipOngoing: false,
    documents: [
      { name: 'Medical Certificate', uploaded: false, file: null, remarks: 'Please ensure the certificate is signed by a licensed physician.' },
      { name: 'Resume / CV', uploaded: true, file: 'resume_cv.pdf', remarks: 'Your OJT Coordinator approved your resume.' },
      { name: 'Insurance', uploaded: false, file: null, remarks: 'Kindly upload your insurance policy before the internship start date.' },
      // Add more documents as needed, following the format
    ],
    companyDetails: {
      companyName: 'XYZ Corp',
      supervisor: 'Jane Doe',
      startDate: 'July 1, 2025',
      endDate: 'September 30, 2025',
      hoursRequired: 300,
      currentHours: 150, // Example
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect Hook: Used for fetching initial data from the database/backend
  useEffect(() => {
    const fetchInternDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // --- DATABASE/BACKEND INTERACTION POINT 1: Fetching Data ---
        // Replace this simulated delay with an actual API call to your backend.
        // Your backend would query your database (e.g., MySQL, PostgreSQL, MongoDB)
        // to retrieve the intern's details, status, document list, tasks, messages, etc.
        // Example:
        // const response = await fetch('/api/intern-dashboard-data');
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        // setInternData(data); // Update state with fetched data

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call delay
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch intern data:", err);
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
      }
    };

    fetchInternDashboardData();
  }, []); // Empty dependency array means this runs once on component mount

  // --- Helper to determine status color ---
  const getStatusColor = (status) => {
    switch (status) {
      case 'Profile Completed':
        return 'bg-green-500';
      case 'Documents Pending':
        return 'bg-yellow-500';
      case 'Awaiting Approval':
        return 'bg-red-500';
      case 'Internship Ongoing':
      case 'Completed':
        return 'bg-blue-500'; // Or another color for ongoing/completed
      default:
        return 'bg-gray-500';
    }
  };

  // --- File Upload/View Handlers ---
  const handleFileUpload = async (documentName) => {
    alert(`Upload functionality for "${documentName}" would be triggered here.`);
    // --- DATABASE/BACKEND INTERACTION POINT 2: Uploading Files ---
    // When a file is selected and uploaded, you would send it to your backend.
    // Your backend would then handle storing the file (e.g., in cloud storage like AWS S3,
    // Google Cloud Storage, or a file system) and updating the file's status/metadata
    // in your database (e.g., setting `uploaded: true` and storing the file path/URL).

    // After a successful upload, you'd likely refetch the internData or
    // optimistically update the state to reflect the change.
    // Example:
    // const formData = new FormData();
    // formData.append('document', yourFileObject);
    // formData.append('documentName', documentName);
    // const response = await fetch('/api/upload-document', {
    //   method: 'POST',
    //   body: formData,
    // });
    // if (response.ok) {
    //   // Update UI state to show document as uploaded
    //   // You might want to refetch data: fetchInternDashboardData();
    // }
  };

  const handleFileView = (fileName) => {
    alert(`Viewing file: ${fileName}`);
    // --- DATABASE/BACKEND INTERACTION POINT 3: Viewing Files ---
    // To view a file, you'd typically have a backend endpoint that serves the file
    // based on its path or ID stored in your database.
    // The `fileName` here would likely be a URL or an identifier that your backend can use.
    window.open(`/api/documents/${fileName}`, '_blank'); // Example path to a backend endpoint
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8"> {/* Main container */}

        {/* 1. Welcome Banner */}
        <div className="bg-red-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Welcome back, {internData.firstName}!</h2>
        </div>

        {/* 2. Internship Status Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Internship Status</h3>
          <div className="flex items-center space-x-4">
            {/* Status Indicator */}
            <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getStatusColor(internData.status)}`}>
              {internData.status}
            </span>
            {/* Simple Progress Bar (You can make this more complex) */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`${getStatusColor(internData.status)} h-2.5 rounded-full`}
                style={{ width: internData.status === 'Profile Completed' ? '25%' :
                                internData.status === 'Documents Pending' ? '50%' :
                                internData.status === 'Awaiting Approval' ? '75%' :
                                internData.status === 'Internship Ongoing' || internData.status === 'Completed' ? '100%' : '0%'
                              }}
              ></div>
            </div>
          </div>
          {/* Detailed Status Steps (Optional, but good for clarity) */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className={`p-3 rounded-lg ${internData.profileCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              Profile Completed {internData.profileCompleted ? '✅' : '⚪'}
            </div>
            <div className={`p-3 rounded-lg ${internData.documentsPending ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
              Documents Pending {internData.documentsPending ? '🟡' : '⚪'}
            </div>
            <div className={`p-3 rounded-lg ${internData.awaitingApproval ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
              Awaiting Approval {internData.awaitingApproval ? '🔴' : '⚪'}
            </div>
            <div className={`p-3 rounded-lg ${internData.internshipOngoing ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
              Internship Ongoing {internData.internshipOngoing ? '🟢' : '⚪'}
            </div>
          </div>
        </div>

        {/* 3. Required Documents Checklist */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Required Documents</h3>
          <ul className="space-y-3">
            {internData.documents.map((doc, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {doc.uploaded ? <span className="text-green-600 mr-2">✓</span> : <span className="text-red-600 mr-2">✗</span>}
                    {doc.name}
                  </span>
                  <div className="space-x-2">
                    {doc.uploaded && doc.file && (
                      <button
                        onClick={() => handleFileView(doc.file)}
                        className="text-blue-600 hover:underline text-sm px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        View
                      </button>
                    )}
                    {!doc.uploaded && (
                      <button
                        onClick={() => handleFileUpload(doc.name)}
                        className="bg-red-800 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md shadow transition-colors"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </div>
                {doc.remarks && (
                  <p className="text-sm text-gray-600 mt-2 italic">Remarks: {doc.remarks}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* The "grid grid-cols-1 md:grid-cols-2 gap-8" container is now removed since it only held "Upcoming Deadlines & Tasks" */}

        {/* Internship Details */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Internship Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p><span className="font-medium">Company:</span> {internData.companyDetails.companyName}</p>
              <p><span className="font-medium">Supervisor:</span> {internData.companyDetails.supervisor}</p>
            </div>
            <div>
              <p><span className="font-medium">Start Date:</span> {internData.companyDetails.startDate}</p>
              <p><span className="font-medium">End Date:</span> {internData.companyDetails.endDate}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <p><span className="font-medium">Hours Required:</span> {internData.companyDetails.hoursRequired} hrs</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeI;