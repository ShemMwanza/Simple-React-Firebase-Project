import React from 'react'
import ProfileInfo from './ProfileInfo'

export default function ProfileDetails({ showUpdate }) {

    return (
        <>
            <div className="p-4 bg-white rounded-sm shadow-sm">
                <div
                    className="flex items-center justify-center mb-8 font-semibold leading-8 text-gray-900">
                    <span clas="text-green-500 ">
                    </span>
                    <span className="justify-center text-gray-800 text-xl tracking-wide">Profile</span>
                </div>
                <div className="pb-8 text-gray-700">
                   <ProfileInfo showUpdate={showUpdate}/> 
                </div>
                <p className="flex items-center justify-center text-green-500" id="update_success"></p>
            </div>
        </>
    )
}
