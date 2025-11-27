import React, { useEffect, useState } from 'react';

const Parcel = () => {
    const [parcel,setParcel]=useState([])
    useEffect(() => {
        fetch('http://localhost:5000/home/data/parcel')
            .then(result => result.json())
            .then(data => {
           setParcel(data)

        })


    },[])
    return (
      <div>
        <div className=" border border-dashed  bg-gray-600 md:mb-20 md:mt-10"></div>
        {parcel.map((item) => (
          <div key={item._id} className="flex justify-between items-center gap-10 bg-[#FFFFFF] p-8 mt-3 rounded-3xl">
            <div className="flex  gap-10">
              <figure>
                <img src={item.image} alt="" className="text-white" />
              </figure>
              <div className=" border border-dashed  bg-gray-600"></div>
            </div>

            <div className="">
              <h1 className="text-secondary text-2xl font-bold">
                {item.title}
              </h1>
              <p className="text-wrap  text-primary">{item.description}</p>
            </div>
          </div>
        ))}
        <div className=" border border-dashed  bg-gray-600 md:mt-20"></div>
      </div>
    )
};

export default Parcel;