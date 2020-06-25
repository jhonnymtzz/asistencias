<?php

$varGral = "-CT";

?>
<form action="" id="frmGuardarEditar<?php echo $varGral?>">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="form-group">
                <label for="nombreTema">Nombre del tema:</label>
                <input type="hidden" id="id_tema">
                <input type="text" class="form-control" id="nombreTema" autofocus required >
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group">
                <label for="colorLetra">Color de letra:</label>
                <input type="color" class="form-control" id="colorLetra" autofocus required style="height: 40px;">
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group">
                <label for="colorBase">Color base:</label>
                <input type="color" class="form-control" id="colorBase" autofocus required style="height: 40px;">
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group">
                <label for="colorBaseFuerte">Color base fuerte:</label>
                <input type="color" class="form-control" id="colorBaseFuerte" autofocus required style="height: 40px;">
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group">
                <label for="colorBorde">Color de bordes:</label>
                <input type="color" class="form-control" id="colorBorde" autofocus required style="height: 40px;">
            </div>
        </div>
        
        <div class="container">
        <br><br>
            <div class="row">
                <div class="col-md-6 text-left">
                    <button  type="button" class="btn btn-outline-danger  activo btnEspacio" id="btnCancelar<?php echo $varGral?>">
                        <i class='fa fa-ban fa-lg'></i>
                        Cancelar
                    </button>
                </div>

                <div class="col-md-3 text-right">
                    <button  type="submit" class="btn btn-outline-dark  activo btnEspacio" id="btnProbarTema<?php echo $varGral?>">
                        <i class='fa fa-fill-drip fa-lg'></i>
                        Probar tema
                    </button>
                </div>
                <div class="col-md-3 text-right">
                    <button  type="submit" class="btn btn-outline-primary  activo btnEspacio" id="btnGuardar<?php echo $varGral?>">
                        <i class='fa fa-save fa-lg'></i>
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    </div>
</form>