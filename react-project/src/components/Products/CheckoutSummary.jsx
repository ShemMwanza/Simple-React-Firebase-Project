import React from 'react'

export default function CheckoutSummary(props) {
    return (
        <div className='w-full md:w-1/3 overflow-hidden relative bg-white shadow-xl border rounded h-2/3 px-8 pt-8'>
            <div className='w-full py-4 border-b-2 '>
                <h1 className='text-xl text-gray-700 font-semibold font-poppins'>Order Summary</h1>
            </div>
            <div className='pt-6 pb-2 flex flex-row w-full justify-between'>
                <p className='text-lg text-gray-500'>Total Items:</p>
                <p className='text-lg text-gray-800'>{props.items}</p>
            </div>
            <div className='py-2 flex flex-row w-full justify-between'>
                <p className='text-lg text-gray-500'>Shipping:</p>
                <p className='text-lg text-gray-800'>Free</p>
            </div>
            <div className='py-2 flex flex-row w-full justify-between'>
                <p className='text-lg text-gray-500'>Sub Total:</p>
                <p className='text-lg text-gray-800'>KES {props.total}</p>
            </div>
            <div className='flex my-20 py-4 w-full border-t-2 justify-between'>
                <p className='text-lg font-poppins font-semibold text-gray-800'>Estimated Total:</p>
                <p className='text-lg font-semibold font-poppins text-gray-800'>KES {props.total}</p>
            </div>
        </div>
    )
}
