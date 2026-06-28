import React from 'react';
import '../../assets/style/home.css';

// components
import HeroSlider from '../../components/home/HeroSlider';
import FeaturedTours from '../../components/home/FeaturedTours';
import SpecialOffer from '../../components/home/SpecialOffer';
import HomeVisa from '../../components/home/HomeVisa'; // নতুন ইমপোর্ট
import SpecialVacation from '../../components/home/SpecialVacation';
import ExplorePlaces from '../../components/home/ExplorePlaces';
import DesiredCountry from '../../components/home/DesiredCountry';
import Testimonials from '../../components/home/Testimonials';
import BlogPosts from '../../components/home/BlogPosts';
import Newsletter from '../../components/shared/Newsletter';

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <FeaturedTours />
            <SpecialOffer />
            
            {/* Visa Section Added Here */}
            <HomeVisa /> 

            <SpecialVacation />
            <ExplorePlaces />
            <DesiredCountry />
            {/* <Testimonials /> */}
            <BlogPosts />
            <Newsletter />
        </div>
    );
};

export default Home;