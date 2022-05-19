import React from 'react';
import './styles/loading-icon.scss';

const LoadingIcon = ({ color }) => {
    return <div className='loading-icon' style={{ borderColor: color }}></div>;
};

export default LoadingIcon;
