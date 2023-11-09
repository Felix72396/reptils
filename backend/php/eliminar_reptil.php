<?php
error_reporting(0);
include_once "../includes/conexion.php";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = intval(mysqli_real_escape_string($cn, $data["id"]));
    // $id = $data["id"];

    $foto_url = mysqli_real_escape_string($cn, $data["foto_url"]);

    $consulta = "delete from reptiles where id = ?";
    $resultado = mysqli_prepare($cn, $consulta);
    mysqli_stmt_bind_param($resultado, "i", $id);

    $ok = mysqli_stmt_execute($resultado);
    if ($ok == true) {
        // this code removes the picture from a folder
        include_once "../includes/eliminar_foto.php";

        $response = array("status" => 200, "statusText" => "Reptíl eliminado");
    } else {
        $response = array("status" => 404, "statusText" => "El reptíl no pudo ser eliminado");
    }

    mysqli_stmt_close($resultado);
}

//   echo $id;
// echo json_encode($data);

echo json_encode($response);
exit;

?>