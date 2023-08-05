<?php 

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	require_once($_SERVER['DOCUMENT_ROOT'] . '/api/config/database.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/api/object/user.php');

	// Инициализация базы данных 

	$database = new Database();
	$db = $database->getConnection();

	// Инициализация юзеров

	$user = new User($db);

	file_get_contents("php://input");

	extract($_POST);

	$user->password = $inputPassword;
	$user->email = htmlspecialchars(strip_tags($inputEmail));

	$user->auth();
	

?>