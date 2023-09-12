import React, { useState } from "react";
import $ from 'jquery';
import { getCookie } from "./functions/cookies";

export default function CreateNote({ bool = false }) {

	const [color, setColor] = useState('#FED6BC');
	const [title, setTitle] = useState();
	const [content, setContent] = useState();
	const [username, setUsername] = useState(getCookie('username') ?? null);

	const closeModal = () => {
		const backgroundModal = document.querySelector('.background-modal')
		backgroundModal.style.display = 'none';
	}

	const setColorBlock = ({ target }) => { // Цвет фона шаблона будущей заметки
		var color = target.style.backgroundColor;
		var block = document.querySelector('.create-note.modal .text-info');
		setColor(color);
		block.style.backgroundColor = color;
	}

	const create = e => {
		e.preventDefault();

		var data = {
			username: username,
			color: color,
			title: title,
			content: content,
		}

		$.ajax({
			url: 'http://project/api/notes/create.php',
			method: 'POST',
			data: data,
			success: function (response) {
				alert('Заметка успешно создана!');
				setTimeout(function () {
					window.location.href = '/';
				}, 2000);
			},
			error: function (error) {
				console.error(error);
			}
		})
	}

	return (
		<div className="background-modal" onClick={(event) => closeModal(event)}>
			<div className="create-note modal" onClick={(event) => event.stopPropagation()}>
				<h2>Cоздание заметки</h2>
				<form onSubmit={(e) => create(e)}>
					<div className="text-info--color">
						<div className="text-info">
							<label htmlFor="">
								Заголовок:
								<input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} />
							</label>
							<label htmlFor="">
								Содержимое:
								<textarea name="content" id="" cols="30" rows="10" onChange={(e) => setContent(e.target.value)}></textarea>
							</label>
						</div>
						<div className="set-color">
							<div className="color" color="1" style={{ background: '#FED6BC' }} onClick={(e) => setColorBlock(e)}></div>
							<div className="color" color="2" style={{ background: '#FFFADD' }} onClick={(e) => setColorBlock(e)}></div>
							<div className="color" color="3" style={{ background: '#DEF7FE' }} onClick={(e) => setColorBlock(e)}></div>
							<div className="color" color="4" style={{ background: '#E7ECFF' }} onClick={(e) => setColorBlock(e)}></div>
							<div className="color" color="5" style={{ background: '#C3FBD8' }} onClick={(e) => setColorBlock(e)}></div>
							<div className="color" color="6" style={{ background: '#FDEED9' }} onClick={(e) => setColorBlock(e)}></div>
							<div className="color" color="7" style={{ background: '#F6FFF8' }} onClick={(e) => setColorBlock(e)}></div>
							<div className="color" color="8" style={{ background: '#B5F2EA' }} onClick={(e) => setColorBlock(e)}></div>
							<div className="color" color="9" style={{ background: '#C6D8FF' }} onClick={(e) => setColorBlock(e)}></div>
						</div>
					</div>
					<button type="submit">Создать</button>
				</form>
				<div className="modalClose" onClick={(event) => closeModal(event)}>X</div>
			</div>
		</div>
	)
}