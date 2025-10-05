"use client"
import React from 'react'
import banner1 from "./../../../assets/screens/slider/grocery-banner.png"
import banner2 from "./../../../assets/screens/slider/grocery-banner-2.jpeg"

import slide1 from "./../../../assets/screens/slider/slider-image-1.jpeg"
import slide2 from "./../../../assets/screens/slider/slider-image-2.jpeg"
import slide3 from "./../../../assets/screens/slider/slider-image-3.jpeg"
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const MainSlider = () => {
    return (
        <div className='mb-10 flex'>
            <div className='w-2/3'>
                {/* Add the Autoplay module and configure the autoplay options */}
                <Swiper
                    modules={[Autoplay]} // 3. Install the Autoplay module
                    spaceBetween={0}
                    slidesPerView={1} // Changed to 1 for a more typical main slider view
                    loop={true}       // Added loop for a seamless experience
                    autoplay={{      // 4. Configure autoplay
                        delay: 6000,  // Time between slides in ms
                        disableOnInteraction: false, // Autoplay will not be disabled after user interactions
                    }}
                >
                    <SwiperSlide>
                        <Image className='h-[400px] w-full object-cover' src={slide1} alt='slide1' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image className='h-[400px] w-full object-cover' src={slide2} alt='slide2' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image className='h-[400px] w-full object-cover' src={slide3} alt='slide3' />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='w-1/3'>
                <Image className='h-[200px] w-full object-cover' src={banner1} alt='banner1' />
                <Image className='h-[200px] w-full object-cover' src={banner2} alt='banner2' />
            </div>
        </div>
    )
}

export default MainSlider;