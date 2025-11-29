import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router'
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',

})

const useAxios = () => {
  const { user, LogOut } = useContext(AuthContext)
  const navigate=useNavigate()


  useEffect(() => {
    const myInterceptor = axiosSecure.interceptors.request.use((config) => {
      console.log(user.accessToken)
      config.headers.Authorization = `Bearer ${user?.accessToken}`
      return config
    })
    //interceptors
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        console.log(error)
        const statusCode = error.status
        if (statusCode == 401 || statusCode == 403) {
          LogOut().then(() => {
            navigate('/login')
          })
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosSecure.interceptors.request.eject(myInterceptor)
      axiosSecure.interceptors.response.eject(resInterceptor)
    }
  }, [user, LogOut,navigate])

  return axiosSecure
}

export default useAxios
