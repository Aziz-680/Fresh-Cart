"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link'; // 1. Import Link

const SwiperCategory = ({ categories }) => {
    return (
        <div>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={6}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
            >
                {categories.map((category, idx) => (
                    <SwiperSlide key={idx}>
                        {/* 2. Wrap the Image in a Link component */}
                        <Link href={`/categoryProducts?id=${category._id}`}> 
                            <Image 
                                width={500} 
                                height={500} 
                                src={category.image} 
                                alt={category.name} 
                                // 3. Added 'cursor-pointer' so the user knows it's clickable
                                className='h-full aspect-4/3 object-fill cursor-pointer' 
                            />
                        </Link>
                        <p className='text-center my-3 text-black'>{category.name}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SwiperCategory