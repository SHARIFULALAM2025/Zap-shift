import React, { useEffect, useState } from 'react';
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules';
const Team = () => {

    const [team, setTeam] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/home/team/data")
            .then(result => result.json())
            .then(data => {
            setTeam(data)
        })
    },[])
    return (
      <div className="">
        <h1 className="text-center text-3xl font-extrabold text-secondary ">
          We've helped thousands of sales teams
        </h1>
        {team.length > 0 && (
          <Swiper
            loop={true}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay]}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
          >
            {team.map((item) => (
              <SwiperSlide key={item._id} className="mt-20">
                <img
                  src={item.image}
                  alt=""
                  className=" dark:bg-white p-2 rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    )
};

export default Team;