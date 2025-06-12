"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Slide from "./Slide";

const SliderImage = () => {
    const slides = [
        { id: 1, path: "/8.jpeg", priority: true },
        { id: 2, path: "/6.png", priority: false },
        { id: 3, path: "/9.jpg", priority: false },
    ]

    return (
        <Swiper pagination={{ clickable: true }} loop modules={[Pagination, Autoplay]} autoplay={{ delay: 5000 }} className="!w-full !max-h-[80vh] rounded-3xl">
            {slides.map(slide => {
                const { id, path, priority } = slide
                return (
                    <SwiperSlide key={id} className="!flex !items-center !justify-center">
                        <Slide path={path} priority={priority} />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );
}

export default SliderImage;