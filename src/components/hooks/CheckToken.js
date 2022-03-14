import jwtDecode from 'jwt-decode';

function CheckToken() {
	function checkJwtToken() {
		let jwtToken = window.localStorage.getItem('jwtToken');

		if (jwtToken) {
			let decodedToken = jwtDecode(jwtToken);

			const currentTime = Date.now() / 1000;

			if (decodedToken.exp < currentTime) {
				window.localStorage.removeItem('jwtToken');
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	return { checkJwtToken };
}

export default CheckToken;
