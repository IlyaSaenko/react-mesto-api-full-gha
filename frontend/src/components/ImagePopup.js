import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_picture ${card ? "popup_opened" : ""}`}>
      <div className="popup__container-card">
        <button className="popup__close popup__close_photo" type="button" onClick={onClose}></button>
        <img
          className="popup__image-card"
          src={card ? card.link : ''}
          alt={card ? card.name : ''}
        />
        <h2 className="popup__title-card">{card ? card.name : ''}</h2>
      </div>
    </div>
  )
}