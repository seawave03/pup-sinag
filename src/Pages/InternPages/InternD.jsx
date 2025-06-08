import React from 'react';
import { Outlet } from 'react-router-dom';
import InternNav from '../../Components/InternNav';

const InternD = () => (
  <>
    <InternNav />
    <Outlet />
  </>
);

export default InternD;
