import checkResponse from "./handleResponse"; 

export const BASE_URL = 'http://localhost:3000';

export function register(password, email) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
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
		credentials: 'include',
		body: JSON.stringify({ password, email })
	})
		.then(checkResponse)
};

// export function checkToken(token) {
// 	return fetch(`${BASE_URL}/users/me`, {
// 		method: 'GET',
// 		headers: {
// 			"Content-Type": "application/json",
// 			"Authorization": `Bearer ${token}`
// 		}
// 	})
// 		.then(checkResponse)
// }

export const checkUser = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
		},
		credentials: 'include'
	})
		.then(checkResponse);
};