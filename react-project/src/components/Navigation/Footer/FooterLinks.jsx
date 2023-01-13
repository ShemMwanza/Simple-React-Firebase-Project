import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterLinks() {
    return (
        <>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <p className="font-semibold text-gray-800">
                        Company
                    </p>
                    <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-700">
                        <Link className="hover:opacity-75" to='/'> Home </Link>
                        <Link className="hover:opacity-75" to='/'> About </Link>
                        <Link className="hover:opacity-75" to='/'> Offers </Link>
                        <Link className="hover:opacity-75" to='/'> Categories </Link>
                    </nav>
                </div>
                <div>
                    <p className="font-semibold text-gray-800">
                        Services
                    </p>
                    <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-700">
                        <Link className="hover:opacity-75" to='/'> 1on1 Coaching </Link>
                        <Link className="hover:opacity-75" to='/'> Company Review </Link>
                        <Link className="hover:opacity-75" to='/'> Accounts Review </Link>
                        <Link className="hover:opacity-75" to='/'> HR Consulting </Link>
                        <Link className="hover:opacity-75" to='/'> SEO Optimisation </Link>
                    </nav>
                </div>
                <div>
                    <p className="font-semibold text-gray-800">
                        Help
                    </p>
                    <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-700">
                        <Link className="hover:opacity-75" to='/'> Contact </Link>
                        <Link className="hover:opacity-75" to='/'> FAQs </Link>
                        <Link className="hover:opacity-75" to='/'> Live Chat </Link>
                    </nav>
                </div>
                <div>
                    <p className="font-semibold text-gray-800">
                        Legal
                    </p>
                    <nav className="flex flex-col mt-4 space-y-2 cursor-pointer text-sm text-gray-700">
                        <Link className="hover:opacity-75" to='/'> Privacy Policy </Link>
                        <Link className="hover:opacity-75" to='/'> Terms &amp; Conditions </Link>
                        <Link className="hover:opacity-75" to='/'> Returns Policy </Link>
                        <Link className="hover:opacity-75" to='/'> Accessibility </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}
