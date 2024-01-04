import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicGuard from '../PublicGuard';


const PublicRoutes: React.FC = () => {
  return (
    <PublicGuard>
      <Outlet />
    </PublicGuard>
  );
};

export default PublicRoutes;
