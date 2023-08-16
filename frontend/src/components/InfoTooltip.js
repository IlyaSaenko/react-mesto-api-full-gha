import React from "react";
import failImage from '../images/entry-bad.svg';
import successImage from '../images/entry-nice.svg'

export default function InfoTooltip({ isOpen, onClose, isSuccessRegister }) {

  return (
    <div className={`popup popup__name_entry ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">

        <button type="button" onClick={onClose} className="popup__close" />
        <img
          className="popup__image"
          src={isSuccessRegister ? successImage : failImage}
          alt={isSuccessRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз"}
        />
        <h2 className="popup__name popup__name_entry">
          {isSuccessRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз"}
        </h2>

      </div>
    </div>
  );
}