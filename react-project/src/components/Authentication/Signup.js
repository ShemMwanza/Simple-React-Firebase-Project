import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import LoadButton from '../Buttons/LoadButton';
import EmailInput from '../Inputs/EmailInput';
import PasswordInput from '../Inputs/PasswordInput';
import TextInput from '../Inputs/TextInput';
import { auth, createWithEmailAndPassword, signInWithGoogle } from "../../Authentication/firebaseConfig";
import { EmptyNavbar } from '../Navigation/EmptyNavbar';
import { useAuthState } from "react-firebase-hooks/auth";


export default function Signup() {
    //Loading
    const [isLoading, setIsLoading] = useState(true);
    //Error Message
    const [errorMsg, setErrorMessage] = useState("");

    // Form Submit
    const handleSubmit = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const c_password = e.target.cpassword.value;
        const fname = e.target.fname.value;
        const lname = e.target.lname.value;
        const displayName = fname + ' ' + lname;
        if (password !== c_password) {
            setErrorMessage('Passwords Do Not Match!');
        }
        else{
        setIsLoading(true);
            createWithEmailAndPassword(displayName, email, password).then(() => {
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
    };
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {

        if (user){ 
            navigate("/")
        };
    });
    return (

        <section className="container mx-auto">
            <EmptyNavbar to='/signin' text='Go to Sign In' />
            <div className="flex rounded-lg justify-center px-6 py-2">
                <div className="w-full rounded-lg xl:w-3/4 lg:w-11/12 flex">
                    <div className="hidden md:block w-1/2 rounded-lg bg-green-primary py-10 px-10">
                        <img src="/assets/authAsset.svg" className='h-full' alt='link' />
                    </div>
                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                        <form
                            onSubmit={handleSubmit}
                            className="px-8 pt-6 pb-2 mb-2 bg-white rounded">
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <TextInput
                                        label="First Name"
                                        id="fname"
                                        placeholder="First Name"
                                        Name="fname" 
                                        type="text"/>
                                </div>
                                <div className="md:ml-2">
                                    <TextInput
                                        label="Last Name"
                                        id="lname"
                                        placeholder="Last Name"
                                        Name="lname"
                                        type='text' />
                                </div>
                            </div>
                            <div className="mb-2">
                                <EmailInput
                                    label="Email"
                                    id="email"
                                    placeholder="Email"
                                    Name="email"
                                />

                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <PasswordInput
                                        label='Password'
                                        id='password'
                                        Name='password'
                                        placeholder='*********' />
                                </div>
                                <div className="md:ml-2">

                                    <TextInput
                                    label='Confirm Password'
                                     Name="cpassword" 
                                     placeholder='*********' 
                                     type="password"/> 
                                </div>
                            </div>
                            {errorMsg === '' ? null :
                                <div className='error-primary mb-2'>
                                    {errorMsg}
                                </div>}
                            <div className="mb-6 text-center">
                                <LoadButton
                                    type="submit"
                                    title="Register"
                                    id="registerbtn"
                                />
                            </div>
                            <div className="my-6">
                                <button
                                    onClick={signInWithGoogle}
                                 className="flex w-full justify-evenly rounded-md border-none ring-1 ring-gray-200 shadow-md bg-white py-2 text-black hover:bg-gray-200 "><img src="https://freesvg.org/img/1534129544.png" className="mr-2 w-6 object-fill" alt='link' />Sign up with Google</button>
                            </div>
                            <hr className="mb-6 border-t" />

                            <div className="text-center">
                                <Link
                                    to='/signin'
                                    className="inline-block text-sm text-green-light align-baseline hover:text-green-primary"
                                    href="./index.html"
                                >
                                    Already have an account? Login!
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}