import { useState, useEffect } from 'react';
import { isEmpty } from 'validator';

function CategoryHooks() {
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [className, setClassName] = useState('form-control')
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onBlur) {
            if (isEmpty(category)) {
                setError('Category is required');
                setClassName('form-control is-invalid');
            } else if (category == 'Select a Category') {
                setError('Category is required');
                setClassName('form-control is-invalid');
                console.log('CATEGORY HOOK WORKING');
            } else {
                setError('');
                setClassName('form-control is-valid');
            }
        }
    }, [category, onBlur])

    function handleCategoryOnChange(e) {
        setCategory(e.target.value);
        
    }

    return [category, handleCategoryOnChange, error, setOnBlur, className]
}

export default CategoryHooks