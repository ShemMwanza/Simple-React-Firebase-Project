import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, updateProfileDetails } from '../../Authentication/firebaseConfig';
import LoadButton from '../Buttons/LoadButton';
import TextInput from '../Inputs/TextInput';
import EmailInput from '../Inputs/EmailInput';

export default function UpdateDetails({ showUpdate }) {
    //Loading
    const [isLoading, setIsLoading] = useState(false);
    // Error State
    const [errorMsg, setErrorMessage] = useState("");

    const [user] = useAuthState(auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const displayName = e.target.displayName.value;

        updateProfileDetails(displayName, email).then(() => {
            setIsLoading(false);
        }).catch((error) => {
            console.log(error.code)
            if (error.code === "auth/user-not-found") {
                setIsLoading(false);
                setErrorMessage("User Account Does Not Exist");
            }
            else {
                setIsLoading(false);
                setErrorMessage("Something went wrong, Try again");
            }
        })

    }
    return (
        <>
            <section className="container mx-auto">
                <div className="flex rounded-lg justify-center px-2 md:px-6 py-12">
                    <div className="w-full rounded-lg xl:w-3/4 lg:w-11/12 flex">
                        <div className="w-full bg-white p-5 rounded-lg">
                            <div className="flex justify-end cursor-pointer">
                                <svg onClick={showUpdate} width='28px' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L6 18" stroke="#1c2645" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 6L18 18" stroke="#1c2645" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    </path> </g>
                                </svg>
                            </div>
                            <h3 className="pt-4 text-2xl text-center">Update Details</h3>
                            <form
                                onSubmit={handleSubmit}
                                className="px-8 pt-4 pb-8 mb-4 bg-white rounded">

                                <div className="mb-2">

                                    <TextInput
                                        label='Full Name'
                                        Name="displayName"
                                        placeholder='Full Name'
                                        type="text" 
                                        defaultValue={user.displayName}
                                    />

                                </div>
                                <div className="mb-4 md:mr-1 md:mb-0">
                                    <EmailInput
                                        label="Email"
                                        id="email"
                                        placeholder="Email"
                                        Name="email"
                                        defaultValue={user.email}
                                    />

                                </div>
                                {errorMsg === '' ? null :
                                    <div className='error-primary mb-2'>
                                        {errorMsg}
                                    </div>}
                                <div className="mb-2 text-center">
                                    <LoadButton
                                        type="submit"
                                        title="Update"
                                        id="updateBtn"
                                        isLoading={isLoading}
                                    />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
