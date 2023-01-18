import React from 'react'
import SearchInput from '../Inputs/SearchInput'
export default function ProductsHeader() {
    return (
        <>
            <section className='w-11/12 mx-auto'>
                <SearchInput />
                <div className='w-full border-b py-4 divide-y-2'>
                    <h1 className='text-gray-800 text-2xl md:text-4xl font-poppins'>Products</h1>
                </div>
            </section>
        </>
    )
}
