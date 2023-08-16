import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleCardClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__like ${isLiked && 'elements__like_active'}`);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <li className="elements__item">
        <img
          src={card.link}
          alt={card.name}
          className="elements__image"
          onClick={handleCardClick}
        />
        {isOwn && <button type="button" className="elements__delete" onClick={handleDeleteClick} />}
        <div className="elements__bottom">
          <h2 className="elements__place">{card.name}</h2>
          <div className="elements__likes">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <span className="elements__likes-quantity">{card.likes.length}</span>
          </div>
        </div>
      </li>
    </CurrentUserContext.Provider>
  );
}