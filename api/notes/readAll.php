<?php

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	require_once($_SERVER['DOCUMENT_ROOT'] . '/api/config/database.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/api/object/note.php');


	$database = new Database();
	$db = $database->getConnection();

	$note = new Note($db);

	$note->username = $_GET['username'];

	$note->readAll();



?>