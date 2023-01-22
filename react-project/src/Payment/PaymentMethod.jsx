import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navigation/Navbar/Navbar'
import CashOption from '../components/Payment/CashOption'
import MpesaOption from '../components/Payment/MpesaOption'
import { useAuth } from '../Context/AuthContext'
export default function () {
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const handleMpesa = () => {
        navigate("/mpesa");
    }
    const handleCash = () => {
        navigate("/")
    }
    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);
    return (
        <>
        <Navbar />
            <section className="h-screen bg-orange-primary bg-opacity-5">
                <div className='py-4 mx-8 px-2 border-b-2'>
                        <h1 className='text-4xl font-semibold py-4 text-gray-800 font-poppins'>Payment method</h1>
                        <p >Choose a suitable payment method for your convenience</p>
                    </div>
                <div className='flex items-center md:my-8 justify-center flex-col md:flex-row'>
                    
                    <MpesaOption
                        handleMpesa={handleMpesa} />
                    <CashOption
                        handleCash={handleCash} />
                </div>
            </section>
        </>
    )
}
