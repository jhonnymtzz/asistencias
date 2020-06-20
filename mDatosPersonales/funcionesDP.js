//VARIABLE GLOBAL PARA NOMBRAR LOS ELEMENTOS DE LOS  FORMULARIOS
//DATOS PERSONALES -DP 
var nombreModulo_DP="Datos Personales";

function cambiarTurno(){

    var turno = $("#turno").val();
    console.log(turno);

    if (turno == "esp") {
        $(".habDes").removeAttr("disabled");
        $("#horas").val("0 hrs.");
        $(".habDes").val("00:00:00");

        $("#btn_guardar").attr("disabled","disabled");
        $(".habDes").removeClass("border-danger");
        $("label.diasSemana").removeClass("text-success");
    }
    else if (turno == "null") {
        $(".habDes").attr("disabled", "disabled");
        $("#horas").val("0 hrs.");
        $(".habDes").val("00:00:00");
 
        $("#btn_guardar").attr("disabled","disabled");
        $(".habDes").removeClass("border-danger");
        $("label.diasSemana").removeClass("text-success");
    }
    else if (turno == "mat") {
        
        $("#horas").val("30 hrs.");
        $(".habDes").val("00:00:00");
        $("#lun_in").val("06:00:00");
        $("#lun_out").val("12:00:00");
        $("#mar_in").val("06:00:00");
        $("#mar_out").val("12:00:00");
        $("#mie_in").val("06:00:00");
        $("#mie_out").val("12:00:00");
        $("#jue_in").val("06:00:00");
        $("#jue_out").val("12:00:00");
        $("#vie_in").val("06:00:00");
        $("#vie_out").val("12:00:00");
        $(".habDes").attr("disabled", "disabled");
        
        $("label.diasSemana").removeClass("text-success");
        $("#lbl_lun, #lbl_mar, #lbl_mie, #lbl_jue, #lbl_vie").addClass("text-success");

        $("#btn_guardar").removeAttr("disabled");
    }
    else if (turno == "ves") {
        
        $("#horas").val("30 hrs.");
        $(".habDes").val("00:00:00");
        $("#lun_in").val("12:00:00");
        $("#lun_out").val("18:00:00");
        $("#mar_in").val("12:00:00");
        $("#mar_out").val("18:00:00");
        $("#mie_in").val("12:00:00");
        $("#mie_out").val("18:00:00");
        $("#jue_in").val("12:00:00");
        $("#jue_out").val("18:00:00");
        $("#vie_in").val("12:00:00");
        $("#vie_out").val("18:00:00");
        $(".habDes").attr("disabled", "disabled");
        
        $("label.diasSemana").removeClass("text-success");
        $("#lbl_lun, #lbl_mar, #lbl_mie, #lbl_jue, #lbl_vie").addClass("text-success");

        $("#btn_guardar").removeAttr("disabled");
    }
    else if (turno == "noc") {
        
        $("#horas").val("30 hrs.");
        $(".habDes").val("00:00:00");
        $("#lun_in").val("18:00:00");
        $("#lun_out").val("24:00:00");
        $("#mar_in").val("18:00:00");
        $("#mar_out").val("24:00:00");
        $("#mie_in").val("18:00:00");
        $("#mie_out").val("24:00:00");
        $("#jue_in").val("18:00:00");
        $("#jue_out").val("24:00:00");
        $("#vie_in").val("18:00:00");
        $("#vie_out").val("24:00:00");
        $(".habDes").attr("disabled", "disabled");
        
        $("label.diasSemana").removeClass("text-success");
        $("#lbl_lun, #lbl_mar, #lbl_mie, #lbl_jue, #lbl_vie").addClass("text-success");

        $("#btn_guardar").removeAttr("disabled");
    }
};

