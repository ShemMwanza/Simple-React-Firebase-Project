import React from 'react'

export default function ProductBox(props) {
    const name = props.name;
    const price = props.price;

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                <img className="object-cover w-full rounded-md h-72 xl:h-80" src="https://images.unsplash.com/photo-1603320409990-02d834987237?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="T-Shirt" />
                <div className="px-2 w-full">
                <h4 className="mt-2 text-lg w-full text-justify font-poppins font-medium text-gray-800 ">{name}</h4>
                <div className='py-2 w-full flex items-center justify-between'>
                    <p className="text-green-primary text-xl">KES {price}</p>

                    <button className="btn-primary w-auto flex items-center text-center bg-crayola-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        <span className="mx-1 text-xs text-center">Add to cart</span>
                    </button></div>
                </div>
            </div>
        </>
    )
}
