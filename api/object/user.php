<?php

	class User {

		private $id;
		public $login;
		public $email;
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
				WHERE login=:login";

			$stmt = $this->conn->prepare($query);

			$stmt->bindParam(':login', $this->login);

			$stmt->execute(); 

			if ($stmt->rowCount() == 0) {

				$query = "SELECT
					id FROM " . $this->table_name . " 
					WHERE email=:email";
				
					$stmt = $this->conn->prepare();
					$stmt->bindParam(':email', $this->email);
					$stmt->execute();

					if ($stmt->rowCount() == 0) {

						$query = "INSERT INTO " . $this->table_name . " (login, email, hash) VALUES (:login, :email, :hash)";
		
						$this->login.strip_tags(htmlspecialchars($this->login));
		
						$stmt = $this->conn->prepare($query);
		
						$stmt->bindParam(":login", $this->login);
						$stmt->bindParam(":email", $this->email);
						$stmt->bindParam(":hash", $this->hash);
		
						$stmt->execute();
		
						http_response_code(200);
						echo json_encode(array("message" => "Пользователь зарегистрирован"));

					} else {

						http_response_code(400);
						echo json_encode(array("message" => "Пользователь с таким Email уже существует"));
					}


			} else {

				http_response_code(400);
				echo json_encode(array("message" => "Пользователь с таким логином уже существует"));
			}
		}

		function auth() {

			$query = "SELECT
				login, email, hash FROM " . $this->table_name . " 
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
									"login"=>$row["login"]
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