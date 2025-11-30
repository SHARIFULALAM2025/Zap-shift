import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import useHook from '../Auth/UseHook';
import Forbidden from './Forbidden';

const AdminRoute = ({children}) => {
    const {  loading } = useContext(AuthContext)
    const { role, isLoading } = useHook
    if (loading || isLoading) {
        return (
          <div className="absolute flex justify-center items-center">
            <span className="loading loading-spinner text-error"></span>
          </div>
        )
    }
    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children
};

export default AdminRoute;