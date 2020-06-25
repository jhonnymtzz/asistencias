<?php

include "../conexion/conexionPDO.php";
$varGral = "-CT";

date_default_timezone_set("America/Monterrey");
$fecha_actual = new DateTime(date("Y-m-d")); 

try {
    
    $qry = "SELECT id_tema, nombre_tema, fecha_registro, hora_registro, activo FROM temas ORDER BY id_tema ASC";

    $ejecutarQry = $conexion->prepare($qry);
    $ejecutarQry->execute();

    ?>
    <div class="table-responsive">
        <table id="example<?php echo $varGral; ?>" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr class='hTabla'>
                    <th scope="col">#</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Exportar</th>
                    <th scope="col">Aplicar</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Creación</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Estado</th>
                </tr>
            </thead>
            <tbody>
    <?php

    $num_lista = 1;
    //Se recorren los registros mientras la fila presente datos
    while ($row = $ejecutarQry->fetch(PDO::FETCH_NUM)) {
        
        $id_tema = $row[0];
        $nombre_tema = $row[1];

        $fecha = new DateTime($row[2]);
        $dias_transcurridos = $fecha->diff($fecha_actual);

        $hora = $row[3];
        $hora = date("h:i a.", strtotime($hora));

        $estado = $row[4];
        if ($estado == 1) {
            $chkChecado    = "checked";
            $disabled = "";
            $chkValor      = "1";
        }else{
            $chkChecado    = "";
            $disabled = "disabled";
            $chkValor      = "0";
        }

        ?>
        <tr class="centrar">
            <th scope="row" class="textoBase">
                <?php echo $num_lista?>
            </th>
            <td>
                <button <?php echo $disabled ?> id="btnEditar<?php echo $varGral.$num_lista ?>" type="button" class="btn btn-outline-success btn-sm" onclick="llenarFormularioCT(<?php echo $id_tema ?>)">
                    <i class="far fa-edit fa-md"></i>
                </button>
            </td>
            <td>
                <button <?php echo $disabled ?> id="btnExportar<?php echo $varGral.$num_lista ?>" type="button" class="btn btn-outline-primary btn-sm" onclick="exportar(<?php echo $id_tema ?>)">
                    <i class="fas fa-file-export fa-md"></i>
                </button>
            </td>
            <td>
                <button <?php echo $disabled ?> id="btnAplicarTema<?php echo $varGral.$num_lista ?>" type="button" class="btn btn-outline-dark btn-sm" onclick="aplicarTema(<?php echo $id_tema ?>,'enlace')">
                    <i class="fas fa-fill-drip fa-md"></i>
                </button>
            </td>
            <td>
                <label class="textoBase">
                    <?php echo $nombre_tema ?>
                </label>
            </td>
            <td>
                <label class="textoBase">
                    <?php echo "hace ".$dias_transcurridos->days." días" ?>
                </label>
            </td>
            <td>
                <label class="textoBase">
                    <?php echo $hora ?>
                </label>
            </td>
            <td>
                <input value="<?php echo $chkValor?>" onchange="cambiarEstadoCT(<?php echo $id_tema?>,<?php echo $estado?>)" class="toggle-two" type="checkbox" <?php echo $chkChecado?> data-toggle="toggle" data-onstyle="outline-success" data-width="60" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="check<?php echo $varGral.$num_lista?>">
            </td>
        </tr>
        <?php

        $num_lista++;
    }

    ?>
                </tbody>
                <tfoot>
                    <tr class='hTabla'>
                        <th scope="col">#</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Exportar</th>
                        <th scope="col">Aplicar</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Creación</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Estado</th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <script type="text/javascript">
            var varGral='<?php echo $varGral?>';
            $(document).ready(function() {
                    $('#example'+varGral).DataTable( {
                        "language": {
                                // "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                                "url": "../plugins/dataTablesB4/langauge/Spanish.json"
                            },
                        "order": [[ 0, "asc" ]],
                        "paging":   true,
                        "ordering": true,
                        "info":     true,
                        "responsive": true,
                        "searching": true,
                        stateSave: true,
                        dom: 'Bfrtip',
                        lengthMenu: [
                            [ 10, 25, 50, -1 ],
                            [ '10 Registros', '25 Registros', '50 Registros', 'Todos' ],
                        ],
                        columnDefs: [ {
                            // targets: 0,
                            // visible: false
                        }],
                        buttons: [
                                {
                                    text: "<i class='fas fa-plus fa-lg' aria-hidden='true'></i> &nbsp;Nuevo Registro",
                                    className: 'btn btn-outline-success btnEspacio',
                                    id: 'btnNuevo',
                                    action : function(){
                                        nuevoRegistroCT();
                                    }
                                },
                                {
                                    text: "<i class='fas fa-file-import fa-lg' aria-hidden='true'></i> &nbsp;Importar Tema",
                                    className: 'btn btn-outline-primary btnEspacio',
                                    id: 'btnImportar',
                                    action : function(){
                                        abrirModalArchivo();
                                    }
                                },
                                {
                                    extend: 'excel',
                                    text: "<i class='far fa-file-excel fa-lg' aria-hidden='true'></i> &nbsp;Exportar a Excel",
                                    className: 'btn btn-outline-secondary btnEspacio',
                                    title:'Lista_temas_creados',
                                    id: 'btnExportar',
                                    exportOptions: {
                                        columns:  [4,5,6],
                                    }
                                }
                        ]
                    } );
                } );

            </script>
            <script>
                $('.toggle-two').bootstrapToggle();
            </script>
<?php

} catch (PDOException $err) {

    echo $err->getMessage();
}

?>