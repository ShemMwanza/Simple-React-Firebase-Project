import React, { useState } from 'react';

const ImageSlider = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        props.img1,
        props.img2,
        props.img3
    ];

    const handlePrevious = () => {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex < 0 ? images.length - 1 : newIndex);
    };

    const handleNext = () => {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex === images.length ? 0 : newIndex);
    };

    return (
        <div className="relative mx-5 w-full md:w-1/2 h-96">
            <img
                className="absolute w-full h-full object-cover"
                src={images[currentIndex]}
                alt="Slider Image"
            />
            <div className='w-full bg-red-500'>
                <button
                    className="absolute left-0 h-full transform bg-opacity-60 -translate-y-1/9 p-2 bg-white hover:text-gray-700 text-black hover:bg-opacity-25"
                    onClick={handlePrevious}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
            </div>
            <div className='w-full bg-red-500'>
                <button
                    className="absolute right-0 h-full transform bg-opacity-60 -translate-y-1/9 p-2 bg-white hover:text-gray-700 text-black hover:bg-opacity-25"
                    onClick={handleNext}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default ImageSlider;
