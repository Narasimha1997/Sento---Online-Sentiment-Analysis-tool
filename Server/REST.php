<?php

    class Result {
        public $status;
        public $string;
    }

    $data = new Result(500, "HELLO");

    echo json_encode($data);


    include "./database.php";

    file_put_contents('php://stderr', print_r("Running database", TRUE));

    $db = new Database("localhost", "root", "Narasimha1997", "Sento");

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    file_put_contents('php://stderr', print_r($contentType, TRUE));

    if($contentType == "text/plain") {
        $content = trim(file_get_contents("php://input"));

        $decoded = json_decode($content, TRUE);

        file_put_contents('php://stderr', print_r($decoded, TRUE));
        
        $review = new Review();

        $review->email = $decoded['email'];
        $review->title = $decoded['title'];
        $review->description = $decoded['description'];
        $review->classification = $decoded['classification'];
        $review->probability = $decoded['probability'];
        header("Content-Type", "application/json");

        $result = $db->putReview($review);

        if($result) {
            $send = new Result();
            $send->status = TRUE;
            $send->string = "Successfully added to database";

            echo json_encode($send);
        }else {
            $send = new Result();
            $send->status = FALSE;
            $send->string = "Not added to database";

            echo json_encode($send);
        }

    }

?>