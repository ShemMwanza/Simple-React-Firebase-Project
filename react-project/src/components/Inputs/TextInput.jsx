import React from 'react'

const TextInput = (props) => {
    const label = props.label;
    const id = props.id;
    const placeholder = props.placeholder;
    const Name = props.Name;
    const type = props.type;
    const defaultValue = props.defaultValue;
    return (
        <>
            <label 
            className="block font-poppins mb-2 text-sm font-bold text-gray-800"
            htmlFor={Name}>
                {label}
            </label>
            <input
                required
                className="input-primary mb-0"
                id={id}
                name={Name}
                defaultValue={defaultValue}
                onChange={event => console.log("value changed!")}
                type={type}
                placeholder={placeholder}
            />
        </>
    );
}
export default TextInput;
