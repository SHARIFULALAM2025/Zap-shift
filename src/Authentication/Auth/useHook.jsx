import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useHook = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxios()
    const {isLoading ,data:role='user'} = useQuery({
        queryKey: ['userRole', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/data/${user.email}/role`)
            return res.data

        },

    })


    return {role,isLoading}
};

export default useHook;