import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const currentUser = useContext(CurrentUserContext);

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({
			name: name,
			about: description,
		});
	}

	return (
		<PopupWithForm
			title="Редактировать профиль"
			name="profile"
			isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
		>
			<input
				id="input-name"
				className="popup__item popup__item_type_name"
				minLength="2"
				maxLength="40"
				required
				placeholder="Ваше имя"
				onChange={e => setName(e.target.value)}
				name={name}
				value={name ?? ""}
			/>
			<span className="input-name-error input-error"></span>

			<input
				id="input-description"
				className="popup__item popup__item_type_sign"
				minLength="2"
				maxLength="200"
				required
				placeholder="Вид деятельности"
				onChange={e => setDescription(e.target.value)}
				name={description}
				value={description ?? ""}
			/>
			<span className="input-description-error input-error"></span>
		</PopupWithForm>
	);
}