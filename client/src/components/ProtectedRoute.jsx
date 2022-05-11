import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../App';

const ProtectedRoute = ({ children }) => {
    const { loggedInUser } = useContext(UserContext);

    if (!loggedInUser) {
        return <Navigate to='/' />;
    } else {
        return <>{children}</>;
    }
};

export default ProtectedRoute;
