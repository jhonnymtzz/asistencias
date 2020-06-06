//Hace la validacion del usuario y la contraseña
$("#frmLogin").submit(function(e){

    var usuario = $("#loginUsuario").val();
    var contra = $("#loginContra").val();

    $.ajax({
        url:"../mLogin/validar_login.php",
        type:"POST",
        dateType:"json",
        data:{usuario,contra},
        success:function(respuesta){

            var dataArray = JSON.parse(respuesta);
             //console.log(respuesta);
            var registros=dataArray.cRegistros;
            var dias=dataArray.dias;

            if (registros !=0 ) { //existe el usuario

                if(dias < 0){ //caducidad = true
                    swal({
                        title: "Mensaje!",
                        text: "Ha caducado tu suscripción al sistema",
                        type: "error",
                        confirmButtonClass: "btn-dark",
                        confirmButtonText: "Enterado"
                    }, function (isConfirm) {
                        $("#btnIngresar").attr("disabled","disabled");
                        var h_sidebar="#c0392b";
                        var color_base="#e74c3c";
                        var letra_color="#fff";
                        var color_borde="#e74c3c";
                        cssTema(h_sidebar,color_base,letra_color,color_borde);
                        $("#icoLogin").removeClass("fas fa-unlock");
                        $("#icoLogin").addClass("fas fa-lock");
                        $("#frmLogin")[0].reset();
                        $("#loginUsuario").focus();
                    });
                }else{ //caducidad = false

                    var cambio = $("#switch_cambio").attr("value"); // 1 == si quiere cambio, 0 == no quiere cambio

                    if (cambio == 1) { 
                        //console.log("SI quieres cambio");

                        Swal.fire({
                            title: "Cambio de contraseña",
                            html:
                            "<br>"+
                            "<input id='pass' type='text' oninput='validarCambio();' class='form-control focus' placeholder='Ingresa tu nueva contraseña'>"+
                            "<input id='repass' type='password' oninput='validarCambio();' class='form-control mt-4' placeholder='Confirma tu nueva contraseña'>"+
                            "<span id='msjNumCaracteres' class='text-muted float-left mt-2'>La contraseña debe tener 8 o más caracteres <i hidden class='far fa-check-circle fa-xs'></i></span>"+
                            "<br>"+
                            "<span id='msjCoincidencia' class='text-muted float-left'>Las contraseñas deben coincidir <i hidden class='far fa-check-circle fa-xs'></i></span>"+
                            "<br><br><br>"+
                            "<div class='row w-100 m-0'>"+
                            "<div class='col-md-6 p-0'><button id='btn_generar' onclick='generarClave();' class='btn btn-outline-dark float-left'><i class='fas fa-dice-five fa-spin'></i> Generar contraseña</button></div>"+
                            "<div class='col-md-6 p-0'><button disabled id='btn_cambiar' onclick='Swal.clickConfirm();' class='btn btn-success float-right'><i class='fa fa-check'></i> Confirmar</button></div>"+
                            "</div>",
                            showConfirmButton: false,
                            showCloseButton: true
                        }).then((result) => {  // se lee el evento SwalclickConfirm ejecutado a traves del button btn_cambiar
                            if (result.value) {
                                //Metodo para cambiar la clave
                                cambiarClave(dataArray.result.id_usuario);

                                $("#contentLogin").hide();
                                $("#contentSistema").show();

                                persona=dataArray.result.persona;
                                idUsuario=dataArray.result.id_usuario;
                                idDato=dataArray.result.id_dato;

                                $("#titular").text(persona);

                                $('#sidebar').toggleClass('active');
                                permisos(dataArray.result.permiso_datos_persona,dataArray.result.permiso_ecivil,dataArray.result.permiso_usuario,dataArray.result.permiso_temas);
                                preloader(1,'Asistencia del personal');
                                actividad  ="Ingreso al sistema";
                                log(actividad,dataArray.result.id_usuario);
                                verAsistencias();
                            }
                        });
                    }

                    else{
                        //console.log("NO quieres cambio");

                        $("#contentLogin").hide();
                        $("#contentSistema").show();

                        persona=dataArray.result.persona;
                        idUsuario=dataArray.result.id_usuario;
                        idDato=dataArray.result.id_dato;

                        $("#titular").text(persona);

                        $('#sidebar').toggleClass('active');
                        permisos(dataArray.result.permiso_datos_persona,dataArray.result.permiso_ecivil,dataArray.result.permiso_usuario,dataArray.result.permiso_temas);
                        preloader(1,'Asistencia del personal');
                        actividad  ="Ingreso al sistema";
                        log(actividad,dataArray.result.id_usuario);
                        verAsistencias();
                    }
                }

            }else{
                swal({
                    title: "Mensaje!",
                    text: "La contraseña es incorrecta.",
                    type: "error",
                    confirmButtonClass: "btn-dark",
                    confirmButtonText: "Enterado"
                }, function (isConfirm) {
                    $("#btnIngresar").attr("disabled","disabled");
                    var h_sidebar="#c0392b";
                    var color_base="#e74c3c";
                    var letra_color="#fff";
                    var color_borde="#e74c3c";
                    cssTema(h_sidebar,color_base,letra_color,color_borde);
                    $("#icoLogin").removeClass("fas fa-unlock");
                    $("#icoLogin").addClass("fas fa-lock");
                    $("#frmLogin")[0].reset();
                    $("#loginUsuario").focus();
                });
            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
    
    e.preventDefault();
    return false;
});

function cambiarClave(id_usuario){

    var nuevaClave = $("#pass").val();

    $.ajax({
        url:"../funciones/cambiarClave.php",
        type:"POST",
        dataType:"html",
        data:{"clave": nuevaClave, "id":id_usuario},
        success:function(respuesta){

            console.log(nuevaClave+" - "+id_usuario+" - "+respuesta);

            Swal.fire("Hecho !","La contraseña ha sido cambiada correctamente","success");
            
        },
        error:function(xhr, status){
            alert("Error: "+xhr+" => "+status);
        },
    });
};

function validarCambio(){

    var numCaracteres = $("#pass").val().length;
    var puntosNumCaracteres = 0;  
    var puntosIguales = 0;

    //decide si la contraseña tiene 8 o más caracteres
    if (numCaracteres >= 8) {

        $("#msjNumCaracteres").removeClass("text-muted");
        $("#msjNumCaracteres").addClass("text-success");
        $("#msjNumCaracteres > i").removeAttr("hidden");
        puntosNumCaracteres++;
    }
    else{
        $("#msjNumCaracteres").removeClass("text-success");
        $("#msjNumCaracteres").addClass("text-muted");
        $("#msjNumCaracteres > i").attr("hidden", "hidden");
        // puntosNumCaracteres--;
    }
    //decide si son iguales
    if (numCaracteres >= 1 && $("#pass").val() == $("#repass").val()) {

        $("#msjCoincidencia").removeClass("text-muted");
        $("#msjCoincidencia").addClass("text-success");
        $("#msjCoincidencia > i").removeAttr("hidden");
        puntosIguales++;
    }
    else{
        $("#msjCoincidencia").removeClass("text-success");
        $("#msjCoincidencia").addClass("text-muted");
        $("#msjCoincidencia > i").attr("hidden", "hidden");
        // puntosIguales--;
    }

    //la suma total final de puntos debe ser 2
    var puntosValidacion = puntosNumCaracteres + puntosIguales;
    console.log("puntos: " + puntosValidacion);

    //calcula los puntos obtenidos
    if (puntosValidacion == 2) {
        $("#btn_cambiar").removeAttr("disabled");
    }
    else{
        $("#btn_cambiar").attr("disabled", "disabled");
    }
};

function generarClave(){

    var stringABC = "abcdefghijklmnopqrstuvwxyz";
    var string123 = "0123456789";
    var nuevaClave = "";

    for (var i = 0 ; i <= 7; i++) {

        var preguntaABC123 = Math.floor(Math.random() * 2);// decide si genera cracter abc o numerico 123

        if (preguntaABC123 == 0) { // 0 == caracter abc

            var indexABC = Math.floor(Math.random() * 26); //index del 0 al 25
            var preguntaMayusMinus = Math.floor(Math.random() * 2); //decide si genera abc mayuscula o lo deja minuscula

            if (preguntaMayusMinus == 0) { //se queda minuscula
                var caracterABC = stringABC.substr(indexABC, 1);
                nuevaClave = nuevaClave + caracterABC;
            }
            else{ //se genera en mayuscula
                var caracterABC = stringABC.substr(indexABC, 1).toUpperCase();
                nuevaClave = nuevaClave + caracterABC;
            }
        }
        else{ // 1 == caracter numerico 123

            var index123 = Math.floor(Math.random() * 10); //index del 0 al 9
            var caracter123 = string123.substr(index123, 1);
            nuevaClave = nuevaClave + caracter123;
        }
    }
    //console.log(string123+" "+stringABC+" "+preguntaABC123);
    $("#pass").val(nuevaClave);
    validarCambio();
};

//permisoa partes del menu
function permisos(datos,ecivil,usuarios,temas){
    if(datos=='si'){
        $("#liDatos").show();
    }else{
        $("#liDatos").hide();
    }

    if(ecivil=='si'){
        $("#liEcivil").show();
    }else{
        $("#liEcivil").hide();
    }

    if(usuarios=='si'){
        $("#liUsuarios").show();
    }else{
        $("#liUsuarios").hide();
    }

    if(temas=='si'){
        $("#liTemas").show();
    }else{
        $("#liTemas").hide();
    }
};

$("#switch_cambio").change(function(){

    var cambiar = $(this).attr("value");

    if (cambiar == 0) {
        $(this).attr("value","1");
    }
    else if (cambiar == 1) {
        $(this).attr("value","0");
    }

    console.log("cambiando de: "+cambiar+" a: "+$(this).attr("value")); //verificando funcionamiento del switch
});

//Revisa si existe el usuario y aplica el tema del mismo
$("#loginUsuario").keyup(function(){
    valor=$(this).val();
    $.ajax({
        url:"../mLogin/rUsuario.php",
        type:"POST",
        dateType:"json",
        data:{valor},
        success:function(respuesta){
            var dataArray = JSON.parse(respuesta);
            //console.log(respuesta);
            var registros=dataArray.cRegistros;
            if (registros !=0 ) {
                //$("#frmLogin").hide();
                idTema=dataArray.result.id_tema;
                aplicarTema(idTema,'login');
                $("#btnIngresar").removeAttr("disabled");
                $("#icoLogin").removeClass("fas fa-lock");
                $("#icoLogin").addClass("fas fa-unlock");
                $("#inicioIdusuario").val(dataArray.result.id_usuario);
                $("#inicioIdDato").val(dataArray.result.id_dato);
                $("#inicioIdTema").val(dataArray.result.id_tema);
                //$("#frmLogin").fadeIn();
            }else{
                //colores default
                $("#icoLogin").removeClass("fas fa-unlock");
                $("#icoLogin").addClass("fas fa-lock");
                $("#btnIngresar").attr("disabled","disabled");
                var h_sidebar="#2f3640";
                var color_base="#353b48";
                var letra_color="#fff";
                var color_borde="#40739e";
                cssTema(h_sidebar,color_base,letra_color,color_borde);
            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
});
