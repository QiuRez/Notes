import React from "react";
import { Routes, Link } from 'react-router-dom'
import logo from '../../public/images/icon/logo.svg'
import Header from "../components/header";
import Footer from "../components/footer";

export default function Main() {
	return(
		<>

			<Header />
			<main>

			<div className="main">
				<div className="note">
					<div className="note-title">
						<h4 id="note-title">title</h4>
					</div>
					<div className="note-content">
						<p id="note-text">
							Lorem ipsum dolor sit amet,
							consectetur adipisicing elit. Nulla perspiciatis consectetur, minus hic suscipit aliquam illo quidem sunt ipsam nesciunt soluta esse nam in pariatur sed distinctio architecto doloremque harum reiciendis a rerum perferendis delectus! Quo perspiciatis laudantium facere minus illum officia praesentium dignissimos. 
							Molestiae iure vel doloremque reiciendis suscipit.
						</p>
					</div>
					<div className="note-options">
						<div className="created-modified">
							<div className="created-at">
								<p>Создано: </p>
								<p id="note-created-at">Dd/Mm/Yy</p>
							</div>
							<div className="modified-at">
								<p>Изменено: </p>
								<p id="note-modified-at">Dd/Mm/Yy</p>
							</div>
						</div>
						<div className="note-delete">
							<button id="note-delete"></button>
						</div>
					</div>
				</div>
				<div className="note" style={{background: '#C55C5C'}}>
					<div className="note-title">
						<h4 id="note-title">title</h4>
					</div>
					<div className="note-content">
						<p id="note-text">
							Lorem ipsum dolor sit amet,
							consectetur adipisicing elit. Nulla perspiciatis consectetur, minus hic suscipit aliquam illo quidem sunt ipsam nesciunt soluta esse nam in pariatur sed distinctio architecto doloremque harum reiciendis a rerum perferendis delectus! Quo perspiciatis laudantium facere minus illum officia praesentium dignissimos. 
							Molestiae iure vel doloremque reiciendis suscipit.
						</p>
					</div>
					<div className="note-options">
						<div className="created-modified">
							<div className="created-at">
								<p>Создано: </p>
								<p id="note-created-at">Dd/Mm/Yy</p>
							</div>
							<div className="modified-at">
								<p>Изменено: </p>
								<p id="note-modified-at">Dd/Mm/Yy</p>
							</div>
						</div>
						<div className="note-delete">
							<button id="note-delete"></button>
						</div>
					</div>
				</div>
				
			</div>

			</main>

			<Footer />

		</>

	)
}