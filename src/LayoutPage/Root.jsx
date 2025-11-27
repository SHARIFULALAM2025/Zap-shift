import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../shard/Footer/Footer';
import Navbar from '../shard/Navbar/Navbar';

const Root = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
    );
};

export default Root;