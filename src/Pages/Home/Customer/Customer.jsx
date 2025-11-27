import React, { useEffect, useState } from 'react';

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  console.log(customer);








    useEffect(() => {
        fetch('http://localhost:5000/customer/info')
            .then(result => result.json())
            .then(data => {
            setCustomer(data)

        })
    },[])
    return (
      <div className="bg-tertiary relative md:mt-20 rounded-4xl">
        {customer.map(({ image, title, description }, index) => (
          <div key={index} className="flex p-20 items-center">
            <div className="space-y-3.5">
              {' '}
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="text-xs">{description}</p>
              <div className="space-x-4">
                <button className="px-8 py-4 bg-primary text-xl font-semibold text-[#1F1F1F] rounded-full">
                  Become a Merchant
                </button>
                <button className="px-8 py-4 border text-xl font-semibold border-[#CAEB66] text-[#CAEB66] rounded-full">
                  Earn with ZapShift Courier
                </button>
              </div>
            </div>

            <div className="">
              <figure>
                <img src={image} alt="" className="" />
              </figure>
            </div>
          </div>
        ))}
        <figure>
          <img
            src="https://i.ibb.co.com/Z6XvxWKr/be-a-merchant-bg.png"
            alt=""
            className="absolute top-0"
          />
        </figure>
      </div>
    )
};

export default Customer;