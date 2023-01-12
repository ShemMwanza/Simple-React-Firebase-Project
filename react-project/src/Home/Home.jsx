import React from 'react'
import { Footer } from '../components/Navigation/Footer/Footer'
import Navbar from '../components/Navigation/Navbar/Navbar'
import ProductBox from '../components/Products/ProductBox'

export default function Home() {
  return (
    <>
      <main className='h-full bg-orange-primary bg-opacity-20'>
        <Navbar />
        <section className=' h-full relative py-8 px-3.5 lg:px-32 mx-auto'>

          <h1 className='text-center font-medium leading-normal font-poppins text-green-primary text-4xl sm:text-5xl lg:text-6xl py-8'>Lorem ipsum dolor loerm ipsum dolor lorem</h1>
          <p className='text-green-primary sm:text-2xl text-xl py-8 font-poppins text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
          </p>
          <div className='w-full flex justify-center py-8 pb-0'>
            <button className='btn-primary bg-green-primary w-48 rounded'>Let's go</button>
          </div>

        </section>


        <section className='w-full bg-white'>
          <img src='/assets/l.svg' alt='home' className='w-full bottom-0 ' />
          <div className='px-4 sm:px-8 md:px-16'>
            <h1 className='text-2xl font-semi-bold text-center py-8 sm:text-4xl font-poppins text-gray-800'>Popular Options</h1>
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <ProductBox name="This is the Name" price="3000" />
              <ProductBox name="This is the Name" price="3000" />
              <ProductBox name="This is the Name" price="3000" />
              <ProductBox name="This is the Name" price="3000" />

            </div>
          </div>
        </section>

        <section className='bg-white w-full py-2 sm:py-6 md:p-10'>
          <div className=' w-full flex bg-orange-primary bg-opacity-25 flex-col sm:flex-row md:py-12 px-6 md:px-24'>
            <div className='w-1/2 '>
              <img src='/assets/homeasset.png' className='h-full' alt="home" />
            </div>
            <div className='w-1/2 flex flex-col'>
              <h2 className="text-xl font-sans font-semibold text-center text-gray-700 sm:text-3xl"> What Happens</h2>
              <p
                className='py-4 text-center  sm:py-6  text-gray-600'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen
                book. It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. 
              </p>
              <div className='flex w-full justify-center'>
              <button className='w-1/4 btn-primary'>Learn More</button></div>
            </div>
          </div>
        </section>

      </main>
      <Footer/>

    </>
  )
}
