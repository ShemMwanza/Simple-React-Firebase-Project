import React from 'react'
import Navbar from '../components/Navigation/Navbar'

export default function Home() {
  return (
    <>
      <main className='h-full bg-[#FFFDD2]'>
        <Navbar />
        <section className=' h-full relative py-8 px-3.5 lg:px-32 mx-auto'>

          <h1 className='text-center font-medium leading-normal font-poppins text-green-primary text-4xl sm:text-5xl lg:text-6xl py-8'>Lorem ipsum dolor loerm ipsum dolor lorem</h1>
          <p className='text-green-primary sm:text-2xl text-xl py-8 font-poppins text-center'>Take our Personality Test and get a “freakishly accurate” description of who you are and</p>
          <div className='w-full flex justify-center py-8 pb-0'>
            <button className='btn-primary bg-green-primary w-48 rounded'>Let's go</button>
          </div>
          
        </section>
        <img src='/assets/l.png' className='w-full bottom-0 ' />

      </main>
    </>
  )
}
