import React from 'react'
import { useAuth } from '../../Context/AuthContext';

export const ProfileImage = (props) => {
    const { currentUser } = useAuth(); 
    const image = currentUser.photoURL;
    const className = props.className;
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
