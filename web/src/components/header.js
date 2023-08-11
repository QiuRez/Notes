import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../../public/images/icon/logo.svg'
import logo_text from '../../public/images/icon/logo-text.svg'
import { getCookie, removeCookie } from '../components/functions/cookies'
import { AES } from "crypto-js";


export default class Header extends Component {

	state = {
		username: getCookie('user') ?? null,
		logIn: getCookie('user') ? true : false,
	}

	// Кнопка выхода из аккаунта

	logOutButton() {
		removeCookie('user');
		removeCookie('user-hash');
		window.location.href = '/'
	}

	// Рендер по условию. Если пользователь авторизован/Если нет

	CheckLogged = _ => {
		if (this.state.logIn == false) {
			return(
				<div className="auth">	
					<Link to='/register'>Регистрация</Link>
					<Link to='/auth'>Войти</Link>
				</div>
			)
		} else {
			return(
				<div className="hello">
					<p>Рады вас видеть! {this.state.username}</p>
					<button className="logout-button" onClick={this.logOutButton}>Выйти</button>
				</div>
			)
		}
	}

	render() {
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
					<this.CheckLogged />
				</div>
				<hr />
			</header>
		)
	}
}