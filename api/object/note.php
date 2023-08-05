<?php 

	class Note {

		public $id;
		public $data;

		private $table_name = 'products';
		public $conn;

		function __construct($db) {
			$this->conn = $db;
		}

		
		
	}

?>