import { useState, useEffect } from 'react';
import { isAlpha } from 'validator';

function LastNameHooks() {
    const [last, setLast] = useState('');
    const [err, setErr] = useState('');
    const [className, setClassName] = useState('form-control')
    const [onBlur, setOnBlur] = useState(false);
    
    useEffect(() => {
        if (onBlur) {
            if (last.length === 0) {
                setClassName('form-control is-invalid');
                setErr('First name cannot be empty');
            } else if (!isAlpha(last)) {
                setErr('Cannot have special characters or numbers');
                setClassName('form-control is-invalid');
            } else {
                setErr('');
                setClassName('form-control is-valid');
            }
        }
    }, [last, onBlur])

    function handleLastNameOnChange(e) {
        setLast(e.target.value)
    }

    return [last, handleLastNameOnChange, err, setOnBlur, className]
}

export default LastNameHooks;