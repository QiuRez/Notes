import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../../public/images/icon/logo.svg'
import logo_text from '../../public/images/icon/logo-text.svg'
import { getCookie, removeCookie } from '../components/functions/cookies'
import $ from 'jquery';


export default function Header({props}) {

	const [ username, setUsername ] = useState(getCookie('username') ?? null);
	const [ logIn, setLogIn ] = useState(getCookie('username') ? true : false);

	
	// Кнопка выхода из аккаунта
	
	
	
	const logOutButton = _ => {
		removeCookie('username');
		setUsername('');
		setLogIn(false);
		window.location.href = '/';
	}
	
	// Рендер по условию. Если пользователь авторизован/Если нет
	
	const CheckLogged = _ => {
		if (logIn == false) {
			return(
				<div className="auth">	
					<Link to='/register'>Регистрация</Link>
					<Link to='/auth'>Войти</Link>
				</div>
			)
		} else {
			return(
				<div className="hello">
					<p>Рады вас видеть! {username}</p>
					<button className="logout-button" onClick={() => logOutButton()}>Выйти</button>
				</div>
			)
		}
	}

	return(
		<header>
			<div className="header__content">
				<div className="logo">
					<div className="logo__image">
						<Link to='/'><img src={logo} alt="" /></Link>
					</div>
					<div className="logo__text">
						<Link to='/'><img src={logo_text} alt="" /></Link>
					</div>
				</div>
				<CheckLogged />
			</div>
			<hr />
		</header>
	)
}