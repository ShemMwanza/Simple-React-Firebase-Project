import React, {useState} from 'react'

const LoadButton = (props) => {
    const title = props.title;
    const type = props.type;
    const id = props.id;

    return (
        <>

            {props.isLoading ? (
                <button
                    className="btn-primary"
                    type="button"
                    name="register button"
                    id="submit_reg"
                    disabled
                >
                    <img alt="Loading..." src="/assets/load.svg" />
                </button>
            ) : (<button
                className="btn-primary"
                type={type}
                id={id}
                >
                {title}
            </button>)}
           
        </>
    )
}
export default LoadButton;