function contarHoras(){

    var diasShort = ["lun","mar","mie","jue","vie","sab","dom"];
    //Cuento el número de horas y las muestro
    var total = 0;
    for (var i = 0; i <= 6; i++) {
        
        var d = diasShort[i];
        var v_entrada = parseInt(($("#"+d+"_in").val()).substr(0, 2));
        var v_salida = parseInt(($("#"+d+"_out").val()).substr(0, 2));

        if (v_salida < v_entrada || v_salida == v_entrada) {
            //No hace nada, o sea no lo cuenta
            $("#lbl_"+d).removeClass("text-success");
        }
        else{
            total = total + (v_salida - v_entrada);
            $("#lbl_"+d).addClass("text-success");
        } 
    }

    $("#horas").val(total+" hrs.");
    if (total >= 30) {
        $("#btn_guardar").removeAttr("disabled");
    } else {
        $("#btn_guardar").attr("disabled","disabled");
    }
};

function validarHoras(indexDia, inOut){

    var inout = "";
    if (inOut == 0) {
        inout = "in";
    } else {
        inout = "out";
    }
    var diasShort = ["lun","mar","mie","jue","vie","sab","dom"];
    var dia = diasShort[indexDia];

    //Solo se valida cuando ya se ingresó el segundo valor, es decir, el de salida
    if (inout == "out" || (inout == "in" && $("#"+dia+"_out").val().toString() != "00:00:00")) {

        var valor_entrada = ($("#"+dia+"_in").val()).substr(0, 2);
        var valor_salida = ($("#"+dia+"_out").val()).substr(0, 2);

        console.log("Dia: "+dia+"\n"+"Entrada: " + valor_entrada + "\n" + "Salida: " + valor_salida);

        if (valor_salida < valor_entrada) {
            $("#"+dia+"_in").val("00:00:00");
            $("#"+dia+"_out").val("00:00:00");
            $("#lbl_"+dia).removeClass("text-success");
            $("#msj").removeAttr("hidden");
        }
        else if (valor_salida == valor_entrada && (valor_salida != 00 && valor_entrada != 00)) {
            $("#"+dia+"_in").val("00:00:00");
            $("#"+dia+"_out").val("00:00:00");
            $("#lbl_"+dia).removeClass("text-success");
            $("#msj").removeAttr("hidden");
        } 
        else {
            // $("#"+dia+"_in").removeClass("border-danger");
            // $("#"+dia+"_out").removeClass("border-danger");
            $("#msj").attr("hidden", "hidden");

            if (valor_salida != 00 && valor_entrada != 00) { 
                $("#lbl_"+dia).addClass("text-success");
            }
        } 
    }
    //Cuento las horas donde ambos inputs sean diferentes a 00:00:00
    contarHoras();
};


