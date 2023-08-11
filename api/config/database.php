<?php 

	class Database {

		private $database = 'notes';
		private $host = 'localhost';
		private $username = 'root';
		private $password = '';

		public $conn;

		public function getConnection() {
			$this->conn = null;

			try {
				$this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->database, $this->username, $this->password);
				$this->conn->exec("set names UTF8");
			} catch (PDOException $e) {
				echo "Ошибка соединения: " . $e->getMessage();
			}

			return $this->conn;
		}
	}

?>