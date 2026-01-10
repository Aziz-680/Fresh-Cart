"use client"
import React from 'react'

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
            <div className='w-full'>
                {/* Add the Autoplay module and configure the autoplay options */}
                <Swiper
                    modules={[Autoplay]} // 3. Install the Autoplay module
                    spaceBetween={0}
                    slidesPerView={3} // Changed to 1 for a more typical main slider view
                    loop={true}       // Added loop for a seamless experience
                    speed={5000}
                    autoplay={{      // 4. Configure autoplay
                        delay: 0,  // Time between slides in ms
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false, // Autoplay will not be disabled after user interactions
                    }}
                >
                    <SwiperSlide>
                        <Image width={500} height={500} className='h-[400px] w-full object-cover aspect-2/3' src={slide1} alt='slide1' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image width={500} height={500} className='h-[400px] w-full object-cover aspect-2/3' src={slide2} alt='slide2' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image width={500} height={500} className='h-[400px] w-full object-cover aspect-2/3' src={slide3} alt='slide3' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image width={500} height={500} className='h-[400px] w-full object-cover aspect-2/3' src={slide1} alt='slide1' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image width={500} height={500} className='h-[400px] w-full object-cover aspect-2/3' src={slide2} alt='slide2' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image width={500} height={500} className='h-[400px] w-full object-cover aspect-2/3' src={slide3} alt='slide3' />
                    </SwiperSlide>
                </Swiper>
            </div>
            
        </div>
    )
}

export default MainSlider;