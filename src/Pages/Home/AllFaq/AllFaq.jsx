import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa'

const AllFaq = () => {
    return (
      <div className='flex justify-center md:mt-6'>
        <div>
          <button className="px-8 py-4 bg bg-primary rounded-xl text-secondary">
            See More FAQ’s
          </button>
          <button className="-rotate-45">
            <FaArrowCircleRight className="w-6 h-6"></FaArrowCircleRight>
          </button>
        </div>
      </div>
    )
};

export default AllFaq;