import React from 'react'
import Navbar from '../components/Navigation/Navbar/Navbar'
import CashOption from '../components/Payment/CashOption'
import MpesaOption from '../components/Payment/MpesaOption'

export default function () {
    return (
        <>
            <Navbar />
            <section className="h-screen bg-orange-primary bg-opacity-10">
                <div className='flex items-center justify-center flex-col md:flex-row'>
                    <div className='py-4 px-4 border-b-2'>
                        <h1 className='text-4xl font-semibold py-4 text-gray-800 font-poppins'>Payment method</h1>
                        <p >Choose a suitable payment method for your convenience</p>
                    </div> 
                    <MpesaOption />
                    <CashOption />
                </div>
            </section>
        </>
    )
}
