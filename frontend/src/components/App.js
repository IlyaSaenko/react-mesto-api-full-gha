import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';

import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("email");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [isSuccessRegister, setIsSuccesRegister] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // useEffect(() => {
  //   Promise.all([api.getUserInfo(), api.getInitialCards()])
  //     .then(([user, card]) => {
  //       setCurrentUser(user);
  //       setCards(card);
  //     })
  //     .catch((err) => console.log(err))
  // }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, card]) => {
          setCurrentUser(user);
          setCards(card);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);


  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setEmail(data.data.email);
          }
        })
        .then(() => {
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null);
    setIsTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log("Error like card " + err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log("Error delete card: " + err));
  };

  function handleUpdateUser(value) {
    api.setUserInfo(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => console.log("Error update info: " + err))
  };

  function handleUpdateAvatar(value) {
    api.setUserAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => console.log("Error update avatar: " + err));
  };

  function handleAddPlaceSubmit(value) {
    api.addNewCards(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log("Error add card: " + err))
  };

  function isSign() {
    localStorage.clear("jwt");
    setLoggedIn(false);
  }

  function onLogin(email, data) {
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("email", email);
    setLoggedIn(true);
  }

 // обновить стэйт забыл...
 // спасибо большое за проверку и подсказки!

  function handleAuth(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          onLogin(email, data);
          setEmail(email);
        }
      })
      .then(() => {
        navigate("/");
        setIsSuccesRegister(true);
      })
      .catch((err) => {
        setIsSuccesRegister(false);
        setIsTooltipOpen(true);
        console.log("Error entry : " + err);
      });
  }

  function handleReg(password, email) {
    auth
      .register(password, email)
      .then(() => {
        navigate("/signin");
      })
      .then(() => {
        setIsSuccesRegister(true);
        setIsTooltipOpen(true);
      })
      .catch((err) => {
        setIsSuccesRegister(false);
        setIsTooltipOpen(true);
        console.log("Error registration: " + err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} loggedIn={isLoggedIn} isSign={isSign} />
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                setIsSuccesRegister={setIsSuccesRegister}
                isOpen={setIsTooltipOpen}
                handleReg={handleReg}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setIsSuccesRegister={setIsSuccesRegister}
                isOpen={setIsTooltipOpen}
                handleAuth={handleAuth}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onClose={closeAllPopups}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="*"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setIsSuccesRegister={setIsSuccesRegister}
                isOpen={setIsTooltipOpen}
                handleAuth={handleAuth}
              />
            }
          />
        </Routes>
        {/* <Footer /> */}
        {isLoggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isTooltipOpen}
          isSuccessRegister={isSuccessRegister}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}