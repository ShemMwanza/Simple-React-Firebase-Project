import React, { useState } from 'react'
import { useAuth } from '../../Context/AuthContext';

import LoadButton from '../Buttons/LoadButton';

export default function ProfileInfo({ showUpdate }) {
    const { currentUser,sendPasswordReset } = useAuth();
    //Loading
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Form Submit
    const handleSubmit = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        sendPasswordReset(email).then(() => {
            setIsLoading(false);
            setSuccessMessage("Check your email for the link")
        }).catch((error) => {
            console.log(error.code)
            setIsLoading(false);
            setErrorMessage("Something went wrong! Try again");
        })
    }

    return (
        <>

            <section className="grid pt-6 text-sm md:grid-cols-1">
                <div className="grid grid-cols-2">

                    <div className="px-4 py-4 font-semibold">Full Name:</div>
                    <div className="px-4 py-4">
                        <p className='font-poppins text-center'>{currentUser.displayName}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-4 font-semibold">Email:</div>
                    <div className="px-4 py-4">
                        <p className='font-poppins text-center'>{currentUser.email}</p>
                    </div>
                </div>
                <div className="flex flex-col w-full my-4">
                    <form className='w-full' onSubmit={handleSubmit}>
                        <input className='hidden'
                            name='email'
                            onChange={event => console.log("value changed!")}
                            value={currentUser.email} />
                        <LoadButton
                            type="submit"
                            title="Change Password"
                            id="resetbtn"
                            isLoading={isLoading}
                        />
                    </form>
                </div>
                <button
                    onClick={showUpdate}
                    className='btn-primary bg-white border hover:bg-white hover:shadow-sm hover:shadow-green-primary border-green-primary text-green-primary mb-4'>Change Profile Details</button>

                {successMessage === '' ? null :
                    <div className='success-primary mb-2'>
                        {successMessage}
                    </div>}
                {errorMsg === '' ? null :
                    <div className='error-primary mb-2'>
                        {errorMsg}
                    </div>}

            </section>
        </>
    )
}
// //Fetch Data
// const [fetch, setFetch] = useState([]);

// const FetchData = () => {

//     getDocs(collection(db, "users"))
//         .then((querySnapshot) => {
//             const newdata = querySnapshot.docs
//                 .map((doc) => ({ ...doc.data(), id: doc.id }));
//             setFetch(newdata);
//         })
// }
// useEffect(() => {
//     FetchData();
// }, [])
/* {
                fetch?.map((newdata, i) => ( */