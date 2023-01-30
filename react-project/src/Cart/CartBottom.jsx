import React from 'react'
import { Link } from 'react-router-dom'

export default function CartBottom(props) {
  return (
    <>
      <section className=' w-full py-4 px-4 rounded shadow bg-gray-100'>
        <div className='w-full py-2'>
          <button onClick={props.toCheckout} className='btn-primary bg-pink-primary'>Proceed to Checkout</button>
        </div>
      </section>
    </>
  )
}
