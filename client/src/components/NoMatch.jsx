import React from 'react';
import { Navigate } from 'react-router-dom';

const NoMatch = () => {
    return <Navigate to='/browse' />;
};

export default NoMatch;
