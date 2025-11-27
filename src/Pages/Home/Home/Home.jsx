import React from 'react';
import Banner from '../Banner/Banner';
import Service from '../Service/Service';
import { useContext } from 'react';
import { AuthContext } from '../../../Authentication/Auth/AuthContext';
import Slider from '../Slider/Slider';
import Team from '../Team/Team';
import Parcel from '../Parcel/Parcel';
import Customer from '../Customer/Customer';
import Review from '../Review/Review';
import AccordionPage from '../Accordion/AccordionPage';
import AllFaq from '../AllFaq/AllFaq';

const Home = () => {
    const {theme}=useContext(AuthContext)
    return (
        <div className={`${theme === 'dark' ? 'bg-black text-white' : "text-black bg-white"} p-2 `}>
            <Slider></Slider>
            <Banner></Banner>
            <Service></Service>
            <Team></Team>
            <Parcel></Parcel>
            <Customer></Customer>
            <Review></Review>
            <AccordionPage></AccordionPage>
            <AllFaq></AllFaq>
        </div>
    );
};

export default Home;