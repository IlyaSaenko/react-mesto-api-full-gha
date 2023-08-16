import { apiConfig } from "./constants";
import checkResponse from "./handleResponse";

class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
		this._authorization = config.headers["authorization"];
	}

	//получить список карточек
	getInitialCards() {
		return fetch(`${this._url}/cards`, {
			headers: {
				authorization: this._authorization,
				"Content-Type": "application/json",
			},
		})
		.then(checkResponse)
	}

	//получить данные пользователя
	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			headers: {
				authorization: this._authorization,
			},
		}).then(checkResponse)
	}

	//изменить данные пользователя
	setUserInfo(data) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: {
				authorization: this._authorization,
				"Content-Type": "application/json",
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
				authorization: this._authorization,
				"Content-Type": "application/json",
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
					authorization: this._authorization,
				},
			}).then(checkResponse)

		} else {
			return fetch(`${this._url}/cards/${dataId}/likes`, {
				method: "PUT",
				headers: {
					authorization: this._authorization,
				},
			}).then(checkResponse)
		}
	}

	//удалить конкретную карточку
	deleteCard(dataId) {
		return fetch(`${this._url}/cards/${dataId}`, {
			method: "DELETE",
			headers: {
				authorization: this._authorization,
			},
		}).then(checkResponse)
	}

	//изменить аватар
	setUserAvatar(data) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: {
				authorization: this._authorization,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				avatar: data.avatar,
			}),
		}).then(checkResponse)
	}
}

export const api = new Api(apiConfig);