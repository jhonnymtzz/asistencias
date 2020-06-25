// Variable global para el nombre del módulo
var nombreModulo_CT = "Crear Temas";

// Función para llenar la tabla
function llenarListaCT(){
    abrirModalCarga('Cargando Lista');
    // $("#frmGuardar-CT")[0].reset();
    $("#Listado-CT").hide();
    $.ajax({
        url:"../mCrearTema/lista.php",
        type:"POST",
        dataType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado-CT").html(respuesta);
            $("#Listado-CT").fadeIn("slow");
            cerrarModalCarga();      
            // $("#nombre").focus();
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};

function cambiarEstadoCT(id_tema, estado){

    var nuevoEstado = (estado == 1) ? "0":"1";

    $.ajax({
        url: "../mCrearTema/cambiarEstado.php",
        type: "POST",
        dataType: "html",
        data: {id_tema: id_tema, nuevo_estado: nuevoEstado},
        success:function (res) {

            alertify.success("Se ha cambiado el estado correctamente");
            console.log({
                "Estado anterior": estado,
                "Estado nuevo": nuevoEstado,
                "Consulta BD": res
            });
            $("#check-CT"+id_tema).attr("onchange","cambiarEstadoCT("+id_tema+", "+nuevoEstado+")");

            if (nuevoEstado == "0") {
                $("#btnEditar-CT"+id_tema).attr("disabled", "disabled");
                $("#btnExportar-CT"+id_tema).attr("disabled", "disabled");
                $("#btnAplicarTema-CT"+id_tema).attr("disabled", "disabled");
            }else{
                $("#btnEditar-CT"+id_tema).removeAttr("disabled");
                $("#btnExportar-CT"+id_tema).removeAttr("disabled");
                $("#btnAplicarTema-CT"+id_tema).removeAttr("disabled");
            }
        },
        error:function (xhr, status) {

            console.log("Error en el método AJAX al cambiar el estado del tema.\nXHR: "+xhr+"\nSTATUS: "+status);
        }
    });
};

function nuevoRegistroCT(){

    $("#lblTitular").text(nombreModulo_CT);
    $("#badgeInfo").text("Nuevo registro");

    $("#Listado-CT").hide();
    $("#guardarEditar-CT").fadeIn();
    //Depende de este atributo la accion que se realizara al momento del submit
    $("#frmGuardarEditar-CT").attr("action","guardar");
    $("#btnGuardar-CT").html("<i class='fa fa-save fa-lg'></i> Guardar tema");

    $("#id_tema").val("");
    $("#nombreTema").val("");
    $("input[type='color']").val("#000000");

    $("#nombreTema").focus();
    
};

function llenarFormularioCT(id_tema){

    $("#lblTitular").text(nombreModulo_CT);
    $("#badgeInfo").text("Editar registro");

    $("#Listado-CT").hide();
    $("#guardarEditar-CT").fadeIn();
    //Depende de este atributo la accion que se realizara al momento del submit
    $("#frmGuardarEditar-CT").attr("action","editar");
    $("#btnGuardar-CT").html("<i class='fa fa-save fa-lg'></i> Actualizar");

    $("#nombreTema").focus();

    $.ajax({
        url: "../mCrearTema/datosEditar.php",
        type: "POST",
        dataType: "html",
        data: {id_tema: id_tema},
        success:function(res){

            var arrayDatos = eval(res);
            console.log({Datos: arrayDatos.toString()});

            $("#id_tema").val(arrayDatos[0]);
            $("#nombreTema").val(arrayDatos[1]);
            $("#colorLetra").val(arrayDatos[2]);
            $("#colorBase").val(arrayDatos[3]);
            $("#colorBaseFuerte").val(arrayDatos[4]);
            $("#colorBorde").val(arrayDatos[5]);

        },
        error:function(xhr, status){
            console.log({Mensaje: "Error en el método AJAX", XHR: xhr, STATUS: status});
        }
    });
};

$("#btnCancelar-CT").click(function(){

    verCrearTemas();
});