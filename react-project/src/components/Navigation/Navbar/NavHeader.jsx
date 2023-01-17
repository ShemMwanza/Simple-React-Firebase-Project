import React from 'react'
import { Link } from 'react-router-dom';

export default function NavHeader() {
  return (
    <>
          <Link to="/" className="flex items-center">
              <img src="/assets/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">Project</span>
          </Link>
    </>
  )
}
