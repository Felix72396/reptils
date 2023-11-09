<?php
if (file_exists($foto_url)) {
    unlink($foto_url);
    // // Intenta eliminar la imagen
    // if (unlink($foto_url)) {
    //     echo "La imagen ha sido eliminada correctamente.";
    // } else {
    //     echo "No se pudo eliminar la imagen. Verifica los permisos de la carpeta.";
    // }
}
?>