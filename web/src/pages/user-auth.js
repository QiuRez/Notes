import React, { Component } from "react";
import $ from 'jquery';
import { setCookie } from "../components/functions/cookies";


export default class UserAuth extends Component {

	state = {
		inputEmail: '',
		inputPassword: '',
		formEmail: false,
	}


	// ПРОВЕРКА ВАЛИДАЦИИ ДАННЫХ

	ValidationEmail = email => {
		const regex = /^\S+@\S+\.\S+$/;
		
		if (regex.test(email)) { return true }

		return false
	}


	handlerInput = ({target} = event) => {
		if (target.name == 'inputEmail' && target.value.length > 0) {
			if (this.ValidationEmail(target.value)) {
				this.setState({
					inputEmail: target.value,
					formEmail: true
				})
				target.style.outline = 'none';
			} else {
				target.style.outline = '2px solid red';
			}
		} if(target.name == 'inputPassword') {

			this.setState({
				inputPassword: target.value
			})

		}

	}


	// ЗАПРОС НА СЕРВЕР

	buttonHandler = event => {
		event.preventDefault();
		if (
			this.state.formEmail == true &&
			this.state.inputPassword.length > 0
		) {

			$.ajax({
				method: 'POST',
				url: 'http://project/api/user/auth.php',
				data: this.state,
				success: function(data) {
					setCookie('username', data['username']);
					window.location.href = '/';
				},
				statusCode: {
					400: function(data) {
						console.log("Пользователь не найден");
					}
				},
				error: function(data) {
					console.log("Пароль неверный");
				},
			});
		}
	}




	render() {
		return(
			<>
				<div className="auth auth-block">
					<h2>Вход</h2>
					<form action="" method="post">
						<div className="login">
							<p>Почта: </p>
							<input type="text" name="inputEmail" id="" placeholder="Email" onChange={this.handlerInput} />
						</div>
						
						
						<div className="repeat_password">
							<p>Пароль: </p>
							<input type="password" name="inputPassword" id="" placeholder="Пароль" onChange={this.handlerInput}/>
						</div>
						<button className="auth-button" onClick={this.buttonHandler}>Войти</button>
					</form>
				</div>
			</>
		)

	}
}