import React, { useEffect, useContext, useRef } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const currentUser = useContext(CurrentUserContext);

	useEffect(() => {
		valueLink.current.value = ''
	}, [currentUser, isOpen])

	const valueLink = useRef('');

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateAvatar({
			avatar: valueLink.current.value,
		});
	}

	return (
		<PopupWithForm
			title="Обновить аватар"
			name="avatar"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				id="input-avatar"
				className="popup__item popup__item_avatar"
				minLength="2"
				required
				placeholder="Введите ссылку на изображение"
				name="avatar"
				type="url"
				ref={valueLink}
			/>
			<span className="input-avatar-error input-error"></span>
		</PopupWithForm>
	)
};