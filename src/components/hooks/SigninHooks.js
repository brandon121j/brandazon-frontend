import { useState, useEffect } from 'react'

function SigninHooks() {

    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [onPasswordBlur, setOnPasswordBlur] = useState(false);
    const [onEmailBlur, setOnEmailBlur] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (onPasswordBlur) {
            if (password.length === 0) {
                setPasswordError('Password cannot be empty');
                console.log('PASSWORD ERROR')
            } else {
                setPasswordError('');
            }
        }

        if (onEmailBlur) {
            if (email.length === 0) {
                console.log('EMAIL ERROR')
                setEmailError('Email cannot be empty');
            } else {
                setEmailError('');
            }
        }
    }, [password, email, onPasswordBlur, onEmailBlur])

    function handlePasswordOnChange(e) {
        setPassword(e.target.value);
    }

    function handleEmailOnChange(e) {
        setEmail(e.target.value)
    }

    return [password, email, handlePasswordOnChange, handleEmailOnChange, emailError, passwordError, setOnPasswordBlur, setOnEmailBlur]
}

export default SigninHooks;