function abrirModalHorario(id_datos, fullName, tieneHorario, id_horario, turno){

    var log = "Sin log aparente...";
    var titulo = "Sin titulo...";
    //Se preestablecen el titulo y el log --------------------------------
    if (tieneHorario == "si") {
        log = "Se ha actualizado el horario para la persona "+ fullName;
        titulo = "Modificar horario";

    } else {
        log = "Se ha creado un horario para la persona "+ fullName;
        titulo = "Crear horario";
    }
    // -------------------------------------------------------------------
    
    var tagHoras = "<input id='horas' name='horas' class='form-control bg-white' readonly value='0 hrs.'></input>";
    var selectTurnos = "<select id='turno' name='turno' class='form-control' onchange='javascript: cambiarTurno();'>"+
                        "<option value='null'>-- Selecciona un turno de la lista --</option>"+
                        "<option value='esp'>Especial</option>"+
                        "<option value='mat'>Matutino</option>"+
                        "<option value='ves'>Vespertino</option>"+
                        "<option value='noc'>Nocturno</option>"+
                        "</select>";

    var opcionesHoras = "";
    var opcionHora = "";

    for (var i = 0; i <= 24; i++) {
        if (i <= 9) {
            opcionHora = "0"+i+":00";
        }
        else{
            opcionHora = i+":00";
        }

        opcionesHoras = opcionesHoras + "<option value='"+opcionHora+":00'>"+opcionHora+"</option>"
    }

    var selectsPorDia = "";
    var diasFull = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    var diasShort = ["lun","mar","mie","jue","vie","sab","dom"];

    for (var j = 0; j <= 6; j++) {

        selectsPorDia = selectsPorDia +
                        "<div class='row w-100 m-0 text-left'>"+
                        "<div class='col-md-4 p-1 text-center'><label class='diasSemana' id='lbl_"+diasShort[j]+"'>"+diasFull[j]+"</label></div>"+
                        "<div class='col-md-4 p-1'>"+
                        "<select id='"+diasShort[j]+"_in' name='"+diasShort[j]+"_in' onchange='validarHoras("+j+",0)' disabled class='habDes form-control'>"+
                        opcionesHoras+
                        "</select>"+
                        "</div>"+
                        "<div class='col-md-4 p-1'>"+
                        "<select id='"+diasShort[j]+"_out' name='"+diasShort[j]+"_out' onchange='validarHoras("+j+",1)' disabled class='habDes form-control'>"+
                        opcionesHoras+
                        "</select>"+
                        "</div>"+
                        "</div>";    
    }

    Swal.fire({
        title: titulo + "&nbsp; <p class='text-muted'>"+ fullName +"</p>",
        width: '650px',
        html:
        "<br>"+
        "<div class='row w-100 m-0 text-left'>"+
        "<div class='col-md-6 p-1'><label for='turno'><b>Turno:</b></label>"+ selectTurnos +"</div>"+
        "<div class='col-md-6 p-1'><label for='horas'><b>Cantidad de horas:</b></label>"+ tagHoras +"</div>"+
        "</div>"+
        "<br><br>"+
        // Fila 0 = TITULOS
        "<div class='row w-100 m-0 text-center'>"+
        "<div class='col-md-4 p-1 border-bottom'><label><b>Día de la semana</b></label></div>"+
        "<div class='col-md-4 p-1 border-left border-right border-bottom'><label><b>Hora de entrada</b></label></div>"+
        "<div class='col-md-4 p-1 border-bottom'><label><b>Hora de salida</b></label></div>"+
        "</div>"+
        selectsPorDia+
        "<br><br>"+
        "<div class='row w-100 m-0'>"+
        "<div class='col-md-8 p-0 text-left text-danger d-flex align-items-end' style='font-size:22px'><small id='msj' hidden><i class='fas fa-exclamation-circle fa-sm'></i> La hora de entrada debe ser menor a la de salida.</small></div>"+
        "<div class='col-md-4 p-0 text-right'><button disabled id='btn_guardar' onclick='Swal.clickConfirm();' class='btn btn-outline-success'><i class='fa fa-save'></i> Guardar cambios</button></div>"+
        "</div>",
        showConfirmButton: false,
        onOpen: function(){
            // console.log("Escuchando");
            $("#turno").focus();
            //Si tiene horario, igualo a los valores guardados
            if(tieneHorario == "si") {

                $("#turno").val(turno);

                if (turno == "mat" || turno == "ves" || turno == "noc") {
                    
                    cambiarTurno();
                }
                else{
                    $.ajax({
                        url:"../mDatosPersonales/getHorario.php",
                        type:"POST",
                        dateType:"html",
                        data:{id_horario: id_horario},
                        success:function(respuesta){
                            
                            var arrayHorario = eval(respuesta);
                            console.log(arrayHorario);
                            var inOut = ["in","out"];
                            var indexArray = 0;
    
                            for (var i = 0; i <= 6; i++) {
                                for (var j = 0; j <= 1; j++) {
                                    
                                    $("#"+diasShort[i]+"_"+inOut[j]).val(arrayHorario[indexArray]);
                                    indexArray++;
                                }
                            }

                            $(".habDes").removeAttr("disabled");
                            contarHoras();
                        },
                        error:function(xhr,status){
                            alert("Error en metodo AJAX:\n"+xhr+"\n"+status); 
                        },
                    });
                }
            }
            else{
                cambiarTurno();
            }
        },
        showCloseButton: true
    }).then((result) => { 
         // se lee el evento SwalclickConfirm ejecutado a traves del button btn_cambiar
        if (result.value) {
            //Cargo el horario en un array que voy a pasar como JSON a traves de POST
            var arrayHorario = [];
            for (var i = 0; i <= 6; i++) {         
                
                arrayHorario.push($("#"+diasShort[i]+"_in").val());
                arrayHorario.push($("#"+diasShort[i]+"_out").val());
                
            }

            console.log("Array con los datos a guardar:\n"+ arrayHorario);
            var nuevoTurno = $("#turno").val();
            //Primero pregunto si desea guardar los cambios recientes
            Swal.fire({
                title: titulo,
                text: "Se guardarán los cambios ¿estas seguro de continuar?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) =>{
                //Si responde SI procedo a hacer la carga en el sistema
                if (result.value) {
                    $.ajax({
                        url:"../mDatosPersonales/cargarHorario.php",
                        type:"POST",
                        dateType:"html",
                        data:{id_datos: id_datos, tieneHorario: tieneHorario, id_horario: id_horario, id_usuario_reg: idUsuario, turno: nuevoTurno, logTexto: log, arrayHorario: JSON.stringify(arrayHorario)},
                        success:function(respuesta){
                            
                            console.log(respuesta);
                            Swal.fire("Hecho", log, "success");
                            llenar_lista_DP();
                        },
                        error:function(xhr,status){
                            alert("Error en metodo AJAX:\n"+xhr+"\n"+status); 
                        },
                    });
                }
            });
        }
    });
};


