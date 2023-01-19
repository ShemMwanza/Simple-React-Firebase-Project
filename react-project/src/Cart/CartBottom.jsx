import React from 'react'

export default function CartBottom(props) {
  return (
    <>
        <section className=' w-full py-4 px-4 rounded shadow bg-gray-100'>
          <div className='flex flex-row py-4 w-full justify-between'>
            <h1 className='text-gray-700 text-xl'>Total:</h1>
            <p className='text-green-primary text-2xl'>{props.price}</p>
          </div>
          <div className='w-full py-2'>
            <button className='btn-primary bg-pink-primary'>Proceed to Checkout</button>
          </div>
        </section>
    </>
  )
}
