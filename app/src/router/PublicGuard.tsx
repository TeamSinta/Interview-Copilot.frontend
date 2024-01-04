import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface PublicGuardProps {
  children: ReactNode;
}

const PublicGuard: React.FC<PublicGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  useEffect(() => {
    const checkAccessToken = async () => {
      if (accessToken) {
        navigate('/dashboard');
      }
    };

    checkAccessToken();
  }, [accessToken, navigate]);

  return <>{children}</>;
};

export default PublicGuard;
