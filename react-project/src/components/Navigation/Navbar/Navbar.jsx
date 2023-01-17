import React, { useState, useEffect, useRef } from 'react'
import NavHeader from './NavHeader'
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import { ProfileImage } from '../../Profile/ProfilePhoto';
import { useAuth } from '../../../Context/AuthContext';
import CartHome from '../../../Cart/CartHome';
export default function Navbar() {
    const [cart, setCart] = useState(false);
    const showCart = () => setCart(!cart);

    const [menu, setMenu] = useState(false);
    const showMenu = () => setMenu(!menu)

    const [userMenu, setuserMenu] = useState(false);
    const showuserMenu = () => setuserMenu(!userMenu)

    const { currentUser, logout } = useAuth();

    const ref = useRef();

    useEffect(() => {
        const checkClick = e => {
            // Menu will be closed
            if (userMenu && ref.current && !ref.current.contains(e.target)) {
                setMenu(false);
                setuserMenu(false);
                console.log("yesaa")
            }
        }

        document.addEventListener("mousedown", checkClick)

        return () => {
            document.removeEventListener("mousedown", checkClick)
            console.log("yes")
        }
    }, [menu, userMenu])

    useEffect(() => {
        if (cart) { document.body.style.overflow = 'hidden'; }
        else { document.body.style.overflow = 'unset'; }
    }, [cart]);


    const UserButton = () => {

        return (
            <>
                <div className="flex justify-end items-stretch md:order-2">
                    <button
                        onClick={showCart}
                        type="button"
                        className="flex mr-3 text-sm items-center bg-white rounded-full focus:ring-gray-600">
                        <img className="w-9 h-9 rounded-full" src='/assets/cart.svg' alt="cart" />
                    </button>
                    <button
                        onClick={showuserMenu}
                        type="button"
                        className="flex mr-3 text-sm bg-white rounded-full focus:ring-gray-600">
                        <span className="sr-only">Open user menu</span>
                        <ProfileImage className="w-10 h-10 rounded-full" />
                    </button>
                    <MenuButton />
                    {/* dropdown */}
                    <div ref={ref} className={userMenu ? "z-50 my-4 mt-14 absolute border border-green-primary border-opacity-20 text-base list-none divide-y rounded  bg-white shadow-lg divide-gray-800"
                        :
                        "hidden"}
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm font-poppins text-gray-700">{currentUser.displayName}</span>

                            <span className="block text-sm font-poppins font-medium text-gray-700 truncate">{currentUser.email}</span>
                        </div>
                        <ul className="py-1">
                            <li>
                                <Link to="/profile" className="block px-4 py-2 font-poppins text-sm text-gray-700 hover:text-white hover:bg-green-primary">Profile</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-4 py-2 font-poppins text-sm text-gray-700 hover:text-white hover:bg-green-primary">Settings</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-4 py-2 font-poppins text-sm text-gray-700 hover:text-white hover:bg-green-primary">Earnings</Link>
                            </li>
                            <li>
                                <button onClick={logout} className="w-full font-poppins text-start block px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-green-primary">Sign out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
    const NormalButton = () => {
        return (
            <>
                <div className="flex md:order-2">
                    <Link type="button" to='/signin' className="btn-primary">Get started</Link>
                    <MenuButton />
                </div>
            </>
        )
    }
    const MenuButton = () => {
        return (
            <button data-collapse-toggle="navbar-cta"
                type="button"
                onClick={showMenu}
                className="inline-flex items-center p-2 text-sm  rounded-lg md:hidden hover:text-white hover:bg-green-primary focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd">
                    </path>
                </svg>
            </button>
        )
    }
    return (
        <>
            {cart ? <>
                <div className='absolute z-10 h-full w-full'>
                    <div className="h-screen w-full flex flex-row justify-end bg-no-repeat bg-black bg-opacity-50">
                        <CartHome showCart={showCart} />
                    </div>
                </div>
            </> : null}
            <>

                <nav className={`${menu ? "h-54 border-gray-200 px-4 sm:px-4 border py-2.5 shadow-sm shadow-green-primary rounded-b-2xl  bg-white" : "h-54 rounded-b-3xl shadow-md bg-white py-3 px-2"}  transition-all ease-in-out delay-300 duration-700 overflow-hidden w-full`}>

                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <NavHeader />
                        <>
                            {currentUser ? (
                                <UserButton />
                            ) :
                                (
                                    <NormalButton />
                                )}
                        </>
                        <div className={menu ? "items-center justify-between w-full md:flex md:w-auto md:order-1" : "items-center justify-between hidden w-full md:flex md:w-auto md:order-1"} id="navbar-cta">
                            <NavLinks />
                        </div>
                    </div>

                </nav>

            </></>
    )
}
