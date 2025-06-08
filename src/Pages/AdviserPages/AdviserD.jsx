import React from 'react';
import { Outlet } from 'react-router-dom';
import AdviserNav from '../../Components/AdviserNav';

const AdviserD = () => (
  <>
    <AdviserNav />
    <Outlet />
  </>
);

export default AdviserD;
