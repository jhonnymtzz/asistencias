<?php
// Conexion mysqli
include'../conexion/conexionPDO.php';

try {


    $id_horario = $_POST["id_horario"];

	$consulta = $conexion->prepare("SELECT l_entrada, l_salida, m_entrada, m_salida, mi_entrada, mi_salida, j_entrada, j_salida, v_entrada, v_salida,s_entrada, s_salida, d_entrada, d_salida FROM horarios WHERE id_horario = $id_horario");

	$consulta->execute();
	$row_registro = $consulta->fetch(PDO::FETCH_NUM);

	$array_json = json_encode($row_registro);
	echo $array_json;

	
} catch (PDOException $error) {
	
	echo $error->getMessage();
}
