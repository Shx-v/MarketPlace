import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext';

const ProtectedAdminRoute = ({ element }) => {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);

  if (isLoggedIn) {
    return isAdmin ? element : <Navigate to="/" />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default ProtectedAdminRoute;
