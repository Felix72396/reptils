<?php
    error_reporting(0);
    include_once "../includes/conexion.php";

    $consulta = "select * from reptiles";

    $resultado = mysqli_query($cn, $consulta);

    $reptiles = array();

    while($row = mysqli_fetch_assoc($resultado))
    {
        $reptiles[] = $row;
    }


    echo json_encode($reptiles);

?>