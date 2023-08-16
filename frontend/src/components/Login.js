import React from "react";
import AuthForm from "./AuthForm";

export default function Login({ handleAuth }) {

  function handleSubmit(e, password, email) {
    e.preventDefault();
    handleAuth(password, email)
  }

  return (
    <AuthForm title="Вход" textOfButton="Войти" handleSubmit={handleSubmit} />
  );
}