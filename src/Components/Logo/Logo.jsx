import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
      <Link to='/' className="flex items-end">
        <figure>
          <img src="/logo.png" alt="" className="" />
        </figure>
        <h1 className="text-3xl font-extrabold  -ms-2.5">ZapShift</h1>
      </Link>
    )
};

export default Logo;