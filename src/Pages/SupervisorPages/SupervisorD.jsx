import React from 'react';
import { Outlet } from 'react-router-dom';
import SupervisorNav from '../../Components/SupervisorNav';

const SupervisorD = () => (
  <>
    <SupervisorNav />
    <Outlet />
  </>
);

export default SupervisorD;
