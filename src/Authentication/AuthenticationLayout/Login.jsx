import React from 'react'
import { useForm } from 'react-hook-form'
import Register from './Register'
import { useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router'
import Social from './SocialLogin/Social'

const Login = () => {
  const location = useLocation()
  const navigate=useNavigate()
  console.log('location',location);

    const { signInUser } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handelSign = (data) => {
      console.log(data)
      signInUser(data.email, data.password)
          .then(result => {
            console.log(result.user);
            navigate(location?.state || '/')

          })
          .catch(error => {
          console.log(error);

      })
  }
  return (
    <div>
      <h1 className="">login page</h1>
      <form onSubmit={handleSubmit(handelSign)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500"> email is required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className="text-red-500"> password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500"> password must be 6 char </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
        <p>new to zap shift <Link
          state={location.state}
          to="/register" className="text-red-600">Register</Link> </p>
          </form>
          <Social></Social>
    </div>
  )
}

export default Login
