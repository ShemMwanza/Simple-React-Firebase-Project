import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
                <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-700">404</p>
                <p className="text-4xl md:text-5xl uppercase lg:text-5xl font-bold tracking-wider text-gray-800 mt-2">You seem to be lost!</p>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 my-12">The page you're looking for isn't available.</p>
                <Link to="/" className="btn-primary flex justify-evenly w-40 text-center items-center transition duration-150" title="Return Home">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                    </svg>
                    <span>Go Back</span>
                </Link>
            </div>
            <div className="w-1/2 lg:h-full flex lg:items-end justify-center p-4">
                <img src='/assets/404.svg'
                    className='animate-pulse' />
            </div>
        </div>
    )
}
