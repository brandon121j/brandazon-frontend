import { useState, useEffect } from 'react';
import { isEmail } from 'validator';

function EmailHooks() {
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');
    const [className, setClassName] = useState('form-control');
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onBlur) {
            if (email.length === 0) {
                setErr('Email cannot be empty');
                setClassName('form-control is-invalid');
            } else if (!isEmail(email)) {
                setErr('Please enter a valid email');
                setClassName('form-control is-invalid');
            } else {
                setErr('');
                setClassName('form-control is-valid');
            }
        }
    }, [email, onBlur]);

    function handleEmailOnChange(e) {
        setEmail(e.target.value)
    }

    return [email, handleEmailOnChange, err, setOnBlur, className]
}

export default EmailHooks;