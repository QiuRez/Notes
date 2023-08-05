<?php 

	header("Content-Type: application/json; charset=UTF-8");

	require_once "../config/database.php";
	require_once "../object/product.php";

	// Инициализация базы данных

	$database = new Database();
	$db = $database->getConnection();

	// Инициализация продукта

	$product = new Note($db);

	// Получение данных из базы данных
	// $stmt = $product->read();
	$num = $stmt->rowCount();


	if($num > 0) {
		$products_arr = array();

		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			extract($row);

			$product_item = array(
				"id" => $id,
				"name" => $name,
				"price" => $price,
				"description" => $description,
				"category_id" => $category_id,
				"created" => $created
			);

			array_push($products_arr, $product_item);
		}

		http_response_code(200);

		echo json_encode($products_arr, JSON_UNESCAPED_UNICODE);
		
	} else {
		http_response_code(404);

		echo json_encode(array("message" => "Ошибка получения товаров"), JSON_UNESCAPED_UNICODE);
	}

	

?>