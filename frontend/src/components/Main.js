import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
	onEditProfile,
	onAddPlace,
	onEditAvatar,
	onCardClick,
	onCardLike,
	onCardDelete,
	cards
}) {
	const currentUser = useContext(CurrentUserContext);

	return (

		<main className="content">
			<section className="profile">
				<div className="profile__card">
					<img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
					<button className="profile__avatar-btn" onClick={onEditAvatar}></button>
					<div className="profile__info">
						<h1 className="profile__name">{currentUser.name}</h1>
						<button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
						<p className="profile__sign">{currentUser.about}</p>
					</div>
				</div>
				<button className="profile__add-photo-btn" onClick={onAddPlace} type="button"></button>
			</section>

			<section className="elements">
				<ul className="elements__list">
					{cards.map((card) => (
						<Card
							card={card}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onCardDelete={onCardDelete}
							key={card._id}
							/>
					))}
				</ul>
			</section>
		</main>
	)
}