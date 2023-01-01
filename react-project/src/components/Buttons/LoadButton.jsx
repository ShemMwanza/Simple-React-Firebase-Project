import React, {useState} from 'react'

const LoadButton = (props) => {
    const title = props.title;
    const type = props.type;
    const id = props.id;
    //Loading
    const isLoading= useState(false);
    return (
        <>

            {isLoading ? (<button
                className="btn-primary"
                type={type}
                id={id}
                >
                {title}
            </button>) : (<button
                className="btn-primary"
                type="button"
                name="register button"
                id="submit_reg"
                disabled
            >
                <img alt="Loading..." src="/assets/load.svg" />
            </button>)}
           
        </>
    )
}
export default LoadButton;
