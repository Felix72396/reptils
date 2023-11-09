<?php
    error_reporting(0);
    include_once "../includes/conexion.php";

    function getFotoName()
    {
        $name = $_POST["nombre_cientifico"] . "_" . $_FILES["foto"]["name"];
        $file = $_FILES["foto"]["tmp_name"];
        $error = $_FILES["foto"]["error"];
        $destination = "../pictures/$name";
        move_uploaded_file($file, $destination);

        return $name;
    }

    if($_POST)
    {
        $nombre_cientifico = $_POST["nombre_cientifico"];
        $nombre_comun = $_POST["nombre_comun"];
        $pais_de_origen = $_POST["pais_de_origen"];
        $extinto = $_POST["extinto"];
        $foto = getFotoName();

        $extinto = $extinto == true ? 1 : 0;

        $consulta = "insert into reptiles (nombre_cientifico, nombre_comun, pais_de_origen, extinto, foto) values (?, ?, ?, ?, ?)";
        $resultado = mysqli_prepare($cn, $consulta);
        mysqli_stmt_bind_param($resultado, "sssis", $nombre_cientifico, $nombre_comun, $pais_de_origen, $extinto, $foto);
        $ok = mysqli_stmt_execute($resultado);
        if($ok==true)
        {
            $response = Array("status" => 200, "statusText" => "Reptíl insertado");
        }
        else
        {
            $response = Array("status" => 404, "statusText" => "El reptíl no pudo ser insertado");
        }

        mysqli_stmt_close($resultado);
    }

    echo json_encode($response);
    exit;
?>
