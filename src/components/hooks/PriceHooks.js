import { useState, useEffect } from 'react';
import { isEmpty, isInt } from 'validator';

function PriceHooks() {
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [className, setClassName] = useState('form-control');
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onBlur) {
            if (isEmpty(price)) {
                setError('Price is required');
                setClassName('form-control is-invalid');
            } else if (!isInt(price)) {
                setError('Price can only consist of numeric values');
                setClassName('form-control is-invalid');
            } else {
                setError('');
                setClassName('form-control is-valid');
            }
        }
    }, [price, onBlur])

    function handlePriceChange(e) {
        setPrice(e.target.value)
    }

    return [handlePriceChange, price, error, setOnBlur, className]
}

export default PriceHooks;