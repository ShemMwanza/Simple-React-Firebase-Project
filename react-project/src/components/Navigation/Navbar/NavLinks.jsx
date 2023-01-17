import React from 'react'
import { Link } from 'react-router-dom';

export default function NavLinks() {
  return (
    <>
    
          <ul className="flex flex-col p-4 mt-4 border border-green-primary border-opacity-30 rounded-lg bg-white bg-opacity-10 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
              <li>
                  <Link to="/" className="block py-2 pl-3 pr-4 font-poppins text-gray-700 rounded hover:text-white hover:bg-green-primary md:hover:bg-transparent md:hover:text-green-primary md:p-0" aria-current="page">Home</Link>
              </li>
              <li>
                  <Link to="/" className="block py-2 pl-3 pr-4 font-poppins text-gray-700 rounded hover:text-white hover:bg-green-primary md:hover:bg-transparent md:hover:text-green-primary md:p-0">About</Link>
              </li>
              <li>
                  <Link to="/" className="block py-2 pl-3 pr-4 font-poppins text-gray-700 rounded hover:text-white hover:bg-green-primary md:hover:bg-transparent md:hover:text-green-primary md:p-0">Offers</Link>
              </li>
              <li>
                  <Link to="/" className="block py-2 pl-3 pr-4 font-poppins text-gray-700 rounded hover:text-white hover:bg-green-primary md:hover:bg-transparent md:hover:text-green-primary md:p-0">Latest</Link>
              </li>
              <li>
                  <Link to="/" className="block py-2 pl-3 pr-4 font-poppins text-gray-700 rounded hover:text-white hover:bg-green-primary md:hover:bg-transparent md:hover:text-green-primary md:p-0">Contact</Link>
              </li>
          </ul>
    </>
  )
}
