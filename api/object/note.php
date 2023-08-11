<?php 

	class Note {

		public $id;
		public $data;

		private $table_name = 'notes';
		public $conn;

		public $userLogin;
		public $userHash;

		function __construct($db) {
			$this->conn = $db;
		}

		function readAll() {

			$query = "SELECT 
				n.*, u.login_hash 
			FROM notes n 
			INNER JOIN users u 
				on n.user_login = u.login 
					WHERE u.login_hash =:login_hash";

			$stmt = $this->conn->prepare($query);
			
			// $stmt->bindParam(':user_login', $this->userLogin);
			$stmt->bindParam(':login_hash', $this->userHash);

			$stmt->execute();

			if ($stmt->rowCount() == 0) {
				http_response_code(204);
				echo json_encode(array());
			} else {

				$notes_arr = array();
	
				while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
					$note_item = array(
						'note_id' => $row['note_id'],
						'title' => $row['title'],
						'content' => $row['content'],
						'color' => $row['color'],
						'created_at' => $row['created_at'],
						'modified_at' => $row['modified_at'],
					);
			
					array_push($notes_arr, $note_item);
				}


				http_response_code(200);
				echo json_encode($notes_arr);

			}




			
		}

		
		
	}

?>