import checkResponse from "./handleResponse"; 

export const BASE_URL = 'http://api.react.mesto.nomoredomainsicu.ru';

export function register(password, email) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
		.then(checkResponse)
};

export function authorize(password, email) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
		.then(checkResponse)
};

export function checkToken(token) {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	})
		.then(checkResponse)
}

// export const checkUser = () => {
// 	return fetch(`${BASE_URL}/users/me`, {
// 		method: 'GET',
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		credentials: 'include'
// 	})
// 		.then(checkResponse);
// };