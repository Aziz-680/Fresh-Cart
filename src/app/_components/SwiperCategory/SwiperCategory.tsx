"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

const SwiperCategory = ({ categories }) => {
    return (
        <div>
            <Swiper
                modules={[Autoplay]} // 3. Install the Autoplay module
                spaceBetween={0}
                slidesPerView={5} // Changed to 1 for a more typical main slider view
                loop={true}       // Added loop for a seamless experience
                autoplay={{      // 4. Configure autoplay
                    delay: 5000,  // Time between slides in ms
                    disableOnInteraction: false, // Autoplay will not be disabled after user interactions
                }}
            >
                {categories.map( (category , idx) => <SwiperSlide key={idx}>
                    <Image width={500} height={500} src={category.image} alt={category.name} className='h-[300px] object-cover w-full'/>
                    <p className='text-center my-3 text-black'>{category.name}</p>

                </SwiperSlide>

                )}
            </Swiper>

        </div>
    )
}

export default SwiperCategory