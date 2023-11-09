<?php
error_reporting(0);
include_once "../includes/conexion.php";

$foto_name = "";

if (isset($_POST['id'])) {
    // POST the "id" parameter value and convert it to an integer
    $id = intval($_POST['id']);

    // Prepare the query using a placeholder for the parameter
    $consulta = "SELECT foto FROM reptiles WHERE id = ?";

    // Create a prepared statement
    $stmt = mysqli_prepare($cn, $consulta);

    // Bind the parameter to the prepared statement
    mysqli_stmt_bind_param($stmt, "i", $id);

    // Execute the prepared statement
    mysqli_stmt_execute($stmt);

    // Get the result set
    $resultado = mysqli_stmt_get_result($stmt);

    $row = mysqli_fetch_assoc($resultado);
    if ($row) {
        $foto_name = $row['foto'];
    }

    // Close the statement
    mysqli_stmt_close($stmt);
}
