import React from 'react'
import Success from './Success'

export default function SuccessOrder() {
    return (
        <>
            <Success
                title="Success"
                to="/"
                message="Your order has been successfully placed, you will be contacted soon!"
                button="Go Home"
            />
        </>
    )
}
