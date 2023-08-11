import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import $, { error } from 'jquery'
import Header from "../components/header";
import Footer from '../components/footer';
import {setCookie} from '../components/functions/cookies'


export default class UserRegister extends Component {

	state = {
		inputLogin: '',
		inputEmail: '',
		inputPassword: '',
		checkPassword: false,
		checkEmail: false
	}


	// Проверка данных на валидацию


	ValidationEmail = event => {
		const regex = /^\S+@\S+\.\S+$/;
		
		if (regex.test(event.target.value)) { return true }

		return false
	}


	handleInput = event => {
		if (event.target.value.length > 0 && event.target.name !== 'inputEmail') {

			if (event.target.name == 'inputLogin' && event.target.value.length < 37) {

				event.target.style.outline = 'none'

				this.setState({
					[event.target.name]: event.target.value
				});

			} else {

				if (event.target.name !== 'inputPassword') {
					event.target.style.outline = '2px solid red'
				}

			}

		}

		if (event.target.value.length > 0 && event.target.name == 'inputEmail') {

			if(this.ValidationEmail(event)) {
				event.target.style.outline = 'none';
				this.setState({
					[event.target.name]: event.target.value,
					checkEmail: true
				})
			} else {
				this.setState({ checkEmail: false })
				event.target.style.outline = '2px solid red';
			}
		}

		if (event.target.value.length > 0 && event.target.name == 'inputPassword') {
			this.setState({
				inputPassword: event.target.value
			})
		}
	}

	checkPassword = event => {
		if (event.target.value == this.state.inputPassword) {
			this.setState({
				checkPassword: true
			});
			event.target.style.outline = 'none';
		} else {
			event.target.style.outline = '2px solid red';
		}
	}

	
	// Отправка данных на сервер


	handleButton = event => {
		event.preventDefault();
		if (
			this.state.checkPassword == true &&
			this.state.checkEmail == true &&
			this.state.inputLogin.length > 0
		) {
			$.ajax({
				method: 'POST',
				data: this.state,
				url: 'http://project/api/user/register.php',
				statusCode: {
					400: function() {
						alert('Пользователь с таким логином уже существует.');
					},
					401: function() {
						alert('Пользователь с такой почтой уже существует.');
					}
				},
				success: function(data) {
					setCookie('user-hash', data['login-hash']);
					setCookie('user', data['login']);
					window.location.href = '/'
				},
				error: function(data) {
					// console.log(data);
				}
			})
		}
	}


	render() {

		return(
			<>

				<Header />
					<main>

						<div className="register auth-block">
							<h2>Регистрация</h2>
							<form action="">
								<div className="login">
									<p>Придумайте логин: </p>
									<input type="text" name="inputLogin" id="" placeholder="Логин" onChange={this.handleInput}/>
								</div>
								<div className="email">
									<p>Email:</p>
									<input type="text" name="inputEmail" id="" placeholder="Email" onChange={this.handleInput}/>
								</div>
								<div className="password">
									<p>Придумайте пароль:</p>
									<input type="password" name="inputPassword" id="" placeholder="Пароль" onChange={this.handleInput}/>
								</div>
								<div className="repeat_password">
									<p>Повторите пароль:</p>
									<input type="password" name="inputCheckPassword" id="" placeholder="Повторите пароль" onChange={this.checkPassword}/>
								</div>
								<button onClick={this.handleButton}>Зарегистрироваться</button>
							</form>
						</div>

					</main>
				<Footer />

			</>
		)
	}
}