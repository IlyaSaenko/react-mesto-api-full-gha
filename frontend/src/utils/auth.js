import checkResponse from "./handleResponse"; 

export const BASE_URL = 'https://api.react.mesto.nomoredomainsicu.ru';

export function register(password, email) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
		.then(checkResponse)
};

export function authorize(password, email) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
		.then(checkResponse)
};

export function checkToken() {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem('jwt')}`
		}
	})
		.then(checkResponse)
}