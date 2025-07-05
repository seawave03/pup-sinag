import React from 'react';
import { Outlet } from 'react-router-dom';
import CoordinatorNav from '../../Components/CoordinatorNav';

const DashboardLayout = () => {
  return (
    <>
      <CoordinatorNav />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
