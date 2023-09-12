import React, { useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { getCookie } from "./components/functions/cookies";
import Main from "./pages/main";
import UserRegister from "./pages/user-register";
import UserAuth from "./pages/user-auth";
import Header from "./components/header";
import Footer from "./components/footer";





	

function App() {

	return (
		<>
			<Header  />
				<main>


				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/register" element={<UserRegister />} />
					<Route path="/auth" element={<UserAuth />} />

					<Route path="/404" element={<div>Not found</div>} />
					<Route path="*" element={<Navigate replace to="/404" />} />
				</Routes>


				</main>
			<Footer />
		</>

	)
}

export default App