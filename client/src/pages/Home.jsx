import React from 'react';
import Hero from '../components/Hero';
import FeaturedDestination from '../components/FeaturedDestination';
import Testimonial from '../components/Testimonial';
import RecommendedHotels from '../components/RecommendedHotels';

const Home = () => {
    return (
        <>
            <Hero />
            <RecommendedHotels />
            <FeaturedDestination />
            <Testimonial />
        </>
    )
}

export default Home
