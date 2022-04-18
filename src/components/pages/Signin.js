import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SigninHooks from '../hooks/SigninHooks';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import { AuthContext } from '../../context/AuthContext';
import { toastSuccess, toastError } from '../../util/toast';

const Signin = () => {
	const { dispatch } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

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

			window.sessionStorage.setItem('userID', payload.data.user.id);
			dispatch({
				type: "LOGIN",
				userID: payload.data.user.id,
				email: payload.data.user.email,
				firstName: payload.data.user.firstName,
				lastName: payload.data.user.lastName,
				wishlist: payload.data.user.wishlist,
				cart: payload.data.user.cart
			});

			toastSuccess('User signed in!')

			navigate('/');

		} catch (err) {
			toastError(err.response.data.error);

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
