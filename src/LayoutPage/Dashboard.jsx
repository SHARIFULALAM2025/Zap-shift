import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import { FaHome } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { GoSidebarCollapse } from 'react-icons/go'
const Dashboard = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open max-w-7xl mx-auto">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <GoSidebarCollapse></GoSidebarCollapse>
            </label>
            <div className="px-4">Navbar Title</div>
          </nav>
          {/* Page content here */}

          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}

              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}

                  <FaHome></FaHome>

                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>
              <li>
                <NavLink to="/dashboard/myParcel">My Parcel</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history">
                  payment history
                </NavLink>
              </li>

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <IoSettings></IoSettings>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
