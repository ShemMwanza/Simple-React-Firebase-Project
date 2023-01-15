import React from 'react'

export default function Loading() {
    return (
        <div class="inset-0 fixed bg-white flex w-full h-full items-center justify-center duration-300 transition-opacity z-60">
            <div class="flex-col">
                <img className='motion-safe:animate-spin-slow  duration-25' alt='load' src='/assets/loading.svg' />
                <div class="mt-3 text-gray-800 font-bold text-sm sm:text-lg">Loading...</div>
            </div>
        </div>
    )
}
