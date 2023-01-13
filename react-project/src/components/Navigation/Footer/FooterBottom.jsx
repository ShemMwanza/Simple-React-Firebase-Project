import React from 'react'

export default function FooterBottom() {
    const year = new Date();
    const newYear = year.getFullYear(); 
    return (
        <>
            <div className='border py-4 divide-y-2 bottom-0 w-full text-center'>
                <p className="text-sm text-gray-800">
                    © {newYear} Project
                </p>
            </div>
        </>
    )
}
