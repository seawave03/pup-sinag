import React from 'react';
import { Outlet } from 'react-router-dom';
import CoordinatorNav from '../../Components/CoordinatorNav';

const CoordinatorD = () => (
  <>
    <CoordinatorNav />
    <Outlet />
  </>
);

export default CoordinatorD;
