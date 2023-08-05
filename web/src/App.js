import React from "react";
import { Route, Link, Routes, Navigate } from 'react-router-dom';
import Main from "./pages/main";
import UserRegister from "./pages/user-register";
import UserAuth from "./pages/user-auth";


	

function App() {

	return (

		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/register" element={<UserRegister />} />
			<Route path="/auth" element={<UserAuth />} />

			<Route path="/404" element={<div>Not found</div>} />
			<Route path="*" element={<Navigate replace to="/404" />} />
		</Routes>

	)
}

export default App