<?php

// Conexion PDO
include'../conexion/conexionPDO.php';

try {
    
    $id_tema = $_POST["id_tema"];
    $nuevo_estado = $_POST["nuevo_estado"];

    $qry = "UPDATE temas SET activo = $nuevo_estado WHERE id_tema = $id_tema";
    $ejecutarQry = $conexion->prepare($qry);
    $ejecutarQry->execute();

    echo $qry;

} catch (PDOException $err) {
    
    echo $err->getMessage();
}

?>