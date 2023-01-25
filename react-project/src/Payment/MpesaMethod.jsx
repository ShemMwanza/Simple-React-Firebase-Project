import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadButton from '../components/Buttons/LoadButton'
import TextInput from '../components/Inputs/TextInput'
import Navbar from '../components/Navigation/Navbar/Navbar'
import { LipaNaMpesa } from '../Authentication/Mpesa'
import { useAuth } from '../Context/AuthContext'
export default function MpesaMethod() {
    //Loading
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useAuth();
    const [errorMsg, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);
    const handleSubmit = async e => {
        e.preventDefault();
        const phone_number = e.target.phone_number.value;
        console.log(phone_number);
        LipaNaMpesa(phone_number).then(() => {
            setSuccessMessage("Prompt has been sent");
        }).catch(() => {
            setErrorMessage("There was a problem in payment. Try Again");
        });
    }
    return (
        <>
            <Navbar />
            <div className="flex items-center flex-col justify-center h-full my-16">
                <div className="bg-white font-semibold rounded-lg border shadow-lg p-10 w-4/5">
                    <img className="mb-3 w-32 h-32 mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524" alt="product designer" />
                    <p className="text-sm mb-4 text-center text-gray-400 "> Enter your phone number below to receive a prompt </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <TextInput
                                label='Phone Number'
                                Name="phone_number"
                                placeholder='25471234567'
                                type="text" />
                        </div>
                        <LoadButton
                            type="submit"
                            title="Proceed"
                            id="mpesa"
                            isLoading={isLoading}
                        />
                        {successMessage === '' ? null :
                            <div className='success-primary mb-2'>
                                {successMessage}
                            </div>}
                        {errorMsg === '' ? null :
                            <div className='error-primary mb-2'>
                                {errorMsg}
                            </div>}
                    </form>
                </div>
            </div>
        </>
    )
}