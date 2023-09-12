<?php 

	header('Access-Control-Allow-Origin: *');
	header("Content-Type: application/json; charset=UTF-8");

	require_once($_SERVER['DOCUMENT_ROOT'] . '/api/config/database.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/api/object/note.php');


	// Инициализация базы данных
	$database = new Database();
	$db = $database->getConnection();

	// Инициализация заметок
	$note = new Note($db); 
	$stmt = $note->conn;

	$content = file_get_contents("php://input");

	extract($_POST);

	
	$note->username = htmlspecialchars(strip_tags($username));
	$note->color = strip_tags($color);
	$note->title = htmlspecialchars(strip_tags($title));
	$note->content = htmlspecialchars(strip_tags($content));

	$note->create();

	

?>