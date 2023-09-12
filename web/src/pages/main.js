import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { getCookie } from "../components/functions/cookies";
import { NoteDelete } from "../components/notedelete";


export default function Main() {

	const [username, setUsername] = useState(getCookie('username') ?? null);
	const [note, setNote] = useState(null);
	const [APISignal, setAPISignal] = useState();
	const [emptyNotes, setEmptyNotes] = useState();

	// Получение заметок из БД

	useEffect(() => {
		getNotes();
	}, []);

	const getNotes = function () {

		if (username != null) {

			const apiURL = `http://project/api/notes/readAll.php?username=${username}`;

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

	// Проверка, была ли изменена заметка когда-либо. Для отображения блока .modified-at

	const checkModify = _ => {
		const modified_p = document.querySelectorAll('.note #note-modified-at');

		modified_p.forEach((element, index) => {
			if (element.textContent.length > 0) {
				element.parentNode.style.display = 'flex';
			} else {
				element.parentNode.style.display = 'none';
			}
		});
	}

	// Удаление заметок

	const deleteNote = (event, note_id) => {
		if (NoteDelete(note_id)) {
			var parentNote = event.target.closest('.note');
			parentNote.classList.add('delete')
			setTimeout(function () {
				parentNote.style.display = 'none';
			}, 1000)
		}
	}

	// Рендер заметок и разных ситуаций

	const LoadingNotes = _ => (
		<div className="loading-notes">
			<h2>Загрузка...</h2>
		</div>
	);

	const UserNotAuth = _ => (
		<div className="user-not-auth">
			<h2>Для просмотра и создания заметок <br /> нужно войти в аккаунт</h2>
			<div className="reg_or_logIn">
				<Link to='/register'><button>Зарегистрироваться</button></Link>
				<Link to='/auth'><button>Войти</button></Link>
			</div>
		</div>
	);

	const Modal = _ => {
		document.querySelector('.background-modal').style.display = 'flex'
	}

	const NotCreateNote = _ => (
		<div className="not-create-note">
			<h2>Нет созданных заметок</h2>
			<button onClick={(e) => Modal()}>Создать первую заметку</button>
		</div>
	);

	const ApiFailed = _ => (
		<div className="api-failed">
			<h2>Нет подключения с сервером :(</h2>
		</div>
	);

	const RenderNotes = function () {

		if (note != null) {

			const html = note.map((note) => (
				<div className="note" key={note.note_id} style={{ background: note.color }}>
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
							<button id="note-delete"
								onClick={(event) => deleteNote(event, note.note_id)}></button>
						</div>
					</div>
				</div>
			))

			useEffect(() => {
				checkModify();
			}, []);

			return html;

		} else {

			if (APISignal == false) { return <ApiFailed /> }; // Нет соединения с API

			if (emptyNotes) { return <NotCreateNote /> };     // Нет созданных заметок

			if (username == null) { return <UserNotAuth /> }; // Пользователь не авторизован

			return <LoadingNotes />;                          // Загрузка страницы, выполняется запрос к API
		}
	}




	return (
		<>
			<div className="main">
				<RenderNotes />
			</div>

		</>

	)
}