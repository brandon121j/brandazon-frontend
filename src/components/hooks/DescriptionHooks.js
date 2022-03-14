import { useState, useEffect } from 'react';
import { isEmpty } from 'validator';

function DescriptionHooks() {
    const [desc, setDesc] = useState('');
    const [error, setError] = useState('');
    const [className, setClassName] = useState('form-control');
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onBlur) {
            if (isEmpty(desc)) {
                setError('Description is required');
                setClassName('form-control is-invalid');
            } else {
                setError('');
                setClassName('form-control is-valid');
            }
        }
    }, [desc, onBlur])

    function handleDescChange(e) {
        setDesc(e.target.value)
    }

    return [handleDescChange, desc, error, setOnBlur, className]
}

export default DescriptionHooks;