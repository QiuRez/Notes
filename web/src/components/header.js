import React from "react";
import { Link } from 'react-router-dom';

import logo from '../../public/images/icon/logo.svg'
import logo_text from '../../public/images/icon/logo-text.svg'

function Header() {
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
				<div className="auth">
					<Link to='/register'>Регистрация</Link>
					<Link to='/auth'>Войти</Link>
				</div>
			</div>
			<hr />
		</header>
	)
}

export default Header