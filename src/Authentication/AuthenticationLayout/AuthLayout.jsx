import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../../Components/Logo/Logo';

const AuthLayout = () => {
    return (
      <div className='max-w-7xl mx-auto'>
        <Logo></Logo>
        <div className="flex items-center ">
          <div className="flex-1">
            {' '}
            <Outlet></Outlet>
          </div>
          <div className="flex-1">
            <figure>
              <img
                src="https://i.ibb.co.com/zTWw6XNk/auth-Image.png"
                alt=""
                className=""
              />
            </figure>
          </div>
        </div>
      </div>
    )
};

export default AuthLayout;