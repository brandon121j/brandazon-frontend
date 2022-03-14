import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';

function PasswordHooks() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [err, setErr] = useState('');
    const [confirmErr, setConfirmErr] = useState('');
    const [confirmBlur, setConfirmBlur] = useState(false);
    const [className, setClassName] = useState('form-control');
    const [confirmClass, setConfirmClass] = useState('form-control')
    const [onBlur, setOnBlur] = useState(false);
    const passwordTester = zxcvbn(password);

    useEffect(() => {
        if (onBlur) {
            if (password.length === 0) {
                setErr('Password cannot be empty');
                setClassName('form-control is-invalid');
            } else if (passwordTester.score < 2) { 
                setErr('Password too weak');
                console.log('TOO WEAK');
                setClassName('form-control is-invalid');
            } else {
                setErr('');
                setClassName('form-control is-valid');
            }
        }

        if (confirmBlur) {
            if (confirm.length === 0) {
                setConfirmErr('Confirm password cannot be empty');
                setConfirmClass('form-control is-invalid');
            } else if (confirm !== password) {
                setConfirmErr('Passwords must match');
                setConfirmClass('form-control is-invalid');
            } else {
                setConfirmErr('');
                setConfirmClass('form-control is-valid');
            }
        }
    }, [password, confirm, onBlur, confirmBlur])

	function handlePasswordOnChange(e) {
		setPassword(e.target.value);
	}

    function handleConfirmOnChange(e) {
        setConfirm(e.target.value);
    }

	return [password, handlePasswordOnChange, err, setOnBlur, setConfirmBlur, confirmErr, handleConfirmOnChange, className, confirmClass];
}

export default PasswordHooks;
