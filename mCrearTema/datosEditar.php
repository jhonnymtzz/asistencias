<?php

include "../conexion/conexionPDO.php";

try {
    
    $id_tema = $_POST["id_tema"];

    $qry = "SELECT id_tema, nombre_tema, color_letra, color_base, color_base_fuerte, color_borde FROM temas
            WHERE id_tema = $id_tema";

    $ejecutarQry = $conexion->prepare($qry);
    $ejecutarQry->execute();

    $registro = $ejecutarQry->fetch(PDO::FETCH_NUM);
    $array_json = json_encode($registro);

    echo $array_json;


} catch (PDOException $err) {

    echo $err->getMessage();
}


?>