import React, { useEffect, useState } from 'react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Review = () => {
  const [review, setReview] = useState([])
  console.log(review)

  useEffect(() => {
    fetch('http://localhost:5000/home/review/dataAll')
      .then((result) => result.json())
      .then((data) => {
        setReview(data)
      })
  }, [])
  return (
    <div className="space-y-10 md:mt-24">
      <div className="text-center space-y-10">
        <img
          src="https://i.ibb.co.com/zhHZB8Bf/customer-top.png"
          alt=""
          className="mx-auto"
        />
        <h1 className=" text-4xl font-bold text-secondary">
          What our customers are sayings
        </h1>
        <p className="text-[#606060] font-medium text-xs">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <Swiper
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >
        {review.map(
          (
            {
              user_email,
              userName,

              review,

              user_photoURL,
            },
            index
          ) => (
            <SwiperSlide key={index}>
              <div className="">
                <div className="p-8 bg-[#FFFFFF] rounded-3xl space-y-2 relative ">
                  <h1 className=" text-black">{review}</h1>
                  <div className=" border border-dashed  bg-gray-600"></div>
                  <div className="flex gap-3 items-center space-y-2">
                    <img
                      src={user_photoURL}
                      alt=""
                      className="rounded-full w-12 h-12"
                    />
                    <div className="space-y-2">
                      <h1 className="text-black">{userName}</h1>
                      <h1 className="text-black">{user_email}</h1>
                    </div>
                  </div>
                  <img
                    src="https://i.ibb.co.com/XxbWswLv/review-Quote.png"
                    alt=""
                    className="absolute top-0 left-0 "
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  )
}

export default Review


