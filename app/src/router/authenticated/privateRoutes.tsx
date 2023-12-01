// ProtectedRoutes.tsx
import { Outlet } from "react-router-dom";
import { AuthGuard } from "../authGuard";

export const ProtectedRoutes: React.FC = () => {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
};