$("#frmGuardar-DP").submit(function(e){

    var clave    = $("#clave").val();
    var nombre    = $("#nombre").val();
    var apPaterno = $("#apPaterno").val();
    var apMaterno = $("#apMaterno").val();
    var fNac      = $("#fNac").val();
    var correo    = $("#correo").val();
    var curp      = $("#curp").val();
    var domicilio = $("#domicilio").val();
    var sexo      = $("#sexo").val();
    var ecivil    = $("#ecivil").val();

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Guardar la información?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Si deseo guardarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url:"../mDatosPersonales/guardar.php",
                type:"POST",
                dateType:"html",
                data:{clave,nombre,apPaterno,apMaterno,fNac,correo,curp,domicilio,sexo,ecivil},
                success:function(respuesta){
                    
                    $("#guardar-DP").hide();
                    llenar_lista_DP();
                    $("#frmGuardar-DP")[0].reset();
                    selectTwo();
                    alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#nombre').focus();
                    actividad  ="Se insertado un nuevo registro a la tabla "+nombreModulo_DP;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad,idUser);
        
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

    e.preventDefault();
    return false;
});

$("#frmActualizar-DP").submit(function(e){

    var id        = $("#eId").val();
    var nombre    = $("#eNombre").val();
    var apPaterno = $("#eApPaterno").val();
    var apMaterno = $("#eApMaterno").val();
    var fNac      = $("#eFnac").val();
    var correo    = $("#eCorreo").val();
    var curp      = $("#eCurp").val();
    var clave     = $("#eClave").val();
    var domicilio = $("#eDomicilio").val();
    var sexo      = $("#eSexo").val();
    var ecivil    = $("#eEcivil").val();

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Actualizar la información?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Si deseo actualizarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url:"../mDatosPersonales/actualizar.php",
                type:"POST",
                dateType:"html",
                data:{clave,id,nombre,apPaterno,apMaterno,fNac,correo,curp,clave,domicilio,sexo,ecivil},
                success:function(respuesta){
                    //console.log(respuesta);
                    llenar_lista_DP();
                        $("#frmGuardar-DP")[0].reset();
                        $("#frmActualizar-DP")[0].reset();
                        alertify.success("<i class='fa fa-bolt fa-lg'></i>", 2);
                    $("#btnCancelarG-DP , #btnCancelarA-DP").click();
                    actividad  ="Se ha modificado un registro de la tabla tabla "+nombreModulo_DP;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad,idUser);
                    
                    $('#nombre').focus();
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

    e.preventDefault();
    return false;
});

