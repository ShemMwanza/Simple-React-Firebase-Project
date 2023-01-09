import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Authentication/firebaseConfig';
import { ProfileImage } from './ProfilePhoto';


export default function ProfileHeader({ showUpload }) {
  const [user] = useAuthState(auth);
  return (
    <>
      <div className="p-4 bg-white border-t-4 border-green-primary">
        <div className="overflow-hidden image">
          <ProfileImage className="w-1/2 h-auto mx-auto" />
        </div>
        <h1 className="my-1 text-xl text-center font-bold leading-8 text-gray-800">{user.displayName}</h1>
        <button onClick={showUpload} className='btn-primary my-4'>Update Photo</button>
      </div>
    </>
  )
}
