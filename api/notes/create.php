<?php 

	header("Allow-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Allow-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	require_once "../config/database.php";
	require_once "../object/product.php";

	// Инициализация базы данных
	
	$database = new Database();
	$db = $database->getConnection();

	// Инициализация продукта

	// $product = new Product($db);

	$data = json_decode(file_get_contents("php://input"));

	if(
		!empty($data->name) &&
		!empty($data->price) &&
		!empty($data->description) &&
		!empty($data->created) &&
		!empty($data->category_id)
	) {
		$product->name = $data-> name;
		$product->price = $data->price;
		$product->description = $data->description;
		$product->category_id = $data->category_id;
		$product->created = date("Y-m-d H:i:s");

		if($product->create()) {
			http_response_code(201);

			echo json_encode(array("message"=>"Товар создан"), JSON_UNESCAPED_UNICODE);
		} else {
			http_response_code(503);

			echo json_encode(array("message"=>"Ошибка при внесении"), JSON_UNESCAPED_UNICODE);
		}
	} else {
		http_response_code(400);

		echo json_encode(array("message"=>"Не все данные заполнены"), JSON_UNESCAPED_UNICODE);
	}

?>