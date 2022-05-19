import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../App';
import LoadingIcon from './LoadingIcon';

const ProtectedRoute = ({ children }) => {
    const { loggedInUser, loadingUser } = useContext(UserContext);

    if (loadingUser) {
        return <LoadingIcon />;
    } else if (!loggedInUser) {
        return <Navigate to='/' />;
    } else {
        return children ? children : <Outlet />;
    }
};

export default ProtectedRoute;
