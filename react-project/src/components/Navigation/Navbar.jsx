import React, { useState } from 'react'
import NavHeader from './NavHeader'
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks'
import { auth, logout } from "../../Authentication/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const showMenu = () => setMenu(!menu)

    const [userMenu, setuserMenu] = useState(false);
    const showuserMenu = () => setuserMenu(!userMenu)

    const [user] = useAuthState(auth);
    const UserButton = () => {

        return (
            <>
                <div className="flex justify-end items-stretch md:order-2">
                    <button
                        onClick={showuserMenu}
                        type="button"
                        className="flex mr-3 text-sm bg-gray-800 rounded-full focus:ring-gray-600">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-10 h-10 rounded-full" src="https://www.svgrepo.com/show/294228/password-forgot.svg" alt="Reset" />
                    </button>
                    <MenuButton />
                    {/* dropdown */}
                    <div className={userMenu ? "z-50 my-4 mt-14 absolute text-base list-none divide-y rounded shadow bg-gray-700 divide-gray-600"
                        :
                        "z-50 hidden my-4 text-base list-none rounded shadow bg-gray-700 divide-gray-600"}
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">{user.displayName}</span>
                            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                        </div>
                        <ul className="py-1" aria-labelledby="user-menu-button">
                            <li>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</Link>
                            </li>
                            <li>
                                <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
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
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd">
                    </path>
                </svg>
            </button>
        )
    }
    return (
        <>

            <nav className="border-gray-200 px-2 sm:px-4 border py-2.5 rounded-b-3xl shadow-md bg-white">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <NavHeader />
                    <>
                        {user ? (
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

        </>
    )
}
