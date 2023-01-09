import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Authentication/firebaseConfig';
import Navbar from '../../components/Navigation/Navbar'
import ProfileDetails from '../../components/Profile/ProfileDetails'
import ProfileHeader from '../../components/Profile/ProfileHeader';
import UpdateDetails from '../../components/Profile/UpdateDetails';
import UploadPhoto from '../../components/Profile/UploadPhoto';


export default function Profile() {
    const [upload, setUpload] = useState(false);
    const showUpload = () => setUpload(!upload);

    const [update, setUpdate] = useState(false);
    const showUpdate = () => setUpdate(!update);

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {

        if (user) {
            navigate("/")
        };
    });

    return (
        <>

            <div className={upload ? "h-screen bg-[#FFA503] bg-opacity-40 relative overflow-y-hidden" :"h-screen bg-[#FFA503] bg-opacity-40 relative"}>
                <>
                    {upload ? (

                        <div className='absolute z-10 h-screen w-full overflow-hidden'>
                            <div className="h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-black bg-opacity-50 relative items-center">
                                <UploadPhoto showUpload={showUpload}/>
                            </div>
                        </div>

                    ) : (
                        null
                    )}
                    {update ? (

                        <div className='absolute z-10 h-screen w-full overflow-hidden'>
                            <div className="h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-20 bg-no-repeat bg-black bg-opacity-50 relative items-center">
                                <UpdateDetails showUpdate={showUpdate} />
                            </div>
                        </div>

                    ) : (
                        null
                    )}
                    <Navbar />
                        <div className="container p-5 px-2 mx-auto">
                            <div className="md:flex no-wrap md:-mx-2 ">
                                <div className="w-full md:w-3/12 md:mx-2">
                                    <ProfileHeader showUpload={showUpload}/>
                                </div>
                                <div className="w-full h-64 md:w-9/12">
                                    <ProfileDetails showUpdate={showUpdate}/>
                                </div>
                            </div>
                        </div>
                </>
            </div>
        </>
    )
}
