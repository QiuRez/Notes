import React, { Component } from "react";
import $, { error } from 'jquery';
import Header from "../components/header";
import Footer from "../components/footer";
import { render } from "react-dom";


export default class UserAuth extends Component {

	state = {
		inputEmail: '',
		inputPassword: '',
		formEmail: false,
	}


	ValidationEmail = email => {
		const regex = /^\S+@\S+\.\S+$/;
		
		if (regex.test(email)) { return true }

		return false
	}

	handlerInput = event => {
		
		if (event.target.name == 'inputEmail' && event.target.value.length > 0) {
			if (this.ValidationEmail(event.target.value)) {
				this.setState({
					inputEmail: event.target.value,
					formEmail: true
				})
				event.target.style.outline = 'none';
			} else {
				event.target.style.outline = '2px solid red';
			}
		} if(event.target.name == 'inputPassword') {

			this.setState({
				inputPassword: event.target.value
			})

		}

	}

	buttonHandler = event => {
		event.preventDefault();
		console.log(this.state);
		if (
			this.state.formEmail == true &&
			this.state.inputPassword.length > 0
		) {

			$.ajax({
				method: 'POST',
				url: 'http://project/api/user/auth.php',
				data: this.state,
				success: function(data) {
					console.log(data['login']);
				},
				statusCode: {
					400: function(data) {
						console.log("Пользователь не найден");
					}
				},
				error: function(data) {
					console.log("Пароль неверный");
				}
			})
		}
	}



	render() {

		return(
			<>
				<Header />
				<main>
	
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
	
				</main>
				<Footer />
			</>
		)

	}
}