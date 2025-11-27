import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Navigate, useLocation } from 'react-router';

const Private = ({ children }) => {
    const location=useLocation()
    const { user,loading } = useContext(AuthContext)
    if (loading) {
        return <div className="absolute flex justify-center items-center"><span className="loading loading-spinner text-error"></span>
        </div>
    }
    if (!user) {
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }


    return children
};

export default Private;