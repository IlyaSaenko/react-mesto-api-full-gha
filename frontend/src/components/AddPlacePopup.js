import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
	const [place, setPlace] = useState("");
	const [link, setLink] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		onAddPlace({
			name: place,
			link: link,
		});
	}

	useEffect(() => {
		setPlace('');
		setLink('');
	}, [isOpen]);

	return (
		<PopupWithForm
			title="Новое место"
			name="add_card"
			isOpen={isOpen}
			onClose={onClose}
			onAddPlace={onAddPlace}
			onSubmit={handleSubmit}
		>
			<input
				id="input-place"
				className="popup__item popup__item_palce_name"
				minLength="2"
				maxLength="30"
				required
				placeholder="Название"
				name="place"
				value={place ?? ""}
				onChange={(e) => setPlace(e.target.value)}
			/>
			<span className="input-place-error input-error"></span>
			<input
				id="input-link"
				className="popup__item popup__item_place_link"
				type="url"
				required
				placeholder="Ссылка на картинку"
				name="link"
				value={link ?? ""}
				onChange={(e) => setLink(e.target.value)}
			/>
			<span className="input-link-error input-error"></span>
		</PopupWithForm>
	)
};