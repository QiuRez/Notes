<?php 

	class Note {

		public $id;
		public $data;
		public $username;
		public $note_id;
		public $title;
		public $content;
		public $color;
		public $created_at;
		private $table_name = 'notes';
		public $conn;
		
		
		
		function __construct($db) {
			$this->conn = $db;
		}

		function readAll() {

			$query = "SELECT 
				n.*, u.username
			FROM notes n 
			INNER JOIN users u 
				on n.username = u.username
					WHERE u.username =:username";

			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(':username', $this->username);

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

		function delete() {
		
			$query = "DELETE
			FROM " . $this->table_name . "
			WHERE note_id =:note_id
			LIMIT 1";

			$stmt = $this->conn->prepare($query);
	
			$stmt->bindParam(':note_id', $this->note_id);
	
			$res = $stmt->execute();

			if ($res) {
				http_response_code(200);
				echo json_encode(array("status" => "ok"));
			} else {
				http_response_code(400);
				echo json_encode(array("status" => "not ok"));
			}
		
		}


		function create() {

			$query = "INSERT INTO
			" . $this->table_name . "
				(username, title, content, color, created_at)
			VALUES
				(:username, :title, :content, :color, :created_at)";

			$stmt = $this->conn->prepare($query);

			$stmt->bindParam(':username', $this->username);
			$stmt->bindParam(':title', $this->title);
			$stmt->bindParam(':content', $this->content);
			$stmt->bindParam(':color', $this->color);
			$stmt->bindParam(':created_at', date("Y-n-j"));

			$res = $stmt->execute();

			if ($res) {
				http_response_code(200);
				echo json_encode(array("status"=>"ok"));
			} else {
				http_response_code(400);
				echo json_encode(array("status"=>"no", "error" => $res->errorInfo()));
			}
		}

		
		
	}

?>