import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "./functions/cookies";
import CreateNote from "./createnote";

function Footer() {

	const [ username, setUsername ] = useState(getCookie('username') ?? null)

	const ButtonCreate = _ => {
		if (username != null) {
			return(
				<button onClick={() => Modal()}>Новая заметка</button>
			)
		} else {
			return <></>
		}
	}

	const Modal = _ => {
		document.querySelector('.background-modal').style.display = 'flex'
	}
	
	return(
		<>
		<footer>
			<CreateNote />
			<ButtonCreate />
			<div className="created-by">
				<p>Created by <br /> <Link to='https://vk.com'>Vasiluk Egor</Link> </p>
			</div>
		</footer>
		</>
	)
}

export default Footer