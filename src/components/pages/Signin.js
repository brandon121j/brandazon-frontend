import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import SigninHooks from '../hooks/SigninHooks';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import { AuthContext } from '../../context/AuthContext';

const Signin = () => {
	const { dispatch } = useContext(AuthContext);
	let navigate = useNavigate();

	const [
		password,
		email,
		handlePasswordOnChange,
		handleEmailOnChange,
		emailError,
		passwordError,
		setOnPasswordBlur,
		setOnEmailBlur,
	] = SigninHooks();

    async function handleLogin(e) {
		e.preventDefault();
		try {
			let payload = await ApiAxios.post('/login', {
				email,
				password,
			});

			console.log('usersWishlist: ', payload.data.user.usersWishlist)

			dispatch({
				type: "LOGIN",
				email: payload.data.user.email,
				firstName: payload.data.user.firstName,
				lastName: payload.data.user.lastName,
				wishlist: payload.data.user.usersWishlist,
				cart: payload.data.user.usersCart
			})
			navigate('/');
		} catch (e) {
			console.log(e.response.data);
		}
	}

	return (
		<Layout>
		<div className="d-flex justify-content-center text-center rounded m-5">
		<div className="card w-25">
			<form className="form-group card-body" onSubmit={handleLogin}>
				<h2>Sign in</h2>
				<div className="m-3">
					<label className="m-1">Email</label>
					<input
						type="text"
						id={email}
						placeholder="email@example.com"
						name="email"
						onBlur={setOnEmailBlur}
						onChange={handleEmailOnChange}
						required="true"
						className={`${
							!emailError
								? 'form-control border border-primary'
								: 'form-control border border-danger'
						}`}
					/>
					{emailError && (
						<div className="error text-danger p" role="alert">
							{emailError}{' '}
						</div>
					)}
				</div>
				<div className="m-3">
					<label className="m-1">Password</label>
					<input
						type="password"
						id={password}
						placeholder="Password"
						name="password"
						onBlur={setOnPasswordBlur}
						onChange={handlePasswordOnChange}
						className={`${
							!passwordError
								? 'form-control border border-primary'
								: 'form-control border border-danger'
						}`}
					/>
					{passwordError && (
						<div className="error text-danger p" role="alert">
							{passwordError}{' '}
						</div>
					)}
				</div>
				<button type="submit" className="btn btn-outline-primary m-3 p-3 w-25">
					Sign in
				</button>
				<div>
					<Link to="/sign-up">Don't have an account?</Link>
				</div>
			</form>
		</div>
	</div>
	</Layout>
    );
};

export default Signin;
