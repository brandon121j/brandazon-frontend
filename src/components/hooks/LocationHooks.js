import { useState, useEffect } from 'react';
import { isEmpty, isPostalCode } from 'validator';

function LocationHooks() {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [zipError, setZipError] = useState('');
    const [cityClass, setCityClass] = useState('form-control');
    const [stateClass, setStateClass] = useState('form-control');
    const [zipClass, setZipClass] = useState('form-control');
    const [cityBlur, setCityBlur] = useState(false);
    const [stateBlur, setStateBlur] = useState(false);
    const [zipBlur, setZipBlur] = useState(false);

    useEffect(() => {
        if (cityBlur) {
            if (isEmpty(city)) {
            setCityError('*Required');
            setCityClass('form-control is-invalid');
            } else {
                setCityError('');
                setCityClass('form-control is-valid');
            }
        }

        if (stateBlur) {
            if (isEmpty(state)) {
                setStateError('*Required');
                setStateClass('form-control is-invalid');
            } else if (state == '...') {
                setStateError('Select a state');
                setStateClass('form-control is-invalid');
            } else {
                setStateError('');
                setStateClass('form-control is-valid');
            }
        }

        if (zipBlur) {
            if (isEmpty(zip)) {
                setZipError('*Required');
                setZipClass('form-control is-invalid');
            }
            
            else {
                setZipError('');
                setZipClass('form-control is-valid');
            }
        }

    }, [city, state, zip, cityBlur, stateBlur, zipBlur]);

    function handleCityChange(e) {
        setCity(e.target.value)
    }

    function handleStateChange(e) {
        setState(e.target.value)
    }

    function handleZipChange(e) {
        setZip(e.target.value)
    }

    return [
        handleCityChange, 
        handleStateChange, 
        handleZipChange, 
        setCityBlur, 
        setStateBlur, 
        setZipBlur,
        cityError,
        stateError,
        zipError,
        cityClass,
        stateClass,
        zipClass,
        city,
        state,
        zip
    ]
}

export default LocationHooks;