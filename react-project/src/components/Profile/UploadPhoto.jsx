import React from "react"
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Authentication/firebaseConfig";
import LoadButton from "../Buttons/LoadButton";
import { useAuth } from "../../Context/AuthContext";

export default function UploadPhoto({ showUpload }) {
    const [imgUrl, setImgUrl] = useState(null);
    //Loading
    const [isLoading, setIsLoading] = useState(false);
    const [picture, setPicture] = useState(null);
    const [errorMsg, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { currentUser, updatePhoto } = useAuth();
    const onChangePicture = e => {
        setPicture(URL.createObjectURL(e.target.files[0]));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0]
        console.log(e.target[0]?.files[0]);
        if (!file) return;
        const storageRef = ref(storage, `ProfilePhotos/${currentUser.uid + '/' + file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            () => {
                setIsLoading(true);
            },
            () => {
                setErrorMessage("Something went wrong! Try again");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                    updatePhoto(downloadURL);
                    setSuccessMessage("Image Updated Successfully")
                });
                setIsLoading(false);
                // showUpload();
            }
        );
    }
    return (
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
            <div className="flex justify-end cursor-pointer">
                <svg onClick={showUpload} width='28px' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L6 18" stroke="#1c2645" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 6L18 18" stroke="#1c2645" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    </path> </g>
                </svg>
            </div>
            <div className="text-center">
                <h2 className=" text-2xl font-bold text-gray-800">
                    Image Upload
                </h2>
            </div>
            <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                            <div className="h-full w-full text-center flex flex-col justify-center items-center  ">

                                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="alt" />
                                </div>
                                <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <span className="text-blue-600 hover:underline">select a file</span> from your computer</p>
                            </div>
                            <input type="file" className="hidden" onChange={onChangePicture} />
                        </label>
                    </div>
                </div>

                <div>
                    <LoadButton
                        type="submit"
                        title="Upload"
                        isLoading={isLoading}
                    />
                </div>
                {successMessage === '' ? null :
                    <div className='success-primary mb-2'>
                        {successMessage}
                    </div>}
                {errorMsg === '' ? null :
                    <div className='error-primary mb-2'>
                        {errorMsg}
                    </div>}
                {
                    !imgUrl &&
                    <></>
                }
                {
                    imgUrl &&
                    <img src={imgUrl} alt='uploaded file' className="h-10" />
                }
                <img src={picture} alt="file" className={imgUrl?"hidden":"h-10" }/>
            </form>
        </div>
    )
}