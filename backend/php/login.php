<?php
error_reporting(0);
include_once "../includes/conexion.php";

if ($_POST) {

    $consulta = "SELECT * FROM login WHERE usuario = ? AND contrasena = ?";
    $declaracion = mysqli_prepare($cn, $consulta);

    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];

    // Use parameter binding to prevent SQL injection
    mysqli_stmt_bind_param($declaracion, "ss", $usuario, $contrasena);

    // Execute the prepared statement
    mysqli_stmt_execute($declaracion);

    // Store the result for fetching
    mysqli_stmt_store_result($declaracion);

    // Get the number of rows returned by the query
    $rowCount = mysqli_stmt_num_rows($declaracion);

    if ($rowCount > 0) {
        $response = array(
            "status" => 200,
            "statusText" => "Credenciales correctas"
        );
    } else {
        $response = array(
            "status" => 404,
            "statusText" => "Las credenciales están incorrectas"
        );
    }
    $cn->close();


    echo json_encode($response);
}




exit;
?>