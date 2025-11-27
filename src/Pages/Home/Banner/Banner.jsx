import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Authentication/Auth/AuthContext';

const Banner = () => {
    const {theme}=useContext(AuthContext)
    const [work, setWork] = useState([])
    console.log(work);

    useEffect(() => {
        fetch('http://localhost:5000/home/work/data')
            .then(result => result.json())
            .then(data => {
           setWork(data)
        })
    },[])
    return (
      <div className={`space-y-8 `}>
        <h1 className="text-3xl font-bold text-black dark:text-white ">How it Works</h1>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          {work.map((item) => (
            <div
              className="bg-[#FFFFFF] p-8 rounded-3xl space-y-4"
              key={item._id}
            >
              <figure>
                <img src={item.image} alt="" className="" />
              </figure>
              <h1 className="text-xl font-semibold text-secondary">
                {item.title}
              </h1>
              <p className="text-primary">{item.discription}</p>
            </div>
          ))}
        </div>
      </div>
    )
};

export default Banner;