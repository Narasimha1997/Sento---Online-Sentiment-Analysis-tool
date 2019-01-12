<?php

   class Review {
       public $email;
       public $title;
       public $description;
       public $probability;
       public $classification;
   }

   class Database {
       
       private $conn;

       function __construct($host, $username, $password, $db) {
           $this->conn = mysqli_connect($host, $username, $password, $db);
           if(mysqli_connect_errno()) {
               echo "Falied to connect to DB";
           }
       }

       function putReview($review) {
           $email = $review->email;
           $title = $review->title;
           $description = $review->description;
           $probability = $review->probability;
           $classification = $review->classification;

           $query = "insert into REVIEWS values('$email', '$title', '$description', '$classification','$probability');";

           $value = $this->conn->query($query);

           if(!$value) {
               die("Unable to insert");
               return FALSE;
           }

           return TRUE;
       }
   }
?>