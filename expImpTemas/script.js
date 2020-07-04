function exportar(id_tema){

    valor = id_tema;
    console.log("El ID del tema a exportar es: "+valor);

    $.ajax({
        url:"../expImpTemas/exportar.php",
        type:"POST",
        dateType:"html",
        data:{valor},
        success:function(respuesta){
           // console.log(respuesta);
            preloader(1,"Generando archivo JSON","Se ha importado el archivo de manera exitosa !");
            
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

// $("#btnExportar").click(function(){
//     exportar();
// });

// $("#btnImportar").click(function(){
//     abrirModalArchivo();
// });

function abrirModalArchivo() {
    $("#modalArchivo").modal("show");
    // $("#formSubida2")[0].reset();
}

//llenar combo
function combo_temas()
{
    $.ajax({
        url : '../expImpTemas/comboTemas.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#listaTemas").empty();
            $("#listaTemas").html(respuesta);    
            selectTwo();
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}

$(document).ready(function () {

    $( ".select2" ).select2({
        theme: "bootstrap4",
        placeholder: 'Seleccione...'
    });

    combo_temas();
    
});

function selectTwo(){
    $( ".select2" ).select2({
        theme: "bootstrap4",
        placeholder: 'Seleccione...'
    });
}

function preloader(seg,mensaje,alerta){
    var s=parseInt(seg)*1000;
    abrirModalCarga(mensaje);
    setTimeout(function() {

        cerrarModalCarga(alerta);
    },s);
}

function abrirModalCarga(mensaje) {
    $("#modalCarga").modal("show");
    $("#msjCarga").text(mensaje);
}

function cerrarModalCarga(alerta="Se ha ejecutado la acción exitosamente") {
    alertify.success(alerta,1);
    $("#modalCarga").modal("hide");
}

function importarArchivo(){
    var files = $('#image2')[0].files[0];

    if (files) {
        var archivo=files.name;
        var fileExtension = archivo.split(".")[1];

        if (fileExtension == "json") {

            var ruta= "../expImpTemas/Temas/"+archivo;
            console.log(ruta);
            
            $.getJSON(ruta, function(data){
                //for para decorre las propiedades
                for(tema in data){

                    var nombre_tema       = data[tema].nombre_tema;
                    var color_letra       = data[tema].color_letra;
                    var color_base        = data[tema].color_base;
                    var color_base_fuerte = data[tema].color_base_fuerte;
                    var color_borde       = data[tema].color_borde;
                    var fecha_registro    = data[tema].fecha_registro;
                    var hora_registro     = data[tema].hora_registro;

                    $.ajax({
                        url:"../expImpTemas/importar.php",
                        type:"POST",
                        dateType:"html",
                        data:{nombre_tema,color_letra,color_base,color_base_fuerte,color_borde,fecha_registro,hora_registro},
                        success:function(respuesta){
                            console.log(respuesta);
                            var bandera=respuesta;
                            if (bandera==0) {
                                preloader(1,"Importando Tema ...");
                                $("#modalArchivo").modal("hide");
                                llenarListaCT();
                            }else{
                                swal({
                                    title: "Error!",
                                    text: "Ya existe un tema con el nombre "+nombre_tema,
                                    type: "error",
                                    confirmButtonClass: "btn-dark",
                                    confirmButtonText: "Enterado"
                                }, function (isConfirm) {
                                    alertify.message("Gracias !");
                                });
                            }
                        
                        },
                        error:function(xhr,status){
                            alert("Error en metodo AJAX"); 
                        },
                    });
                }
            });
        }
        else{
            console.log("Formato de archivo no válido");
            Swal.fire("Error","El formato del archivo no es válido", "error");
        }
    }
    else{
        console.log("No ha ingresado ningun archivo");
        Swal.fire("Error","No se ha ingresado ningun archivo", "error");
    }  
}

