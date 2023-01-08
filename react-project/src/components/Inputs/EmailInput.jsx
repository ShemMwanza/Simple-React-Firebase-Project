import React, { useState } from 'react'
import validator from 'validator';
const EmailInput = (props) => {

    const label = props.label;
    const id = props.id;
    const placeholder = props.placeholder;
    const Name = props.Name;
    const [errorMessage, setErrMsg] = useState('')

    const validate = (value) => {

        if (!validator.isEmail(value, { 
            allow_display_name: false, require_display_name: false, 
            allow_utf8_local_part: true, require_tld: true, 
            allow_ip_domain: false, domain_specific_validation: false, 
            blacklisted_chars: '', host_blacklist: [], ignore_max_length: true })) {
            setErrMsg('Invalid Email')
        } else {
            setErrMsg('')
        }
    }

    return (
        <>

            <label className="block mb-2 font-poppins text-sm font-bold text-gray-800" 
                htmlFor={Name}>
                {label}
            </label>
            <input
                required
                className={errorMessage === 'Invalid Email' ? "input-error":"input-primary"}
                id={id}
                type="email"
                name={Name}
                placeholder={placeholder}
                onChange={(e) => validate(e.target.value)}
            />
            {errorMessage === '' ? null :
                <div className='error-primary '>
                    {errorMessage}
                </div>}
        </>
    );
}
export default EmailInput;





