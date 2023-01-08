import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DefaultPasswordInput from '../../components/Inputs/DefaultPasswordInput';
import TextInput from '../../components/Inputs/TextInput';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../Authentication/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadButton from '../../components/Buttons/LoadButton';
import { EmptyNavbar } from '../../components/Navigation/EmptyNavbar';

export default function Signin() {

    //Loading
    const [isLoading, setIsLoading] = useState(false);
    // Error State
    const [errorMsg, setErrorMessage] = useState("");

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    });

    // Form Submit
    const handleSubmit = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setIsLoading(true);
        logInWithEmailAndPassword(email, password).then(() => {
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
    };

    return (
        <section className="container mx-auto">
            <EmptyNavbar to='/signup' text='Go to Sign up' />
            <div className="flex rounded-lg justify-center px-2 md:px-6 py-12">
                <div className="w-full rounded-lg xl:w-3/4 lg:w-11/12 flex">
                    <div className="hidden lg:flex lg:justify-center w-1/2 rounded-lg bg-green-primary py-10 px-10">
                        <img src="/assets/authAsset.svg" alt='link' />
                    </div>
                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Login</h3>
                        <form
                            onSubmit={handleSubmit}
                            className="px-8 pt-4 pb-8 mb-4 bg-white rounded">

                            <div className="mb-2">
                                <TextInput
                                    label='Email'
                                    Name="email"
                                    placeholder='Email'
                                    type="email" />
                            </div>
                            <div className="mb-4 md:mr-1 md:mb-0">
                                <DefaultPasswordInput
                                    label='Password'
                                    id='password'
                                    Name='password'
                                    placeholder='*********' />

                            </div>
                            {errorMsg === '' ? null :
                                <div className='error-primary mb-2'>
                                    {errorMsg}
                                </div>}
                            <div className="mb-2 text-center">
                                <LoadButton
                                    type="submit"
                                    title="Login"
                                    id="loginbtn"
                                    isLoading={isLoading}
                                />
                            </div>
                            <div className="text-right">
                                <Link
                                    className="inline-block text-sm text-green-light align-baseline hover:text-green-primary"
                                    to="/forgotpassword"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <div className="my-6">
                                <button
                                    className="flex w-full justify-evenly rounded-md border-none ring-1 ring-gray-200 shadow-md bg-white py-2 text-black hover:bg-gray-200 "
                                    onClick={signInWithGoogle}
                                    type="button">
                                    <img src="https://freesvg.org/img/1534129544.png"
                                        className="mr-2 w-6 object-fill"
                                        alt='link' />
                                    Sign in with Google
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <Link
                                    to='/signup'
                                    className="inline-block text-sm text-green-light align-baseline hover:text-green-primary"
                                    href="./index.html">
                                    Don't have an account? Sign up!
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}