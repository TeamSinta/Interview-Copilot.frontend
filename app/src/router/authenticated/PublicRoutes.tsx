import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import PublicGuard from '../PublicGuard';

interface PublicRoutesProps {
  children: ReactNode;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ children }) => {
  return (
    <PublicGuard>
      <Outlet />
    </PublicGuard>
  );
};

export default PublicRoutes;
