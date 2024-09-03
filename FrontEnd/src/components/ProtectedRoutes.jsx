import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? element : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
