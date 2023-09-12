import React, { Component } from "react";
import $ from 'jquery'
import { setCookie } from '../components/functions/cookies'


export default class UserRegister extends Component {

	state = {
		inputUsername: '',
		inputEmail: '',
		inputPassword: '',
		checkPassword: false,
		checkEmail: false
	}


	// Проверка данных на валидацию


	ValidationEmail = ({ target = event }) => {
		const regex = /^\S+@\S+\.\S+$/;

		if (regex.test(target.value)) { return true }

		return false
	}


	handleInput = ({ target } = event) => {
		if (target.value.length > 0 && target.name !== 'inputEmail') {
			if (target.name == 'inputUsername' && target.value.length < 37) {

				target.style.outline = 'none'

				this.setState({ [target.name]: target.value });

			} else {

				if (target.name !== 'inputPassword') {
					target.style.outline = '2px solid red'
				}

			}

		}

		if (target.value.length > 0 && target.name == 'inputEmail') {

			if (this.ValidationEmail(event)) {
				target.style.outline = 'none';
				this.setState({
					[target.name]: target.value,
					checkEmail: true
				})
			} else {
				this.setState({ checkEmail: false })
				target.style.outline = '2px solid red';
			}
		}

		if (target.value.length > 0 && target.name == 'inputPassword') {
			this.setState({
				inputPassword: target.value
			})
		}
	}

	checkPassword = ({ target } = event) => {
		if (target.value == this.state.inputPassword) {
			this.setState({
				checkPassword: true
			});
			target.style.outline = 'none';
		} else {
			target.style.outline = '2px solid red';
		}




	}


	// Отправка данных на сервер


	handleButton = event => {
		event.preventDefault();
		if (
			this.state.checkPassword == true &&
			this.state.checkEmail == true &&
			this.state.inputUsername.length > 0
		) {
			$.ajax({
				method: 'POST',
				data: this.state,
				url: 'http://project/api/user/register.php',
				statusCode: {
					400: function () {
						alert('Пользователь с таким логином уже существует.');
					},
					401: function () {
						alert('Пользователь с такой почтой уже существует.');
					}
				},
				success: function (data) {
					setCookie('username', data['username']);
					window.location.href = '/'
				},
				error: function (error) {
					console.log(error);
				}
			})
		}
	}


	render() {

		return (
			<>
				<div className="register auth-block">
					<h2>Регистрация</h2>
					<form action="">
						<div className="login">
							<p>Придумайте логин: </p>
							<input type="text" name="inputUsername" id="" placeholder="Логин" onChange={this.handleInput} />
						</div>
						<div className="email">
							<p>Email:</p>
							<input type="text" name="inputEmail" id="" placeholder="Email" onChange={this.handleInput} />
						</div>
						<div className="password">
							<p>Придумайте пароль:</p>
							<input type="password" name="inputPassword" id="" placeholder="Пароль" onChange={this.handleInput} />
						</div>
						<div className="repeat_password">
							<p>Повторите пароль:</p>
							<input type="password" name="inputCheckPassword" id="" placeholder="Повторите пароль" onChange={this.checkPassword} />
						</div>
						<button onClick={this.handleButton}>Зарегистрироваться</button>
					</form>
				</div>
			</>
		)
	}
}