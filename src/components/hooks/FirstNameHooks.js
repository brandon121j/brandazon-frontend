import { useState, useEffect } from 'react';
import { isAlpha } from 'validator';

function FirstNameHooks() {
    const [first, setFirst] = useState('');
    const [err, setErr] = useState('');
    const [className, setClassName] = useState('form-control');
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onBlur) {
            if (first.length === 0) {
                setClassName('form-control is-invalid');
                setErr('First name cannot be empty');
            } else if (!isAlpha(first)) {
                setErr('Cannot have special characters or numbers');
                setClassName('form-control is-invalid');
            } else {
                setErr('');
                setClassName('form-control is-valid');
            }
        }

	}, [first, onBlur]);

	function handleFirstNameOnChange(e) {
		setFirst(e.target.value);
	}

	return [first, handleFirstNameOnChange, err, setOnBlur, className];
}

export default FirstNameHooks;