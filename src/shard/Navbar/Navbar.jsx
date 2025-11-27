import Logo from '../../Components/Logo/Logo'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../Authentication/Auth/AuthContext'
import { FaArrowCircleRight, FaMoon } from 'react-icons/fa'
import { LuSun } from 'react-icons/lu'
import { Link, NavLink, useNavigate } from 'react-router'
const Navbar = () => {
  const navigate = useNavigate()


    const { theme, setTheme, LogOut,user } = useContext(AuthContext)
    useEffect(() => {
      const saveTheme = localStorage.getItem('theme') || 'light'
      setTheme(saveTheme)
      document.documentElement.classList.toggle('dark', saveTheme === 'dark')
    }, [setTheme])

  const handelToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }
  const handelLogOut = () => {
    LogOut()
      .then(() => {

      })
      .catch(() => { })
    navigate('/',{state:true})
  }
    const links = (
      <>
        <li>
          <NavLink>services</NavLink>
        </li>
        <li>
          <NavLink to="/parcel">send a parcel</NavLink>
        </li>
        <li>
          <NavLink to="/Coverage">Coverage</NavLink>
        </li>
        <li>
          <NavLink to="AboutUs">About Us</NavLink>
        </li>
        {/* jodi user thake tahole ai page show korbe */}
        {user && (
          <>
            <li>
              <NavLink to="/dashboard/myParcel">my parcel</NavLink>
            </li>
          </>
        )}
      </>
    )


  return (
    <div>
      <div className="navbar dark:bg-black dark:text-white bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

            <Logo></Logo>

        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end items-center gap-3">
          <button
            className="rounded-full p-2 bg-purple-400 ease-in-out shadow hover:text-purple-400 text-gray-800 transition-all"
            onClick={handelToggle}
          >
            {theme === 'light' ? (
              <FaMoon className="w-5 h-5"></FaMoon>
            ) : (
              <LuSun className="w-5 h-5"></LuSun>
            )}
          </button>
          {/*  */}
          <div className="flex justify-center">
            <Link to="/Rider">
              <button className="btn bg bg-primary rounded-xl text-secondary">
                Be a rider
              </button>
              <button className="-rotate-45">
                <FaArrowCircleRight className="w-6 h-6"></FaArrowCircleRight>
              </button>
            </Link>
          </div>
          {/*  */}
          <div className="">
            {' '}
            {user ? (
              <a onClick={handelLogOut} className="btn">
                Log out
              </a>
            ) : (
              <Link to="/login" className="btn">
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
