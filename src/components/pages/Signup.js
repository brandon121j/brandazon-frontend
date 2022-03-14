import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiAxios from '../../util/apiAxios';

// import CheckToken from '../../hooks/CheckToken';
import FirstNameHooks from '../hooks/FirstNameHooks';
import LastNameHooks from '../hooks/LastNameHooks';
import PasswordHooks from '../hooks/PasswordHooks';
import EmailHooks from '../hooks/EmailHooks';
import Layout from '../layout/Layout'




function Signup() {
	const [
		firstName,
		handleFirstNameOnChange,
		firstNameError,
		setFirstNameOnBlur,
		firstClassName
	] = FirstNameHooks();
	const [lastName, handleLastNameOnChange, lastNameError, setLastNameOnBlur, lastClassName] =
		LastNameHooks();
	const [email, handleEmailOnChange, emailError, setEmailOnBlur, emailClassName] = EmailHooks();
	const [
		password,
		handlePasswordOnChange,
		passwordError,
		setPasswordOnBlur,
		setConfirmOnBlur,
		confirmError,
		handleConfirmOnChange,
		passwordClassName,
		confirmClassName
	] = PasswordHooks();

	const navigate = useNavigate();
	
	// const { checkJwtToken } = CheckToken();
	// useEffect(() => {
	// 	if (checkJwtToken()) {
	// 		navigate('/');
	// 	}
	// }, []);

	async function handleSubmit(e) {
		e.preventDefault();

		try {

			await ApiAxios.post('/signup', {
				firstName,
				lastName,
				email,
				password,
			});

			navigate('/sign-in');
		} catch (err) {
			console.log(err.response.data)
		}
	}

	return (
		<Layout>
		<div className="d-flex justify-content-center text-center rounded m-5">
			<div className="card w-25">
				<form className="form-group card-body" onSubmit={handleSubmit}>
					<h2>Sign up</h2>
					<div className="m-3">
						<label className="m-1">First Name</label>
						<input
							type="text"
							onChange={handleFirstNameOnChange}
							id={firstName}
							onBlur={setFirstNameOnBlur}
							placeholder="First name"
							className={firstClassName}
						/>
						{firstNameError && (
							<div className="invalid-feedback" role="alert">
								{firstNameError}{' '}
							</div>
						)}
					</div>
					<div className="m-3">
						<label className="m-1">Last Name</label>
						<input
							type="text"
							onChange={handleLastNameOnChange}
							id={lastName}
							onBlur={setLastNameOnBlur}
							placeholder="last name"
							className={lastClassName}
						/>
						{lastNameError && (
							<div className="invalid-feedback" role="alert">
								{lastNameError}{' '}
							</div>
						)}
					</div>
					<div className="m-3">
						<label className="m-1">Email</label>
						<input
							type="text"
							onChange={handleEmailOnChange}
							id={email}
							onBlur={setEmailOnBlur}
							placeholder="Email"
							className={emailClassName}
						/>
						{emailError && (
							<div className="invalid-feedback" role="alert">
								{emailError}{' '}
							</div>
						)}
					</div>
					<div className="m-3">
						<label className="m-1">Password</label>
						<input
							type="password"
							placeholder="Password"
							onChange={handlePasswordOnChange}
							onBlur={setPasswordOnBlur}
							className={passwordClassName}
						/>
						{passwordError && (
							<div className="invalid-feedback" role="alert">
								{passwordError}{' '}
							</div>
						)}
					</div>
					<div className="m-3">
						<label className="m-1">Confirm Password</label>
						<input
							type="password"
							placeholder="Confirm password"
							className={confirmClassName}
							onChange={handleConfirmOnChange}
							onBlur={setConfirmOnBlur}
						/>
						{confirmError && (
							<div className="invalid-feedback" role="alert">
								{confirmError}{' '}
							</div>
						)}
					</div>
					<button
						type="submit"
						className="btn btn-outline-success m-3 p-3 w-25"
					>
						Sign up
					</button>
					<div className="m-3">
						<Link to="/sign-in" className="text-success">
							Already have an account?
						</Link>
					</div>
				</form>
			</div>
		</div>
		</Layout>
	);
}

export default Signup;