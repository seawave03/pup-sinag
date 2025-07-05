import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/LogIn';
import NavigationBtn from './Components/NavigationBtn';
import SignUp from './Components/SignUp';
import AdviserC from './Pages/CoordinatorPages/AdviserC';
import CompaniesC from './Pages/CoordinatorPages/CompaniesC';
import DashboardC from './Pages/CoordinatorPages/DashboardC';
import InternC from './Pages/CoordinatorPages/InternC';
import ProgramsC from './Pages/CoordinatorPages/ProgramsC';
import ReportsC from './Pages/CoordinatorPages/ReportsC';
import DashboardLayout from './Pages/layout/dashboard';
import Layout from './Pages/layout/layout';
import NoPageFound from './Pages/NoPageFound';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<NoPageFound />} />

        <Route path='/pup-sinag' element={<Layout />}>
          <Route index element={<NavigationBtn />} />
          <Route path='login/:role' element={<Login />} />
          <Route path='sign-up/:role' element={<SignUp />} />

          {/* Coordinator */}

          <Route path='coordinator' element={<DashboardLayout />}>
            <Route index path='dashboard' element={<DashboardC />} />
            <Route path='adviser' element={<AdviserC />} />
            <Route path='intern' element={<InternC />} />
            <Route path='companies' element={<CompaniesC />} />
            <Route path='programs' element={<ProgramsC />} />
            <Route path='reports' element={<ReportsC />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
