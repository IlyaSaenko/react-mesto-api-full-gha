import { apiConfig } from "./constants";
import checkResponse from "./handleResponse";

class Api {
	constructor(config) {
		this._url = 'https://api.react.mesto.nomoredomainsicu.ru';
	}

	//получить список карточек
	getInitialCards() {
		return fetch(`${this._url}/cards`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('jwt')}`
			}
		})
		.then(checkResponse)
	}

	//получить данные пользователя
	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('jwt')}`
			}
		}).then(checkResponse)
	}

	//изменить данные пользователя
	setUserInfo(data) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('jwt')}`
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		}).then(checkResponse)
	}

	//добавить новую карточку
	addNewCards(data) {
		return fetch(`${this._url}/cards`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('jwt')}`
			},
			body: JSON.stringify({
				name: data.name,
				link: data.link,
			}),
		}).then(checkResponse)
	}

	//статус лайка карточки
	changeLikeCardStatus(dataId, isLiked) {
		if (isLiked) {
			return fetch(`${this._url}/cards/${dataId}/likes`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem('jwt')}`
				}
			}).then(checkResponse)

		} else {
			return fetch(`${this._url}/cards/${dataId}/likes`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem('jwt')}`
				}
			}).then(checkResponse)
		}
	}

	//удалить конкретную карточку
	deleteCard(dataId) {
		return fetch(`${this._url}/cards/${dataId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('jwt')}`
			}
		}).then(checkResponse)
	}

	//изменить аватар
	setUserAvatar(data) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('jwt')}`
			},
			body: JSON.stringify({
				avatar: data.avatar,
			}),
		}).then(checkResponse)
	}
}

export const api = new Api(apiConfig);