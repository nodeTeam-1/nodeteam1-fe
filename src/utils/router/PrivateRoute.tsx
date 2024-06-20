import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
    const user = true; // 임시로 true
    return user ? <Outlet /> : <Navigate to='user/login' />;
};

export default PrivateRoute;
