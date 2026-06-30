import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="container mt-8 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return children ? children : <Outlet />;
};

export default PrivateRoute;
