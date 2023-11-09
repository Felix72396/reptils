<?php
    error_reporting(0);
    include_once "../includes/conexion.php";

    function getFotoName()
    {
        if($_FILES["foto"]["name"] == "") 
            return "";

        $name = $_POST["nombre_cientifico"] . "_" . $_FILES["foto"]["name"];
        $file = $_FILES["foto"]["tmp_name"];
        $error = $_FILES["foto"]["error"];
        $destination = "../pictures/$name";
        move_uploaded_file($file, $destination);

        return $name;
    }

    if($_POST)
    {
        $id = $_POST["id"];
        $nombre_cientifico = $_POST["nombre_cientifico"];
        $nombre_comun = $_POST["nombre_comun"];
        $pais_de_origen = $_POST["pais_de_origen"];
        $extinto = $_POST["extinto"];
        $foto = getFotoName();

      

        $extinto = $extinto == true ? 1 : 0;

    
        if($foto != "")
        {
            include_once "../includes/obtener_foto.php";
           
            $foto_url = "../pictures/$foto_name";
            include_once "../includes/eliminar_foto.php";

            $consulta = "update reptiles set nombre_cientifico = ?, nombre_comun = ?, pais_de_origen = ?, extinto = ?, foto = ? where id = ?";
            $resultado = mysqli_prepare($cn, $consulta);
            mysqli_stmt_bind_param($resultado, "sssisi", $nombre_cientifico, $nombre_comun, $pais_de_origen, $extinto, $foto, $id);

        }
        else{
            $consulta = "update reptiles set nombre_cientifico = ?, nombre_comun = ?, pais_de_origen = ?, extinto = ? where id = ?";
            $resultado = mysqli_prepare($cn, $consulta);
            mysqli_stmt_bind_param($resultado, "sssii", $nombre_cientifico, $nombre_comun, $pais_de_origen, $extinto, $id);
        }
        
       
        $ok = mysqli_stmt_execute($resultado);
        if($ok==true)
        {
            $response = Array("status" => 200, "statusText" => "Reptíl actualizado");
        }
        else
        {
            $response = Array("status" => 404, "statusText" => "El reptíl no pudo ser actualizado");
        }

        mysqli_stmt_close($resultado);
    }

    echo json_encode($response);
    exit;
?>
