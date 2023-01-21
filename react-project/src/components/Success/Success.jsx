import React from 'react'
import { Link } from 'react-router-dom'
export default function Success(props) {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-100 to-crayola-primary">
            <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">
                <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src="https://www.svgrepo.com/show/422280/correct-success-tick.svg" alt="product designer" />
                <h1 className="text-lg text-gray-700"> {props.title} </h1>
                <p className="text-xs text-gray-400 mt-4"> {props.message} </p>
                <Link to={props.to}><button className="btn-primary my-4"> {props.button}</button></Link>
            </div>
        </div>
    )
}
