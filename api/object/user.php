<?php
	class User {

		private $id;
		public $username;
		public $lowerUsername;
		public $email;
		public $lowerEmail;
		public $password;
		public $hash;

		public $table_name = 'users';
		public $conn;

		function __construct($db) {
			$this->conn = $db;
		}

		function register() {

			$query = "SELECT
				id FROM " . $this->table_name . "
				WHERE LOWER(username)=:username";

			$stmt = $this->conn->prepare($query);

			$stmt->bindParam(':username', $this->lowerUsername);

			$stmt->execute(); 

			if ($stmt->rowCount() == 0) {

				$query = "SELECT
					id FROM " . $this->table_name . " 
					WHERE LOWER(email)=:email";
				
				$stmt = $this->conn->prepare($query);
				$stmt->bindParam(':email', $this->lowerEmail);
				$stmt->execute();

				if ($stmt->rowCount() == 0) {

					$query = "INSERT INTO " . $this->table_name . " (username, email, hash) VALUES (:username, :email, :hash)";
	
					$this->username.strip_tags(htmlspecialchars($this->username));
	
					$stmt = $this->conn->prepare($query);

	
					$stmt->bindParam(":username", $this->username);
					$stmt->bindParam(":email", $this->email);
					$stmt->bindParam(":hash", $this->hash);

					try {
						$stmt->execute();
						http_response_code(200);
						echo json_encode(array("message" => "Пользователь зарегистрирован", 'username'=>$this->username));
					} catch (PDOException $e) {
						http_response_code(405);
						echo json_encode(array('Error' => $e->getMessage()));
					}

	

				} else {

					http_response_code(401);
					echo json_encode(array("message" => "Пользователь с таким Email уже существует"), JSON_UNESCAPED_UNICODE);
				}


			} else {

				http_response_code(400);
				echo json_encode(array("message" => "Пользователь с таким логином уже существует"), JSON_UNESCAPED_UNICODE);
			}
		}

		function auth() {

			$query = "SELECT
				username, email, hash FROM " . $this->table_name . " 
				WHERE email =:email";

			$stmt = $this->conn->prepare($query);

			$stmt->bindParam(":email", $this->email);

			$stmt->execute();

			$count = $stmt->rowCount();

			$row = $stmt->fetch(PDO::FETCH_ASSOC);

			if ($count > 0) {

				if (password_verify($this->password, $row['hash'])) {
					
					http_response_code(200);
					echo json_encode(array(
									"Status"=>'Успех',
									"username"=>$row["username"],
					));
				} else {

					http_response_code(401);
					echo json_encode(array('Status'=>"Пароль не верный"));
				}
			} else {
				
				http_response_code(400);
				echo json_encode(array("Status"=>"Пользователь не найден"));
			}


		}
	}

?>