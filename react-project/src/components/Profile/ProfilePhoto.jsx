import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Authentication/firebaseConfig';

export const ProfileImage = (props) => {
    const [user] = useAuthState(auth);
    const image = user.photoURL;
    const className =props.className;
    if (image !== null) {
        return (
            <img className={className}
                src={image}
                alt="" />
        )
    }
    else {
        return (
        <img className={className}
            src="/assets/avatar.svg"
            alt="" />
        )
    }

}
