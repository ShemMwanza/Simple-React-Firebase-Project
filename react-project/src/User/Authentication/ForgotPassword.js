import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../../components/Inputs/TextInput';
import { auth, sendPasswordReset } from "../../Authentication/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadButton from '../../components/Buttons/LoadButton';

export default function ForgotPassword() {

    //Loading
    const [isLoading, setIsLoading] = useState(true);

    const [errorMsg, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/")
        };
    });

    // Form Submit
    const handleSubmit = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        setIsLoading(true);
        sendPasswordReset(email).then(() => {
            setIsLoading(false);
            setSuccessMessage("Check your email for the link")
        }).catch((error) => {
            console.log(error.code)
            if (error.code === "auth/user-not-found") {
                setIsLoading(false);
                setErrorMessage("User Account Does Not Exist");
            }
            else {
                setIsLoading(false);
                setErrorMessage("Something went wrong! Try again");
            }
        })

        console.log(
            "email", email,
        );
    };

    return (
        <section className="container mx-auto">
            <div className="flex rounded-lg justify-center px-2 md:px-6 py-12">
                <div className="w-full rounded-lg xl:w-3/4 lg:w-11/12 flex">
                    <div className="hidden md:block w-1/2 rounded-lg bg-blue-500 py-10 px-10">
                        <img src="/assets/reset.svg" alt='link' />
                    </div>
                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Password Reset</h3>
                        <form
                            onSubmit={handleSubmit}
                            className="px-8 pt-6 pb-8 mb-4 bg-white rounded">

                            <div className="mb-2">
                                <TextInput
                                    label='Enter your email to receive a reset link'
                                    Name="email"
                                    placeholder='Email'
                                    type="email" />
                            </div>
                            <div className="pt-2 text-center">
                                <LoadButton
                                    type="submit"
                                    title="Send Link"
                                    id="resetbtn"
                                />
                            </div>
                            <div className="text-right">
                                <Link
                                    className="py-4 inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    to="/signin"
                                >
                                    Go Back?
                                </Link>
                            </div>
                            {successMessage === '' ? null :
                                <div className='success-primary mb-2'>
                                    {successMessage}
                                </div>}
                            {errorMsg === '' ? null :
                                <div className='error-primary mb-2'>
                                    {errorMsg}
                                </div>}
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <Link
                                    to='/signup'
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    href="./index.html">
                                    Don't have an account? Sign in!
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}