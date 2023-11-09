<?php
$hostname = "localhost";
$username = "root";
$password = "";
$dbname   ="reptiles_db";

$cn = mysqli_connect($hostname, $username, $password, $dbname);

if ($cn->connect_errno) 
{
    die("Error al conectar con MySQL: " . $cn->connect_error);
}

mysqli_set_charset($cn, "utf8");

?>