function llenar_lista_DP(){
    abrirModalCarga('Cargando Lista');
    $("#frmGuardar-DP")[0].reset();
    $("#Listado-DP").hide();
    $.ajax({
        url:"../mDatosPersonales/lista.php",
        type:"POST",
        dateType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado-DP").html(respuesta);
            $("#Listado-DP").fadeIn("slow");
            cerrarModalCarga();      
            $("#nombre").focus();
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function edad(fecha){
    $.ajax({
        url:"../mDatosPersonales/calcularEdad.php",
        type:"POST",
        dateType:"html",
        data:{fecha},
        success:function(respuesta){

            $("#edad").val(respuesta);
            $("#eEdad").val(respuesta);

            xedad= parseInt(respuesta);
            if (xedad < 0) {
                
                $("#edad, #eEdad , #fNac , #efNac").css("color", rojo);
            } else {
                
                $("#edad, #eEdad , #fNac , #efNac").css("color", obscuro);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function llenar_formulario_DP(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil){
   
    $("#eId").val(id);
    $("#eClave").val(clave);
    $("#eNombre").val(nombre);
    $("#eApPaterno").val(apPaterno);
    $("#eApMaterno").val(apMaterno);
    $("#eFnac").val(fNac);
    $("#eEdad").val(edad);
    $("#eCorreo").val(correo);
    $("#eCurp").val(curp);
    $("#eClave").val(clave);
    $("#eDomicilio").val(domicilio);
    $("#eSexo").val(sexo);
    $("#eEcivil").val(ecivil);

    selectTwo();

    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Modificar datos");

    $("#guardar-DP").hide();
    $("#Listado-DP").hide();
    $("#editar-DP").fadeIn();
    $("#eNombre").focus();
}

function cambiar_estatus_DP(id,consecutivo){

    var valor=$("#check"+consecutivo).val();
    var contravalor=(valor==1)?0:1;
    $("#check"+consecutivo).val(contravalor);

    $.ajax({
        url:"../mDatosPersonales/cEstatus.php",
        type:"POST",
        dateType:"html",
        data:{id,contravalor},
        success:function(respuesta){
            // console.log(respuesta);
            if(contravalor==1){
                alertify.success("<i class='fa fa-check fa-lg'></i>", 2);
                $("#btnEditar-DP"+consecutivo).removeAttr('disabled');
                $("#btnImprimir-DP"+consecutivo).removeAttr('disabled');
                $("#btnModal-DP"+consecutivo).removeAttr('disabled');
                $("#btnFoto-DP"+consecutivo).removeAttr('disabled');
                $("#btnSonido-DP"+consecutivo).removeAttr('disabled');
                $("#icoSound-DP"+consecutivo).removeClass("fa fa-volume-mute fa-lg");
                $("#icoSound-DP"+consecutivo).addClass("fa fa-volume-up fa-lg");
                actividad  ="Se ha reactivado un registro de la tabla tabla "+nombreModulo_DP;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }else{
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                $("#btnEditar-DP"+consecutivo).attr('disabled','disabled');
                $("#btnImprimir-DP"+consecutivo).attr('disabled','disabled');
                $("#btnModal-DP"+consecutivo).attr('disabled','disabled');
                $("#btnFoto-DP"+consecutivo).attr('disabled','disabled');
                $("#btnSonido-DP"+consecutivo).attr('disabled','disabled');
                $("#icoSound-DP"+consecutivo).removeClass("fa fa-volume-up fa-lg");
                $("#icoSound-DP"+consecutivo).addClass("fa fa-volume-mute fa-lg");
                actividad  ="Se ha desactivado un registro de la tabla tabla "+nombreModulo_DP;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });

}

function abrirModalDatos_DP(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil) {
    $("#modalTitle-DP").text("Datos personales - "+nombre+' '+apPaterno);

    $("#mNombre").val(nombre);
    $("#mApPaterno").val(apPaterno);
    $("#mApMaterno").val(apMaterno);
    $("#mFnac").val(fNac);
    $("#mEdad").val(edad);
    $("#mCorreo").val(correo);
    $("#mCurp").val(curp);
    $("#mClave").val(clave);
    $("#mDomicilio").val(domicilio);
    $("#mSexo").val(sexo);
    $("#mEcivil").val(ecivil);

    selectTwo();

    $("#modalDatos-DP").modal("show");
}


//Manipulacion de eventos con jquery
$("#fNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);
    ;
});

$("#efNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);

});

$("#btnCancelarG-DP , #btnCancelarA-DP").click(function(){
    $("#editar-DP").hide();
    $("#guardar-DP").hide();

    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Lista");

    $("#Listado-DP").fadeIn();
 
});


$("#clave").keydown(function() {
    var valor=$(this).val();
    soloNumeros(valor);
});

$("#curp , #eCurp").keyup(function() {

    valor=$(this);
    // Convierte en mayuscula
    valor.val(valor.val().toUpperCase());
    
    //validar curp + expresion regular
    if (curpValida(valor.val())=="Si") {
        //$("#btnGuardar-DP").removeAttr('disabled');
        $(valor).css("color", obscuro);
        alertify.success("Curp valida !",1);
    }else{
        //$("#btnGuardar-DP").attr('disabled','disabled');
        $(valor).css("color", rojo);
    }

});

$("#clave").keyup(function(){
    var valor=$(this).val();
    revisar_clave(valor);
});

//Manipulacion de eventos con jquery

//Revisar clave repetida
function revisar_clave(valor){
    $.ajax({
        url:"../mDatosPersonales/rClave.php",
        type:"POST",
        dateType:"html",
        data:{valor},
        success:function(respuesta){
            res =parseInt(respuesta);
            if (res == 0) {
                $("#clave").css("color", obscuro);
            }else{
                $("#clave").css("color", rojo);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

//validar curp
function curpValida(valor) {

    var validador;
    var curp=valor;

    // Expresion regular para curp
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);
    
    if (!validado){  //Coincide con el formato general?
        validador = "No";
    }else{
        validador = "Si";
    }
    return validador;
}

//llenar combo
function combo_ecivil()
{
    $.ajax({
        url : '../mDatosPersonales/comboEcivil.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#ecivil , #eEcivil , #mEcivil , #eDesc").empty();
            $("#ecivil , #eEcivil , #mEcivil , #eDesc").html(respuesta);    
            selectTwo();
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}

function nuevo_registro_DP(){
    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Nuevo registro");

    $("#Listado-DP").hide();
    $("#guardar-DP").fadeIn();
    $('#frmGuardar-DP')[0].reset();
    $("#clave").focus();
    
}

function abrirModalFoto(id,clave,nombre,valorfoto) {

    $("#clavePersona").val(clave);
    $("#txtTitularFoto").text(nombre);

    if (valorfoto=="No") {
        $('#formVista').hide();
        $('#formSubida').fadeIn();
        $('#formSubida')[0].reset();
    }else{
        $('#formSubida').hide();
        $('#formVista').fadeIn();
        var archivo='../fotos/'+clave+".jpg";
        $("#imgFoto").attr("src",archivo);
    }
    
    $("#modalFoto").modal("show");

}

function  eliminarFoto(){

    var formData = new FormData();
    var clave=$('#clavePersona').val();
    formData.append('clave',clave);

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas eliminar la foto?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-dark",
        confirmButtonText: "Si deseo eliminarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url: '../mDatosPersonales/fotoBorrar.php',
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                  var res=parseInt(response);
                  switch(res){
                    case 0 :
                        alertify.error("<i class='fa fa-times fa-lg'></i> No se encuentra el archivo",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista_DP();
                      break;
                    case 1 :
                        alertify.warning("<i class='fa fa-check fa-lg'></i> Foto Eliminada",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista_DP();
                        break;
                  }
        
                },
                error:function(xhr,status){
                    alertify.error('Error en proceso');
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

}

function subirFoto(){
    var formData = new FormData();

    var files = $('#image')[0].files[0];

    var clave=$('#clavePersona').val();
    var tam=$('#tamanoKB').val();

    formData.append('file',files);
    formData.append('clave',clave);
    formData.append('tam',tam);

    $.ajax({
        url: '../mDatosPersonales/fotoSubir.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
          var res=parseInt(response);
          switch(res){
            case 0 :
                alertify.success("<i class='fas fa-file-upload'></i>",1);
                $("#modalFoto").modal("hide");
                llenar_lista_DP();
              break;
            case 1 :

                swal({
                    title: "Error!",
                    text: "No ha sido posible cargar el archivo debido a que este debe de tener extención jpg y no debe de sobrepasar los 3 megabytes",
                    type: "error",
                    confirmButtonClass: "btn-dark",
                    confirmButtonText: "Enterado"
                }, function (isConfirm) {
                    alertify.message("Gracias !");
                });
              break;
            default:
                  alertify.error("<i class='fa fa-times fa-lg'></i>",1);
          }

        },
        error:function(xhr,status){
            alertify.error('Error en proceso');
        },
    });
// return false;
}


