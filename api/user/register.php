<?php 

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	require_once($_SERVER['DOCUMENT_ROOT'] . '/api/config/database.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/api/object/user.php');

	// Инициализация базы данных
	$database = new Database();
	$db = $database->getConnection();

	// // Инициализация юзеров

	$user = new User($db);

	file_get_contents("php://input");

	extract($_POST);

	if ($checkEmail !== false && $checkPassword !== false) {

		
		$hash = password_hash($inputPassword, PASSWORD_BCRYPT);

		$login_hash = crypt($inputLogin, date('Y-m-d H:i:s'));  // Хеширование логина

		$user->lowerLogin = mb_strtolower($inputLogin);
		$user->lowerEmail = mb_strtolower($inputEmail);
		$user->login = $inputLogin;
		$user->email = $inputEmail;
		$user->hash = $hash;
		$user->login_hash = $login_hash;

		$user->register();
	}



?>