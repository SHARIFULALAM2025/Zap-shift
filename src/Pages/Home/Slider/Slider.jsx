import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
const Slider = () => {
    const [slider, setSlider] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/home/slider/img')
            .then(result => result.json())
            .then(data => {
            setSlider(data)

        })

    },[])
    return (
      <div>
            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>{slider.map((item, index) => <div key={item._id ||index}>
            <figure><img src={item.image} alt="" className="" /></figure>
        </div>)}</Carousel>
      </div>
    )
};

export default Slider;




