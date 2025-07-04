import React from 'react';
import Header from './Components/Header.jsx';
import NavigationBtn from './Components/NavigationBtn.jsx';
import { Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp.jsx';
import LogIn from './Components/LogIn.jsx';
import ProtectedRoute from './Components/ProtectedRoute';


// Coordinator pages
import DashboardC from './Pages/CoordinatorPages/DashboardC.jsx';
import AdviserC from './Pages/CoordinatorPages/AdviserC.jsx'
import InternC from './Pages/CoordinatorPages/InternC.jsx';
import CompaniesC from './Pages/CoordinatorPages/CompaniesC.jsx';
import ProgramsC from './Pages/CoordinatorPages/ProgramsC.jsx';
import ReportsC from './Pages/CoordinatorPages/ReportsC.jsx';
import ProfileC from './Pages/CoordinatorPages/ProfileC.jsx'; 

// Placeholder dashboards for other roles (create these components or replace with real ones)
import DashboardA from './Pages/AdviserPages/DashboardA.jsx';
import InternA from './Pages/AdviserPages/InternA';
import AddIntern from './Pages/AdviserPages/AddIntern';
import CompaniesA from './Pages/AdviserPages/CompaniesA.jsx';
import ReportsA from './Pages/AdviserPages/ReportsA';
import ProfileA from './Pages/AdviserPages/ProfileA.jsx'; 

import HomeI from './Pages/InternPages/HomeI.jsx';
import ProfileI from './Pages/InternPages/ProfileI.jsx'; 

import DashboardS from './Pages/SupervisorPages/DashboardS.jsx';
import EvaluationS from './Pages/SupervisorPages/EvaluationS.jsx';
import ProfileS from './Pages/SupervisorPages/ProfileS.jsx'; 

import CoordinatorD from './Pages/CoordinatorPages/CoordinatorD.jsx';
import AdviserD from './Pages/AdviserPages/AdviserD.jsx';
import InternD from './Pages/InternPages/InternD.jsx';
import SupervisorD from './Pages/SupervisorPages/SupervisorD.jsx';


export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="italic text-center mt-15">
                Please click/tap the appropriate link to help you in your navigation of our services
              </h1>
              <NavigationBtn />
            </>
          }
        />

        {/* Unified dynamic login & signup for all roles */}
        <Route path="/login/:role" element={<LogIn />} />

        <Route path="/signup/:role" element={<SignUp />} />

        {/* Coordinator Routes */}
        
<Route path="/coordinator" element={<ProtectedRoute><CoordinatorD /></ProtectedRoute>
}>
  <Route path="dashboard" element={<DashboardC />} />
  <Route path="Adviser" element={<AdviserC />} />
  <Route path="interns" element={<InternC />} />
  <Route path="companies" element={<CompaniesC />} />
  <Route path="programs" element={<ProgramsC />} />
  <Route path="reports" element={<ReportsC />} />
  <Route path="profile" element={<ProfileC />} />
</Route>



// Adviser Routes
<Route path="/adviser" element={<ProtectedRoute ><AdviserD /></ProtectedRoute>
}>
    <Route path="dashboard" element={<DashboardA />} />
    <Route path="interns" element={<InternA />} />
    <Route path="addintern" element={<AddIntern />} />
    <Route path="companies" element={<CompaniesA />} />
    <Route path="reports" element={<ReportsA />} />
    <Route path="profile" element={<ProfileA />} />
</Route>  

// Intern Routes
<Route path="/intern" element={<ProtectedRoute ><InternD /></ProtectedRoute>
  }>
    <Route path="home" element={<HomeI />} />
    <Route path="profile" element={<ProfileI />} />
</Route>

// Supervisor Routes
<Route path="/supervisor" element={<ProtectedRoute ><SupervisorD /></ProtectedRoute>
}>
    <Route path="dashboard" element={<DashboardS />} />
    <Route path="evaluation" element={<EvaluationS />} />
    <Route path="profile" element={<ProfileS />} />
</Route>


      </Routes>
    </div>
  );
}
