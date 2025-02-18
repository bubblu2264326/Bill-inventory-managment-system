import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/authStore';

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export default function RequireAuth({ children, requiredRole }: RequireAuthProps) {
  const { session, hasPermission } = useAuthStore();

  if (!session) {
    return <Navigate to="/signin" />;
  }

  if (requiredRole && !hasPermission(requiredRole)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}