import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import EmailInput from '../Inputs/EmailInput'
import TextInput from '../Inputs/TextInput'


export default function CheckoutUserInfo() {
    const {currentUser} = useAuth();
  return (
      <div className='w-full md:w-3/5 bg-white shadow-xl border rounded h-auto my-4 md:my-0 px-4 py-6'>

          <div className='w-full py-4 border-b-2 '>
              <h1 className='text-3xl divide-x-2 text-gray-700 font-semibold font-poppins'>Checkout</h1>
          </div>
          <h2 className='text-xl py-4 text-gray-800 font-semibold'>1. User Information</h2>

          <></>
          <div className="mb-2">

              <TextInput
                  label='Full Name'
                  Name="displayName"
                  placeholder='Full Name'
                  type="text"
                  defaultValue={currentUser.displayName}
              />

          </div>
          <div className="mb-4 md:mr-1 md:mb-0">
              <EmailInput
                  label="Email"
                  id="email"
                  placeholder="Email"
                  Name="email"
                  defaultValue={currentUser.email}
              />
          </div>
          <div className="mb-2">

              <TextInput
                  label='Phone Number'
                  Name="phoneNumber"
                  placeholder='Phone Number'
                  type="text"
                  
              />

          </div>
          <div className="mb-2">

              <TextInput
                  label='Delivery Location'
                  Name="location"
                  placeholder='Delivery Location'
                  type="text"
              />
              <p className='text-gray-800 text-xs'>*Please be specific</p>

          </div>
          <button
            type='submit'
              className='btn-primary'>
              Proceed to Payment
          </button>

      </div>
  )
}
