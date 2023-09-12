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

		$user->lowerUsername = mb_strtolower($inputUsername);
		$user->lowerEmail = mb_strtolower($inputEmail);
		$user->username = $inputUsername;
		$user->email = $inputEmail;
		$user->hash = $hash;

		$user->register();
	}



?>