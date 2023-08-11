import React, { useEffect, useMemo, useState } from "react";
import { Routes, Link, resolvePath } from 'react-router-dom'
import $ from "jquery";
import logo from '../../public/images/icon/logo.svg'
import Header from "../components/header";
import Footer from "../components/footer";
import { getCookie } from "../components/functions/cookies";


export default function Main() {

	const [ user, setUser ] = useState(getCookie('user') ?? null);
	const [ userHash, setUserHash ] = useState(getCookie('user-hash') ?? null)
	const [ note, setNote ] = useState(null);
	const [ APISignal, setAPISignal ] = useState();
	const [ emptyNotes, setEmptyNotes ] = useState();

	useEffect(() => {
		getNotes();
	}, [])


	// Получение заметок из БД

	const getNotes = function () {
		
		if (userHash != null) {
	
			const apiURL = `http://project/api/notes/readAll.php?user-hash=${userHash}`;
			
			const notes = fetch(apiURL)
			.then((response) => {
				if (response.status == 200) {
					return response.json()
				} 
				if (response.status == 204) {
					throw new Error('Нет созданных заметок')
				}

				throw new Error('Error')
			})
			.then((responseJson) => {
				setNote(responseJson);
			})
			.catch((e) => {
				if (e.name == 'TypeError') {
					setAPISignal(false)
				}
				if (e.message == 'Нет созданных заметок') {
					setEmptyNotes(true);
				}
			})

		}
	}

	// Рендер заметок и разных ситуаций

	const RenderNotes = function() {

		if (note != null) {

			const html = note.map((note) => (
				<div className="note" key={note.note_id} style={{background: note.color}}>
					<div className="note-title">
						<h4 id="note-title">{note.title}</h4>
					</div>
					<div className="note-content">
						<p id="note-text">
							{note.content}
						</p>
					</div>
					<div className="note-options">
						<div className="created-modified">
							<div className="created-at">
								<p>Создано: </p>
								<p id="note-created-at">{note.created_at}</p>
							</div>
							<div className="modified-at">
								<p>Изменено: </p>
								<p id="note-modified-at">{note.modified_at}</p>
							</div>
						</div>
						<div className="note-delete">
							<button id="note-delete"></button>
						</div>
					</div>
				</div>
			))

			return html;
		} else {

			if (APISignal == false) {
				return (
					<div className="loading-notes">
						<h2>Нет подключения с сервером :(</h2>
					</div>
				)
			} 

			if (emptyNotes) {
				return(
					<div className="not-create-note">
						<h2>Нет созданных заметок</h2>
						<button>Создать первую заметку</button>
					</div>
				)
			}

			if (user == null) {
				return(
					<div className="user-not-auth">
					<h2>Для просмотра и создания заметок <br /> нужно войти в аккаунт</h2>
					<div className="reg_or_logIn">
						<Link to='/register'><button>Зарегистрироваться</button></Link>
						<Link to='/auth'><button>Войти</button></Link>
					</div>
				</div>
				)
			}

			return (
				<div className="loading-notes">
					<h2>Загрузка...</h2>
				</div>
			)


		}


		


	}

	return(
		<>

			<Header />

			<main>

			<div className="main">
				<RenderNotes />
			</div>

			</main>

			<Footer />


		</>

	)
}