import { useState, useEffect } from 'react';
import { isEmpty } from 'validator';

function TitleHooks() {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [className, setClassName] = useState('form-control');
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onBlur) {
            if (isEmpty(title)) {
                setError('Title is required');
                setClassName('form-control is-invalid');
            } else {
                setError('');
                setClassName('form-control is-valid')
            }
        }
    }, [title, onBlur])

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    return [handleTitleChange, title, error, setOnBlur, className]
}

export default TitleHooks;