import React from 'react'
import NavHeader from './NavHeader'
import { Link } from 'react-router-dom';

export const EmptyNavbar = (props) => {

    const to = props.to;
    const text = props.text;

    return (
        <>

            <nav className="border-gray-200 px-2 sm:px-4 border py-2.5 rounded-b-3xl shadow-md bg-white">
                <div className="md:container md:w-full w-1/2 px-auto flex flex-wrap items-center justify-between mx-auto">
                    <NavHeader />
                    
                    <div className="items-center justify-between w-full md:flex md:w-auto md:order-1">
                        <Link
                            className='btn-primary md:flex hidden'
                            to={to}>{text}</Link>
                    </div>
                </div>
            </nav>

        </>
    )
}
