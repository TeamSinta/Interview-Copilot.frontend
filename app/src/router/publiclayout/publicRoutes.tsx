// ProtectedRoutes.tsx
import { Outlet } from "react-router-dom";
import { PublicLayout } from "./publicLayout";

export const PublicRoutes: React.FC = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};
