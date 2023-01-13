import React from 'react'
import FooterBottom from './FooterBottom'
import FooterHeader from './FooterHeader'
import FooterLinks from './FooterLinks'

export const Footer = () => {
    return (
        <footer className="bg-white border divide-y-2">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <FooterHeader />
                    <FooterLinks />
                </div>
            </div>
            <FooterBottom />
        </footer>
    )
}
