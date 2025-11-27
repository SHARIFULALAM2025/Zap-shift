import React from 'react';
import { useNavigate } from 'react-router';

const Error = () => {
    const navigate = useNavigate()
    const handelNavigate = () => {
        navigate("/",{state:true})

    }
    return (
      <div>
        <figure>
          <img
            src="https://i.ibb.co.com/pjwSy6C4/18499954-bubble-gum200-89-1.png"
            alt=""
            className="mx-auto"
          />
        </figure>
        <div className="flex justify-center ">
          <button
            onClick={handelNavigate}
            className="px-6 py-3 bg-primary text-secondary rounded-xl"
          >
            Go Home
          </button>
        </div>
      </div>
    )
};

export default Error;