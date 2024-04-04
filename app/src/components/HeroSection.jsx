import React, { useState, useEffect } from "react";
import "../App.css";
export default function HeroSection(prop) {
    const images = prop?.images;
    const totalSlides = images?.length;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % totalSlides);
        }, 2000); // Change slide every 2 seconds (adjust as needed)

        return () => clearInterval(interval);
    }, [currentSlide, totalSlides]);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
    };

    return (
        <div id="default-carousel" className="relative w-[95%] mx-auto mt-10" data-carousel="slide" >
            <div className="relative h-56 overflow-hidden rounded-lg md:h-80 ">
                {images?.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-700 ${currentSlide === index ? "opacity-100" : "opacity-0"
                            }`}
                        data-carousel-item
                    >
                        <img
                            src={image}
                            className="absolute block w-full h-full"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}

            </div>

            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {images?.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-black" : "bg-white"
                            }`}
                        aria-current={currentSlide === index ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                        data-carousel-slide-to={index}
                    ></button>
                ))}
            </div>

            <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={prevSlide}
            >
                <i className="  border-solid border-white border-r-[3px] p-[3px] border-b-[3px] inline-block rotate-[135deg] "></i>
                {/* Previous button */}
            </button>
            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={nextSlide}
            >
                <i className="  border-solid border-white border-r-[3px] p-[3px] border-b-[3px] inline-block rotate-[-45deg] "></i>
                {/* Next button */}
            </button>
        </div>
    );
}
