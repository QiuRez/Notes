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

	if (!empty($_GET['note_id'])) {
		
		$note_id = htmlspecialchars(strip_tags($_GET['note_id']));

		$note->note_id = $note_id;

		$note->delete();

	}

	



?>