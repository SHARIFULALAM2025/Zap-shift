import { useForm } from 'react-hook-form'
import { AuthContext } from '../Auth/AuthContext'
import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Social from './SocialLogin/Social'
import axios from 'axios'
import useAxios from '../Auth/useAxios'

const Register = () => {
  const location = useLocation()
  console.log('location in register', location);
  const navigate=useNavigate()
  const axiosSecure=useAxios()
  const { createUser, userProfileImage, setUser } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handelRegister = (data) => {
    console.log(data.photo[0])
    const profileImage = data.photo[0]
    createUser(data.email, data.password).then((result) => {

      const formData = new FormData()
      formData.append('image', profileImage)
      const image_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_imageApi
      }`
      axios.post(image_URL, formData)
        .then((res) => {
          const photoURL = res.data.data.url;
          const userInfo = {
            yourEmail: data.email,
            displayName: data.name,
            photo: photoURL,
          }
          axiosSecure.post('/person', userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log('user created in the database')
            }
          })

        const userProfile = {
          displayName: data.name,
          photoURL: photoURL,
        }
        userProfileImage(userProfile)
          .then(() => {
            setUser({ ...result.user, ...userProfile })
            navigate(location?.state || '/')
          })
          .catch(error => {
            console.log(error);

          })

        })
        .catch(error => {
        console.log(error);

      })
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handelRegister)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input w-full"
            placeholder="your name"
          />
          {errors.name?.type === 'required' && (
            <p className="text-red-600">Name is Required</p>
          )}
          {/* file */}
          <label className="label">photo</label>
          <input
            type="file"
            {...register('photo', { required: true })}
            className="file-input w-full"
            placeholder="your photo"
          />
          {errors.photo?.type === 'required' && (
            <p className="text-red-600">Name is Required</p>
          )}
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-600">Email is Required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className="text-red-600">password is Required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-600">password length must be 6 char</p>
          )}
          {errors.password?.type === 'pattern' && (
            <p className="text-red-600">
              password must have one uppercase one lowercase one number
            </p>
          )}

          <button type="submit" className="btn btn-neutral mt-4">
            Register
          </button>
        </fieldset>
        <p>
          All ready have an account{' '}
          <Link
            state={location.state}
            to="/login" className="text-red-600 font-bold">
            Login
          </Link>
        </p>
      </form>
      <Social></Social>
    </div>
  )
}

export default Register
