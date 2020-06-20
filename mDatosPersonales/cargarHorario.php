<?php
// Conexion mysqli
include'../conexion/conexionPDO.php';

try {
	$arrayHorario = json_decode($_POST["arrayHorario"]);
	// var_dump($arrayHorario);
	$lun_in = $arrayHorario[0];
	$lun_out = $arrayHorario[1];
	$mar_in = $arrayHorario[2];
	$mar_out = $arrayHorario[3];
	$mie_in = $arrayHorario[4];
	$mie_out = $arrayHorario[5];
	$jue_in = $arrayHorario[6];
	$jue_out = $arrayHorario[7];
	$vie_in = $arrayHorario[8];
	$vie_out = $arrayHorario[9];
	$sab_in = $arrayHorario[10];
	$sab_out = $arrayHorario[11];
	$dom_in = $arrayHorario[12];
	$dom_out = $arrayHorario[13];

	$id_datos = $_POST["id_datos"];
	$tieneHorario = $_POST["tieneHorario"];
	$id_horario = $_POST["id_horario"];
	$id_usuario_reg = $_POST["id_usuario_reg"];
	$turno = $_POST["turno"];
	$logTexto = $_POST["logTexto"];

	date_default_timezone_set("America/Monterrey");
	$fecha=date("Y-m-d"); 
	$hora=date ("H:i:s");

	if ($tieneHorario == "si") {
		$cadena = "UPDATE horarios SET 
					id_datos_persona = $id_datos, 
					turno = '$turno',
					l_entrada = '$lun_in',
					l_salida = '$lun_out',
					m_entrada = '$mar_in',
					m_salida = '$mar_out',
					mi_entrada = '$mie_in',
					mi_salida = '$mie_out',
					j_entrada = '$jue_in',
					j_salida = '$jue_out',
					v_entrada = '$vie_in',
					v_salida = '$vie_out',
					s_entrada = '$sab_in',
					s_salida = '$sab_out',
					d_entrada = '$dom_in',
					d_salida = '$dom_out',
					id_usuario_registro = $id_usuario_reg,
					fecha_registro = '$fecha',
					hora_registro = '$hora'
					WHERE id_horario = $id_horario";
	}
	else{
		$cadena = "INSERT INTO horarios(id_datos_persona, turno, l_entrada, l_salida, m_entrada, m_salida, mi_entrada, mi_salida, j_entrada, j_salida, v_entrada, v_salida, s_entrada, s_salida, d_entrada, d_salida, id_usuario_registro, fecha_registro, hora_registro)
		VALUES($id_datos, '$turno','$lun_in','$lun_out','$mar_in','$mar_out','$mie_in','$mie_out','$jue_in','$jue_out','$vie_in','$vie_out','$sab_in','$sab_out','$dom_in','$dom_out', $id_usuario_reg,'$fecha','$hora')";
	}

	$consulta = $conexion->prepare($cadena);
	$consulta->execute();

	$consulta_log = $conexion->prepare("INSERT INTO log(actividad, usuario_ejecuta, fecha_registro, hora_registro)
										VALUES('$logTexto', $id_usuario_reg, '$fecha', '$hora')");
	$consulta_log->execute();
	
	echo $cadena;
	
} catch (PDOException $error) {
	
	echo $error->getMessage();
}
