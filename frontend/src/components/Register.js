import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function Register({ handleReg }) {

	function handleSubmit(e, password, email) {
		e.preventDefault();
		handleReg(password, email);
	}

	return (
		<AuthForm
			title="Регистрация"
			textOfButton="Зарегистрироваться"
			handleSubmit={handleSubmit}
			pathOfButton="/signup"
		>
			<p className="entry__sign">
				Уже зарегистрированы? &nbsp;
				<Link className="entry__link" to="/signin">
					Войти
				</Link>
			</p>
		</AuthForm>
	);
}