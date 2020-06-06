<?php
// Conexion mysqli
include "../conexion/conexionli.php";

try {

	//Recibo valores con el metodo POST
	$nuevaClave = $_POST['clave'];
	$id_usuario = $_POST['id'];

	$fecha = date("Y-m-d"); 
	$hora  = date ("H: i: s");

	$cadena = "UPDATE usuarios SET contra = '$nuevaClave', fecha_registro = '$fecha' WHERE id_usuario = $id_usuario";

	$consultar = mysqli_query($conexionLi, $cadena);

	echo $cadena;

} catch (Exception $e) {
	echo $e;
}



?>