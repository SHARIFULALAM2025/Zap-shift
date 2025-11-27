import React, { useEffect, useState } from 'react';

const Service = () => {
    const [service, setService] = useState([]);
    const [color, setColor] = useState(1)
    console.log(color);


    useEffect(() => {
        fetch('http://localhost:5000/home/service/data')
            .then(result => result.json())
            .then(data => {
            setService(data)

        })
    },[])
    return (
      <div className="bg-[#03373D] md:p-24 rounded-4xl md:mt-24">
        <div className="text-center mb-8">
          <h1 className="text-[40px] text-[#FFFFFF] font-bold">Our Services</h1>
          <p className="text-[16px] font-medium text-[#DADADA]">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {service.map((item, index) => (
            <div
              className={`${
                color === index ? 'bg-[#CAEB66]' : 'bg-[#FFFFFF]'
              } text-center rounded-3xl  p-6 space-y-4`}
              key={item._id}
              onClick={() => setColor(index)}
            >
              <figure>
                <img src={item.image} alt="" className="mx-auto" />
              </figure>
              <h1 className="text-2xl font-semibold text-secondary">
                {item.title}
              </h1>
              <p className="text-primary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
};

export default Service;