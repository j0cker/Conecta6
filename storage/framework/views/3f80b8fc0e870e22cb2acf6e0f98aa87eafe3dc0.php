<?php $__env->startSection('lang'); ?><?php echo e($lang); ?><?php $__env->stopSection(); ?>



<?php $__env->startSection('title'); ?><?php echo e($title); ?><?php $__env->stopSection(); ?>



<?php $__env->startSection('Content-Type','text/html; charset=UTF-8'); ?>
<?php $__env->startSection('x-ua-compatible','ie=edge'); ?>
<?php $__env->startSection('keywords',''); ?>
<?php $__env->startSection('description',''); ?>
<?php $__env->startSection('viewport','width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1'); ?>
<?php $__env->startSection('idiomaLang','es-mx'); ?>



<!--Menu Transparente
<?php $__env->startSection('menuCSS','css/menu/menu.css?v='.cache("js_version_number").''); ?>
-->
<?php $__env->startSection('menuActive','configuraciones'); ?>

<?php $__env->startSection('raiz1', @Config::get('app.name')); ?>
<?php $__env->startSection('raiz1Url', '/inicio'); ?>
<?php $__env->startSection('raiz2','Empresas'); ?>
<?php $__env->startSection('raiz2Url','/inicio'); ?>
<?php $__env->startSection('raiz3','Configuraciones'); ?>
<?php $__env->startSection('raiz3Url','/configuraciones'); ?>



<?php $__env->startSection('controller','configuraciones'); ?>



<?php $__env->startSection('content'); ?>

        <!-- BEGIN Page Wrapper -->
        <div class="page-wrapper">
            <div class="page-inner">
                <!-- BEGIN Left Aside -->
                        
                    <?php echo $__env->make('system.menu', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

                <!-- END Left Aside -->
                <div class="page-content-wrapper">
                    <!-- BEGIN Page Header -->
                        
                    <?php echo $__env->make('system.menu2', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
                    
                    <!-- END Page Header -->
                    <!-- BEGIN Page Content -->
                    <!-- the #js-page-content id is needed for some plugins to initialize -->
                    <main id="js-page-content" role="main" class="page-content">
                    
                        <?php echo $__env->make('system.menu3', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

                        <div class="subheader">
                            <h1 class="subheader-title">
                                <i class='subheader-icon fal fa-sliders-v-square'></i> Configuraciones <span class='fw-300'>Dashboard</span>
                            </h1>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 sortable-grid ui-sortable">
                                <div id="panel-4" class="panel data-panel-sortable" data-panel-lock="false" data-panel-close="false" data-panel-fullscreen="false" data-panel-collapsed="false" data-panel-color="false" data-panel-locked="true" data-panel-refresh="false" data-panel-reset="false" role="widget">
                                    <div class="panel-hdr" role="heading">
                                        <h2>
                                        Configuraciones
                                        </h2>
                                        <div class="panel-saving mr-2" style="display:none"><i class="fal fa-spinner-third fa-spin-4x fs-xl"></i></div><div class="panel-toolbar" role="menu">
                                            <a href="#" class="btn btn-panel hover-effect-dot js-panel-collapse waves-effect waves-themed" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></a> 
                                            <a href="#" class="btn btn-panel hover-effect-dot js-panel-fullscreen waves-effect waves-themed" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></a>
                                        </div>
                                        <div class="panel-toolbar" role="menu"><a href="#" class="btn btn-toolbar-master waves-effect waves-themed" data-toggle="dropdown"><i class="fal fa-ellipsis-v"></i></a><div class="dropdown-menu dropdown-menu-animated dropdown-menu-right p-0">
                                        <div class="dropdown-multilevel dropdown-multilevel-left"><div class="dropdown-item"><span data-i18n="drpdwn.panelcolor">Panel Style</span>	</div><div class="dropdown-menu d-flex flex-wrap" style="min-width: 9.5rem; width: 9.5rem; padding: 0.5rem"><a href="#" class="btn d-inline-block bg-primary-700 bg-success-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-primary-700 bg-success-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-primary-500 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-primary-500 bg-info-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-primary-600 bg-primary-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-primary-600 bg-primary-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-info-600 bg-primray-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-info-600 bg-primray-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-info-600 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-info-600 bg-info-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-info-700 bg-success-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-info-700 bg-success-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-success-900 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-success-900 bg-info-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-success-700 bg-primary-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-success-700 bg-primary-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-success-600 bg-success-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-success-600 bg-success-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-danger-900 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-danger-900 bg-info-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-fusion-400 bg-fusion-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-fusion-400 bg-fusion-gradient" style="margin:1px;"></a> <a href="#" class="btn d-inline-block bg-faded width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-faded" style="margin:1px;"></a></div>										</div>  <div class="dropdown-divider m-0"></div>
                                        </div></div>
                                    </div>
                                    <div class="panel-container show">
                                        <div class="panel-content">

                                            <div style="margin-top: 50px;" class="row">

                                                <div class="col-md-4"></div>

                                                    <div style="font-size: 25px; color: black;" class="text-center col-md-4">
                                                    
                                                        Configuraciones

                                                    </div>

                                                <div class="col-md-4"></div>

                                            </div>

                                            <div style="margin-top: 50px;" class="row">

                                                <div class="col-md-3"></div>

                                                    <div style="font-size: 25px; color: black;" class="text-center col-md-6">
                                                    
                                                        Configuración de las opciones de salida.

                                                    </div>

                                                <div class="col-md-3"></div>

                                            </div>

                                            <div style="margin-top: 50px;" class="text-center row">

                                                <div class="col-md-6">
                                                    <input id="nombreSalida" class="form-control" type="text" placeholder="Nueva Salida" />
                                                </div>
                                                <div class="col-md-6">
                                                    <button ng-click="agregarSalidaClick('<?php echo e($user['usr']->id_empresas); ?>');" style="margin-bottom: 20px;" class="btn btn-primary">Agregar</button>
                                                </div>
                                            </div>

                                            <table id="dt-basic-example" class="table table-bordered table-hover table-striped w-100">
                                                <thead class="bg-warning-200">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre de la Salida</th>
                                                        <th>Descanso Computable</th>
                                                        <th>Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="historialTable">
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre de la Salida</th>
                                                        <th>Descanso Computable</th>
                                                        <th>Opciones</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            <!-- datatable end -->

                                            <div style="margin-top: 50px;" class="row">

                                                <div class="col-md-3"></div>

                                                    <div style="font-size: 25px; color: black;" class="text-center col-md-6">
                                                    
                                                        Selecciona el idioma que verán tus usuarios.

                                                    </div>

                                                <div class="col-md-3"></div>

                                            </div>

                                            <div style="margin-top: 25px;" class="row">

                                                <div class="col-md-4"></div>

                                                    <div style="" class="col-md-4">
                                                    
                                                        <div class="panel-container show" role="content"><div class="loader"><i class="fal fa-spinner-third fa-spin-4x fs-xxl"></i></div>
                                                            <div class="panel-content text-center">
                                                                
                                                                <select class="select2 form-control w-100" id="single-label">
                                                                    <option value="default">Selecciona un Idioma</option>
                                                                    <option ng-repeat="(key, plantilla) in plantillas" value="<% plantilla.id_plantillas %>"><% plantilla.nombrePlantilla %></option>
                                                                    <option value="Crear Nueva Plantilla">Crear Nuevo Idioma</option>
                                                                </select>

                                                            </div>
                                                            
                                                        </div>

                                                    </div>

                                                <div class="col-md-4"></div>

                                            </div>

                                            <div style="margin-top: 50px;" class="row">

                                                <div class="col-md-3"></div>

                                                    <div style="font-size: 25px; color: black;" class="text-center col-md-6">
                                                    
                                                        Nombre de la Empresa.

                                                    </div>

                                                <div class="col-md-3"></div>

                                            </div>

                                            <div style="margin-top: 50px;" class="text-center row">

                                                <div class="col-md-3"></div>

                                                <div style="display:inline-block;" class="col-md-6">
                                                    <input id="nombreEmpresa" style="width: 300px; display:inline-block;" class="form-control" type="text" placeholder="Nombre de la Empresa" />
                                                    <button style="margin-top: 20px; margin-left: 20px; margin-bottom: 20px; display: inline-block;" class="btn btn-primary">Modificar</button>
                                                </div>

                                                <div class="col-md-3"></div>

                                            </div>

                                            <div style="margin-top: 25px;" class="row">

                                                <div class="col-md-4"></div>

                                                    <div style="font-size: 25px; color: black;" class="col-md-4">
                                                    
                                                        Subdominio: <i style="color: green; display: none;" class="fal fa-check-circle"></i><i style="color: red; display: none;" class="fal fa-times-circle"></i>

                                                    </div>

                                                <div class="col-md-4"></div>

                                            </div>

                                            <div style="margin-top: 10px;" class="row">

                                                <div class="col-md-4"></div>

                                                <div class="input-group mb-3 col-md-4">
                                                    <input id="subdominio" type="text" class="form-control" placeholder="Nombre de la Empresa" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                                    <div class="input-group-append">
                                                        <span class="input-group-text" id="basic-addon2">.dominio.com <i style="margin-left: 15px; color: green; display: none;" class="fal fa-check-circle"></i><i style="margin-left: 15px; color: red; display: none;" class="fal fa-times-circle"></i></span>
                                                    </div>
                                                </div>

                                                <div class="col-md-4"></div>

                                            </div>

                                            <div style="margin-top: 50px;" class="text-center row">

                                                <div class="col-md-12">
                                                    <a href="/plantilla/nueva">
                                                        <button style="margin-bottom: 20px;" class="text-center btn btn-primary">Modificar subdominio</button>
                                                    </a>
                                                </div>

                                            </div>

                                            <div style="margin-top: 50px;" class="row">

                                                <div class="col-md-3"></div>

                                                    <div style="font-size: 25px; color: black;" class="text-center col-md-6">
                                                    
                                                        Logotipo que verán tus usuarios:

                                                    </div>

                                                <div class="col-md-3"></div>

                                            </div>

                                            <div style="margin-top: 50px;" class="row">

                                                <div class="col-md-4"></div>

                                                    <div class="col-md-4 text-center">
                                                    
                                                        
                                                        <form method="post" action="<?php echo e(url('/api/empresas/profile/image')); ?>" enctype="multipart/form-data" id="FrmProfilePicture">
                                                            <?php echo e(method_field('POST')); ?>


                                                            <label for="profileimg" class="figure">
                                                                <input type="file" id="profileimg" hidden name="profileimg">
                                                                <img class="profile-image  rounded-circle" onerror="this.src='<?php echo e(url('img/profile-image.png')); ?>'" style="width: 120px; height: 120px;" src="<?php echo e(url('img/profile-image.png')); ?>" alt="<?php echo e($user['usr']->nombre_empresa); ?>" id="userProfilePicture">
                                                            </label>

                                                        </form>

                                                        <center>
                                                        150x150
                                                        </center>

                                                    </div>

                                                <div class="col-md-4"></div>

                                            </div>

                                            <div style="margin-top: 50px;" class="row">

                                                <div class="col-md-3"></div>

                                                    <div style="font-size: 25px; color: black;" class="text-center col-md-6">
                                                    
                                                        Configuración de la Zona Horaria:

                                                    </div>

                                                <div class="col-md-3"></div>

                                            </div>

                                            <div style="margin-top: 25px;" class="row">

                                                <div class="col-md-4"></div>

                                                    <div style="" class="col-md-4">
                                                    
                                                        <div class="panel-container show" role="content"><div class="loader"><i class="fal fa-spinner-third fa-spin-4x fs-xxl"></i></div>
                                                            <div class="panel-content text-center">
                                                                
                                                                <select class="select2 form-control w-100" id="single-default">
                                                                    <option value="default">Selecciona una Zona Horaria</option>
                                                                    <option ng-repeat="(key, zonaHoraria) in zonasHorarias" value="<% zonaHoraria.id_zonas_horarias %>"><% zonaHoraria.nombre %> (<% zonaHoraria.utc %>) </option>
                                                                </select>

                                                            </div>
                                                            
                                                        </div>

                                                    </div>

                                                <div class="col-md-4"></div>

                                            </div>

                                            <div style="margin-top: 50px;" class="row">

                                                <div class="col-md-3"></div>

                                                    <div style="font-size: 25px; color: black;" class="text-center col-md-6">
                                                    
                                                        Configuración de las Plantillas:

                                                    </div>

                                                <div class="col-md-3"></div>

                                            </div>

                                            <div style="margin-top: 50px;" class="text-center row">

                                                <div class="col-md-12">
                                                    <a href="/plantilla/nueva">
                                                        <button style="margin-bottom: 20px;" class="text-center btn btn-primary">Agregar Nueva Plantilla</button>
                                                    </a>
                                                </div>

                                            </div>

                                            <table id="plantillas" class="table table-bordered table-hover table-striped w-100">
                                                <thead class="bg-warning-200">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre de la Plantilla</th>
                                                        <th>Lunes</th>
                                                        <th>Martes</th>
                                                        <th>Miercoles</th>
                                                        <th>Jueves</th>
                                                        <th>Viernes</th>
                                                        <th>Sábado</th>
                                                        <th>Domingo</th>
                                                        <th>Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="historialTable">
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre de la Plantilla</th>
                                                        <th>Lunes</th>
                                                        <th>Martes</th>
                                                        <th>Miercoles</th>
                                                        <th>Jueves</th>
                                                        <th>Viernes</th>
                                                        <th>Sábado</th>
                                                        <th>Domingo</th>
                                                        <th>Opciones</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            <!-- datatable end -->


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <!-- this overlay is activated only when mobile menu is triggered -->
                    <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div> <!-- END Page Content -->
                    <!-- BEGIN Page Footer -->
                    
                    <?php echo $__env->make('system.footer2', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

                    <!-- END Page Footer -->
                    <!-- BEGIN Shortcuts -->
                    <!-- modal shortcut -->
                    <div class="modal fade modal-backdrop-transparent" id="modal-shortcut" tabindex="-1" role="dialog" aria-labelledby="modal-shortcut" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-top modal-transparent" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <ul class="app-list w-auto h-auto p-0 text-left">
                                        <li>
                                            <a href="intel_introduction.html" class="app-list-item text-white border-0 m-0">
                                                <div class="icon-stack">
                                                    <i class="base base-7 icon-stack-3x opacity-100 color-primary-500 "></i>
                                                    <i class="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                                                    <i class="fal fa-home icon-stack-1x opacity-100 color-white"></i>
                                                </div>
                                                <span class="app-list-name">
                                                    Home
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page_inbox_general.html" class="app-list-item text-white border-0 m-0">
                                                <div class="icon-stack">
                                                    <i class="base base-7 icon-stack-3x opacity-100 color-success-500 "></i>
                                                    <i class="base base-7 icon-stack-2x opacity-100 color-success-300 "></i>
                                                    <i class="ni ni-envelope icon-stack-1x text-white"></i>
                                                </div>
                                                <span class="app-list-name">
                                                    Inbox
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="intel_introduction.html" class="app-list-item text-white border-0 m-0">
                                                <div class="icon-stack">
                                                    <i class="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                                                    <i class="fal fa-plus icon-stack-1x opacity-100 color-white"></i>
                                                </div>
                                                <span class="app-list-name">
                                                    Add More
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> <!-- END Shortcuts -->
                </div>
            </div>
        </div>
        <!-- END Page Wrapper -->
        <!-- BEGIN Quick Menu -->
        <!-- to add more items, please make sure to change the variable '$menu-items: number;' in your _page-components-shortcut.scss -->
        <?php echo $__env->make('system.toolbar', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
        <!-- END Quick Menu -->
        <!-- BEGIN Messenger -->
        <div class="modal fade js-modal-messenger modal-backdrop-transparent" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-right">
                <div class="modal-content h-100">
                    <div class="dropdown-header bg-trans-gradient d-flex align-items-center w-100">
                        <div class="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                            <span class="mr-2">
                                <span class="rounded-circle profile-image d-block" style="background-image:url('img/avatar-d.png'); background-size: cover;"></span>
                            </span>
                            <div class="info-card-text">
                                <a href="javascript:void(0);" class="fs-lg text-truncate text-truncate-lg text-white" data-toggle="dropdown" aria-expanded="false">
                                    Tracey Chang
                                    <i class="fal fa-angle-down d-inline-block ml-1 text-white fs-md"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Send Email</a>
                                    <a class="dropdown-item" href="#">Create Appointment</a>
                                    <a class="dropdown-item" href="#">Block User</a>
                                </div>
                                <span class="text-truncate text-truncate-md opacity-80">IT Director</span>
                            </div>
                        </div>
                        <button type="button" class="close text-white position-absolute pos-top pos-right p-2 m-1 mr-2" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fal fa-times"></i></span>
                        </button>
                    </div>
                    <div class="modal-body p-0 h-100 d-flex">
                        <!-- BEGIN msgr-list -->
                        <div class="msgr-list d-flex flex-column bg-faded border-faded border-top-0 border-right-0 border-bottom-0 position-absolute pos-top pos-bottom">
                            <div>
                                <div class="height-4 width-3 h3 m-0 d-flex justify-content-center flex-column color-primary-500 pl-3 mt-2">
                                    <i class="fal fa-search"></i>
                                </div>
                                <input type="text" class="form-control bg-white" id="msgr_listfilter_input" placeholder="Filter contacts" aria-label="FriendSearch" data-listfilter="#js-msgr-listfilter">
                            </div>
                            <div class="flex-1 h-100 custom-scroll">
                                <div class="w-100">
                                    <ul id="js-msgr-listfilter" class="list-unstyled m-0">
                                        <li>
                                            <a href="#" class="d-table w-100 px-2 py-2 text-dark hover-white" data-filter-tags="tracey chang online">
                                                <div class="d-table-cell align-middle status status-success status-sm ">
                                                    <span class="profile-image-md rounded-circle d-block" style="background-image:url('img/avatar-d.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Tracey Chang
                                                        <small class="d-block font-italic text-success fs-xs">
                                                            Online
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-table w-100 px-2 py-2 text-dark hover-white" data-filter-tags="oliver kopyuv online">
                                                <div class="d-table-cell align-middle status status-success status-sm ">
                                                    <span class="profile-image-md rounded-circle d-block" style="background-image:url('img/avatar-b.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Oliver Kopyuv
                                                        <small class="d-block font-italic text-success fs-xs">
                                                            Online
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-table w-100 px-2 py-2 text-dark hover-white" data-filter-tags="dr john cook phd away">
                                                <div class="d-table-cell align-middle status status-warning status-sm ">
                                                    <span class="profile-image-md rounded-circle d-block" style="background-image:url('img/avatar-e.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Dr. John Cook PhD
                                                        <small class="d-block font-italic fs-xs">
                                                            Away
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-table w-100 px-2 py-2 text-dark hover-white" data-filter-tags="ali amdaney online">
                                                <div class="d-table-cell align-middle status status-success status-sm ">
                                                    <span class="profile-image-md rounded-circle d-block" style="background-image:url('img/avatar-g.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Ali Amdaney
                                                        <small class="d-block font-italic fs-xs text-success">
                                                            Online
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-table w-100 px-2 py-2 text-dark hover-white" data-filter-tags="sarah mcbrook online">
                                                <div class="d-table-cell align-middle status status-success status-sm">
                                                    <span class="profile-image-md rounded-circle d-block" style="background-image:url('img/avatar-h.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Sarah McBrook
                                                        <small class="d-block font-italic fs-xs text-success">
                                                            Online
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-table w-100 px-2 py-2 text-dark hover-white" data-filter-tags="ali amdaney offline">
                                                <div class="d-table-cell align-middle status status-sm">
                                                    <span class="profile-image-md rounded-circle d-block" style="background-image:url('img/avatar-a.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        oliver.kopyuv@gotbootstrap.com
                                                        <small class="d-block font-italic fs-xs">
                                                            Offline
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-table w-100 px-2 py-2 text-dark hover-white" data-filter-tags="ali amdaney busy">
                                                <div class="d-table-cell align-middle status status-danger status-sm">
                                                    <span class="profile-image-md rounded-circle d-block" style="background-image:url('img/avatar-j.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        oliver.kopyuv@gotbootstrap.com
                                                        <small class="d-block font-italic fs-xs text-danger">
                                                            Busy
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-table w-100 px-2 py-2 text-dark hover-white" data-filter-tags="ali amdaney offline">
                                                <div class="d-table-cell align-middle status status-sm">
                                                    <span class="profile-image-md rounded-circle d-block" style="background-image:url('img/avatar-c.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        oliver.kopyuv@gotbootstrap.com
                                                        <small class="d-block font-italic fs-xs">
                                                            Offline
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-table w-100 px-2 py-2 text-dark hover-white" data-filter-tags="ali amdaney inactive">
                                                <div class="d-table-cell align-middle">
                                                    <span class="profile-image-md rounded-circle d-block" style="background-image:url('img/avatar-m.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        +714651347790
                                                        <small class="d-block font-italic fs-xs opacity-50">
                                                            Missed Call
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="filter-message js-filter-message"></div>
                                </div>
                            </div>
                            <div>
                                <a class="fs-xl d-flex align-items-center p-3">
                                    <i class="fal fa-cogs"></i>
                                </a>
                            </div>
                        </div>
                        <!-- END msgr-list -->
                        <!-- BEGIN msgr -->
                        <div class="msgr d-flex h-100 flex-column bg-white">
                            <!-- BEGIN custom-scroll -->
                            <div class="custom-scroll flex-1 h-100">
                                <div id="chat_container" class="w-100 p-4">
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment">
                                        <div class="time-stamp text-center mb-2 fw-400">
                                            Jun 19
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-sent">
                                        <div class="chat-message">
                                            <p>
                                                Hey Ching, did you get my files?
                                            </p>
                                        </div>
                                        <div class="text-right fw-300 text-muted mt-1 fs-xs">
                                            3:00 pm
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-get">
                                        <div class="chat-message">
                                            <p>
                                                Hi
                                            </p>
                                            <p>
                                                Sorry going through a busy time in office. Yes I analyzed the solution.
                                            </p>
                                            <p>
                                                It will require some resource, which I could not manage.
                                            </p>
                                        </div>
                                        <div class="fw-300 text-muted mt-1 fs-xs">
                                            3:24 pm
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-sent chat-start">
                                        <div class="chat-message">
                                            <p>
                                                Okay
                                            </p>
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-sent chat-end">
                                        <div class="chat-message">
                                            <p>
                                                Sending you some dough today, you can allocate the resources to this project.
                                            </p>
                                        </div>
                                        <div class="text-right fw-300 text-muted mt-1 fs-xs">
                                            3:26 pm
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-get chat-start">
                                        <div class="chat-message">
                                            <p>
                                                Perfect. Thanks a lot!
                                            </p>
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-get">
                                        <div class="chat-message">
                                            <p>
                                                I will have them ready by tonight.
                                            </p>
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-get chat-end">
                                        <div class="chat-message">
                                            <p>
                                                Cheers
                                            </p>
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment for timestamp -->
                                    <div class="chat-segment">
                                        <div class="time-stamp text-center mb-2 fw-400">
                                            Jun 20
                                        </div>
                                    </div>
                                    <!--  end .chat-segment for timestamp -->
                                </div>
                            </div>
                            <!-- END custom-scroll  -->
                            <!-- BEGIN msgr__chatinput -->
                            <div class="d-flex flex-column">
                                <div class="border-faded border-right-0 border-bottom-0 border-left-0 flex-1 mr-3 ml-3 position-relative shadow-top">
                                    <div class="pt-3 pb-1 pr-0 pl-0 rounded-0" tabindex="-1">
                                        <div id="msgr_input" contenteditable="true" data-placeholder="Type your message here..." class="height-10 form-content-editable"></div>
                                    </div>
                                </div>
                                <div class="height-8 px-3 d-flex flex-row align-items-center flex-wrap flex-shrink-0">
                                    <a href="javascript:void(0);" class="btn btn-icon fs-xl width-1 mr-1" data-toggle="tooltip" data-original-title="More options" data-placement="top">
                                        <i class="fal fa-ellipsis-v-alt color-fusion-300"></i>
                                    </a>
                                    <a href="javascript:void(0);" class="btn btn-icon fs-xl mr-1" data-toggle="tooltip" data-original-title="Attach files" data-placement="top">
                                        <i class="fal fa-paperclip color-fusion-300"></i>
                                    </a>
                                    <a href="javascript:void(0);" class="btn btn-icon fs-xl mr-1" data-toggle="tooltip" data-original-title="Insert photo" data-placement="top">
                                        <i class="fal fa-camera color-fusion-300"></i>
                                    </a>
                                    <div class="ml-auto">
                                        <a href="javascript:void(0);" class="btn btn-info">Send</a>
                                    </div>
                                </div>
                            </div>
                            <!-- END msgr__chatinput -->
                        </div>
                        <!-- END msgr -->
                    </div>
                </div>
            </div>
        </div> <!-- END Messenger -->
        <!-- BEGIN Page Settings -->
        <div class="modal fade js-modal-settings modal-backdrop-transparent" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-right modal-md">
                <div class="modal-content">
                    <div class="dropdown-header bg-trans-gradient d-flex justify-content-center align-items-center w-100">
                        <h4 class="m-0 text-center color-white">
                            Layout Settings
                            <small class="mb-0 opacity-80">User Interface Settings</small>
                        </h4>
                        <button type="button" class="close text-white position-absolute pos-top pos-right p-2 m-1 mr-2" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fal fa-times"></i></span>
                        </button>
                    </div>
                    <div class="modal-body p-0">
                        <div class="settings-panel">
                            <div class="mt-4 d-table w-100 px-5">
                                <div class="d-table-cell align-middle">
                                    <h5 class="p-0">
                                        App Layout
                                    </h5>
                                </div>
                            </div>
                            <div class="list" id="fh">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="header-function-fixed"></a>
                                <span class="onoffswitch-title">Fixed Header</span>
                                <span class="onoffswitch-title-desc">header is in a fixed at all times</span>
                            </div>
                            <div class="list" id="nff">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="nav-function-fixed"></a>
                                <span class="onoffswitch-title">Fixed Navigation</span>
                                <span class="onoffswitch-title-desc">left panel is fixed</span>
                            </div>
                            <div class="list" id="nfm">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="nav-function-minify"></a>
                                <span class="onoffswitch-title">Minify Navigation</span>
                                <span class="onoffswitch-title-desc">Skew nav to maximize space</span>
                            </div>
                            <div class="list" id="nfh">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="nav-function-hidden"></a>
                                <span class="onoffswitch-title">Hide Navigation</span>
                                <span class="onoffswitch-title-desc">roll mouse on edge to reveal</span>
                            </div>
                            <div class="list" id="nft">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="nav-function-top"></a>
                                <span class="onoffswitch-title">Top Navigation</span>
                                <span class="onoffswitch-title-desc">Relocate left pane to top</span>
                            </div>
                            <div class="list" id="mmb">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-main-boxed"></a>
                                <span class="onoffswitch-title">Boxed Layout</span>
                                <span class="onoffswitch-title-desc">Encapsulates to a container</span>
                            </div>
                            <div class="expanded">
                                <ul class="">
                                    <li>
                                        <div class="bg-fusion-50" data-action="toggle" data-class="mod-bg-1"></div>
                                    </li>
                                    <li>
                                        <div class="bg-warning-200" data-action="toggle" data-class="mod-bg-2"></div>
                                    </li>
                                    <li>
                                        <div class="bg-primary-200" data-action="toggle" data-class="mod-bg-3"></div>
                                    </li>
                                    <li>
                                        <div class="bg-success-300" data-action="toggle" data-class="mod-bg-4"></div>
                                    </li>
                                </ul>
                                <div class="list" id="mbgf">
                                    <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-fixed-bg"></a>
                                    <span class="onoffswitch-title">Fixed Background</span>
                                </div>
                            </div>
                            <div class="mt-4 d-table w-100 px-5">
                                <div class="d-table-cell align-middle">
                                    <h5 class="p-0">
                                        Mobile Menu
                                    </h5>
                                </div>
                            </div>
                            <div class="list" id="nmp">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="nav-mobile-push"></a>
                                <span class="onoffswitch-title">Push Content</span>
                                <span class="onoffswitch-title-desc">Content pushed on menu reveal</span>
                            </div>
                            <div class="list" id="nmno">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="nav-mobile-no-overlay"></a>
                                <span class="onoffswitch-title">No Overlay</span>
                                <span class="onoffswitch-title-desc">Removes mesh on menu reveal</span>
                            </div>
                            <div class="list" id="sldo">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="nav-mobile-slide-out"></a>
                                <span class="onoffswitch-title">Off-Canvas <sup>(beta)</sup></span>
                                <span class="onoffswitch-title-desc">Content overlaps menu</span>
                            </div>
                            <div class="mt-4 d-table w-100 px-5">
                                <div class="d-table-cell align-middle">
                                    <h5 class="p-0">
                                        Accessibility
                                    </h5>
                                </div>
                            </div>
                            <div class="list" id="mbf">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-bigger-font"></a>
                                <span class="onoffswitch-title">Bigger Content Font</span>
                                <span class="onoffswitch-title-desc">content fonts are bigger for readability</span>
                            </div>
                            <div class="list" id="mhc">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-high-contrast"></a>
                                <span class="onoffswitch-title">High Contrast Text (WCAG 2 AA)</span>
                                <span class="onoffswitch-title-desc">4.5:1 text contrast ratio</span>
                            </div>
                            <div class="list" id="mcb">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-color-blind"></a>
                                <span class="onoffswitch-title">Daltonism <sup>(beta)</sup> </span>
                                <span class="onoffswitch-title-desc">color vision deficiency</span>
                            </div>
                            <div class="list" id="mpc">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-pace-custom"></a>
                                <span class="onoffswitch-title">Preloader Inside</span>
                                <span class="onoffswitch-title-desc">preloader will be inside content</span>
                            </div>
                            <div class="mt-4 d-table w-100 px-5">
                                <div class="d-table-cell align-middle">
                                    <h5 class="p-0">
                                        Global Modifications
                                    </h5>
                                </div>
                            </div>
                            <div class="list" id="mcbg">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-clean-page-bg"></a>
                                <span class="onoffswitch-title">Clean Page Background</span>
                                <span class="onoffswitch-title-desc">adds more whitespace</span>
                            </div>
                            <div class="list" id="mhni">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-hide-nav-icons"></a>
                                <span class="onoffswitch-title">Hide Navigation Icons</span>
                                <span class="onoffswitch-title-desc">invisible navigation icons</span>
                            </div>
                            <div class="list" id="dan">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-disable-animation"></a>
                                <span class="onoffswitch-title">Disable CSS Animation</span>
                                <span class="onoffswitch-title-desc">Disables CSS based animations</span>
                            </div>
                            <div class="list" id="mhic">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-hide-info-card"></a>
                                <span class="onoffswitch-title">Hide Info Card</span>
                                <span class="onoffswitch-title-desc">Hides info card from left panel</span>
                            </div>
                            <div class="list" id="mlph">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-lean-subheader"></a>
                                <span class="onoffswitch-title">Lean Subheader</span>
                                <span class="onoffswitch-title-desc">distinguished page header</span>
                            </div>
                            <div class="list" id="mnl">
                                <a href="#" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-nav-link"></a>
                                <span class="onoffswitch-title">Hierarchical Navigation</span>
                                <span class="onoffswitch-title-desc">Clear breakdown of nav links</span>
                            </div>
                            <div class="list mt-1">
                                <span class="onoffswitch-title">Global Font Size <small>(RESETS ON REFRESH)</small> </span>
                                <div class="btn-group btn-group-sm btn-group-toggle my-2" data-toggle="buttons">
                                    <label class="btn btn-default btn-sm" data-action="toggle-swap" data-class="root-text-sm" data-target="html">
                                        <input type="radio" name="changeFrontSize"> SM
                                    </label>
                                    <label class="btn btn-default btn-sm" data-action="toggle-swap" data-class="root-text" data-target="html">
                                        <input type="radio" name="changeFrontSize" checked=""> MD
                                    </label>
                                    <label class="btn btn-default btn-sm" data-action="toggle-swap" data-class="root-text-lg" data-target="html">
                                        <input type="radio" name="changeFrontSize"> LG
                                    </label>
                                    <label class="btn btn-default btn-sm" data-action="toggle-swap" data-class="root-text-xl" data-target="html">
                                        <input type="radio" name="changeFrontSize"> XL
                                    </label>
                                </div>
                                <span class="onoffswitch-title-desc d-block mb-g">Change <strong>root</strong> font size to effect rem values</span>
                            </div>
                            <div class="mt-2 d-table w-100 pl-5 pr-3">
                                <div class="d-table-cell align-middle">
                                    <h5 class="p-0">
                                        Theme colors <small>(overlays base css)</small>
                                    </h5>
                                    <div class="fs-xs text-muted p-2 alert alert-warning mt-3 mb-0">
                                        <i class="fal fa-exclamation-triangle text-warning mr-2"></i>Due to network latency and CPU utilization, you may experience a brief flickering effect on page load which may show the intial applied theme for a split second. Setting the prefered style/theme in the header will prevent this from happening.
                                    </div>
                                </div>
                            </div>
                            <div class="expanded theme-colors pl-5 pr-3">
                                <ul class="m-0">
                                    <li><a href="#" id="myapp-0" data-action="theme-update" data-themesave data-theme="" data-toggle="tooltip" data-placement="top" title="Wisteria (base css)" data-original-title="Wisteria (base css)"></a></li>
                                    <li><a href="#" id="myapp-1" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-1.css" data-toggle="tooltip" data-placement="top" title="Tapestry" data-original-title="Tapestry"></a></li>
                                    <li><a href="#" id="myapp-2" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-2.css" data-toggle="tooltip" data-placement="top" title="Atlantis" data-original-title="Atlantis"></a></li>
                                    <li><a href="#" id="myapp-3" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-3.css" data-toggle="tooltip" data-placement="top" title="Indigo" data-original-title="Indigo"></a></li>
                                    <li><a href="#" id="myapp-4" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-4.css" data-toggle="tooltip" data-placement="top" title="Dodger Blue" data-original-title="Dodger Blue"></a></li>
                                    <li><a href="#" id="myapp-5" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-5.css" data-toggle="tooltip" data-placement="top" title="Tradewind" data-original-title="Tradewind"></a></li>
                                    <li><a href="#" id="myapp-6" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-6.css" data-toggle="tooltip" data-placement="top" title="Cranberry" data-original-title="Cranberry"></a></li>
                                    <li><a href="#" id="myapp-7" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-7.css" data-toggle="tooltip" data-placement="top" title="Oslo Gray" data-original-title="Oslo Gray"></a></li>
                                    <li><a href="#" id="myapp-8" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-8.css" data-toggle="tooltip" data-placement="top" title="Chetwode Blue" data-original-title="Chetwode Blue"></a></li>
                                    <li><a href="#" id="myapp-9" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-9.css" data-toggle="tooltip" data-placement="top" title="Apricot" data-original-title="Apricot"></a></li>
                                    <li><a href="#" id="myapp-10" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-10.css" data-toggle="tooltip" data-placement="top" title="Blue Smoke" data-original-title="Blue Smoke"></a></li>
                                    <li><a href="#" id="myapp-11" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-11.css" data-toggle="tooltip" data-placement="top" title="Green Smoke" data-original-title="Green Smoke"></a></li>
                                    <li><a href="#" id="myapp-12" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-12.css" data-toggle="tooltip" data-placement="top" title="Wild Blue Yonder" data-original-title="Wild Blue Yonder"></a></li>
                                    <li><a href="#" id="myapp-13" data-action="theme-update" data-themesave data-theme="css/themes/cust-theme-13.css" data-toggle="tooltip" data-placement="top" title="Emerald" data-original-title="Emerald"></a></li>
                                </ul>
                            </div>
                            <hr class="mb-0 mt-4">
                            <div class="pl-5 pr-3 py-3 bg-faded">
                                <div class="row no-gutters">
                                    <div class="col-6 pr-1">
                                        <a href="#" class="btn btn-outline-danger fw-500 btn-block" data-action="app-reset">Reset Settings</a>
                                    </div>
                                    <div class="col-6 pl-1">
                                        <a href="#" class="btn btn-danger fw-500 btn-block" data-action="factory-reset">Factory Reset</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span id="saving"></span>
                    </div>
                </div>
            </div>
        </div> <!-- END Page Settings -->
        
        <script src="js/vendors.bundle.js?v='.cache("js_version_number").'') }}"></script>
        <script src="js/app.bundle.js?v='.cache("js_version_number").'') }}"></script>
        <!-- The order of scripts is irrelevant. Please check out the plugin pages for more details about these plugins below: -->
    
        <script src="<?php echo e(url('js/selects.js?v='.cache("js_version_number").'')); ?>"></script>

        <script src="js/datatables.bundle.js?v='.cache("js_version_number").'') }}"></script>
        <script src="<?php echo e(url('js/jquery.mask.js?v='.cache("js_version_number").'')); ?>"></script>

        <script>
            $( document ).ready(function() {
                // Handler for .ready() called.
            });
        </script>

        <script>

            

            function checkboxSalida(id_salidas, nombre){

                console.log("[checkboxSalida]");

                var computable = $("#gra-"+id_salidas+"").prop("checked");
                
                console.log("[checkboxSalida] id_salidas: " + id_salidas);
                console.log("[checkboxSalida] nombre: " + nombre);
                console.log("[checkboxSalida] computable: " + computable);

                changeComputableSalidaClick("<?php echo e($user['usr']->id_empresas); ?>", id_salidas, nombre, computable);

                
            }

            function editSalida(id_salidas){

                console.log("[editSalida]");

                window.location = "/salidas/modificar?id=" + id_salidas;

            }

            function delSalida(id_salidas){

                console.log("[editSalida]");

                console.log("[checkboxSalida] id_salidas: " + id_salidas);

                delSalidaClick("<?php echo e($user['usr']->id_empresas); ?>", id_salidas);

            }

            function editPlantilla(id_plantillas){

                console.log("[editPlantilla]");
                
                console.log(id_plantillas);
            }

            function delPlantilla(id_plantillas){

                console.log("[delPlantilla]");
                
                console.log(id_plantillas);

                delPlantillaClick(id_plantillas);
            }

            $(document).ready(function()
            {

                
                /* init datatables */
               var table = $('#dt-basic-example').dataTable(
                {
                    "pageLength": 25,
                    "ordering": true,
                    responsive: true,
                    dom: "<'row mb-3'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'B>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                    //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                    buttons: [
                        {
                            extend: 'pageLength',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'colvis',
                            text: 'Column Visibility',
                            titleAttr: 'Col visibility',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'csvHtml5',
                            text: 'CSV',
                            titleAttr: 'Generate CSV',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'copyHtml5',
                            text: 'Copy',
                            titleAttr: 'Copy to clipboard',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'print',
                            text: '<i class="fal fa-print"></i>',
                            titleAttr: 'Print Table',
                            className: 'btn-outline-default'
                        }

                    ],
                    "columnDefs": [ {
                        "targets": -1,
                        "data": null,
                        "render": function ( data, type, row, meta ) {
                            return  `<center>
                                        <button onclick="editSalida(`+row[0]+`);" class="btn btn-primary fal fa-edit"></button>
                                        <button onclick="delSalida(`+row[0]+`);" class="btn btn-primary fal fa-trash-alt" style="margin-left: 10px;"></button>
                                    </center>`;
                        }
                    
                    },{
                        "targets": -2,
                        "data": null,
                        "render": function ( data, type, row, meta ) {
                            
                            return `<center>
                                    <div class="custom-control custom-switch mr-2">
                                        <input type="checkbox" class="custom-control-input" onclick="checkboxSalida('`+row[0]+`', '`+row[1]+`');" name="gra-`+row[0]+`" id="gra-`+row[0]+`" checked="checked">
                                        <label class="custom-control-label" for="gra-`+row[0]+`"></label>
                                    </div>
                                </center>`;

                        }
                    
                    } 
                
                    ]

                });
                /* init datatables */
               var table = $('#plantillas').dataTable(
                {
                    "pageLength": 25,
                    "ordering": true,
                    responsive: true,
                    dom: "<'row mb-3'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'B>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                    //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                    buttons: [
                        {
                            extend: 'pageLength',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'colvis',
                            text: 'Column Visibility',
                            titleAttr: 'Col visibility',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'csvHtml5',
                            text: 'CSV',
                            titleAttr: 'Generate CSV',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'copyHtml5',
                            text: 'Copy',
                            titleAttr: 'Copy to clipboard',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'print',
                            text: '<i class="fal fa-print"></i>',
                            titleAttr: 'Print Table',
                            className: 'btn-outline-default'
                        }

                    ],
                    "columnDefs": [ {
                        "targets": -1,
                        "data": null,
                        "render": function ( data, type, row, meta ) {
                            return  `<center>
                                        <button onclick="editPlantilla(`+row[0]+`);" class="btn btn-primary fal fa-edit"></button>
                                        <button onclick="delPlantilla(`+row[0]+`);" class="btn btn-primary fal fa-trash-alt" style="margin-left: 10px;"></button>
                                    </center>`;
                        }
                    
                    }
                
                    ]

                });

                //selects
                $('.select2').select2();

                /* no sirve

                $('#dt-basic-example tbody').on( 'click', 'button', function () {
                    console.log("[dt-basic-example tbody] click");
                    console.log($(this));
                    console.log($(this)[0].innerHTML); //html
                    console.log($(this)[0].attributes[0].value); //class
                    var data = table.DataTable().row( $(this).parents('tr') ).data();
                    if($(this)[0].attributes[0].value.indexOf("edit")!=-1){
                        alert("Editar" + data[0]);
                    } else {
                        alert("Eliminar" + data[0]);
                    }
                });

                $('#dt-basic-example tbody').on( 'change', 'input', function () {
                    console.log("[dt-basic-example tbody] change");
                    console.log($(this)[0].checked); //checked
                    var data = table.DataTable().row( $(this).parents('tr') ).data();
                    if($(this)[0].checked==true){
                        alert("Activado " + data[0]);
                    } else {
                        alert("Desactivado " + data[0]);

                    }

                });
                */

                //array
                //https://datatables.net/examples/ajax/simple.html
                //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ] ],

            });

        </script>


        <!-- Toastr-->
        <script src="<?php echo e(url('js/toastr.js?v='.cache("js_version_number").'')); ?>"></script>


        <!--Angular-->
        
        <script src="<?php echo e(url('js/angular.min.js?v='.cache("js_version_number").'')); ?>"></script>
        <script src="<?php echo e(url('js/sanitize.min.js?v='.cache("js_version_number").'')); ?>"></script>
        <script src="<?php echo e(url('js/module.js?v='.cache("js_version_number").'')); ?>"></script>
        <script src="<?php echo e(url('js/controllers.js?v='.cache("js_version_number").'')); ?>"></script>
        <script src="<?php echo e(url('js/factory.js?v='.cache("js_version_number").'')); ?>"></script>

        <script src="<?php echo e(url('js/functions.js?v='.cache("js_version_number").'')); ?>"></script>

        
        
        <script>
            $(document).ready(function()
            {

                $('#subdominio').mask("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", {
                    translation: {
                        "A": {pattern: /[a-zA-Z0-9]/}
                    }
                });


                $('#subdominio').on('change', function() {
                    console.log("[nuevaempresa.php][subdominio] changes");

                    validarSubdominio($("#subdominio").val());
                    
                    
                });
                

                $(document).on('change', '#single-default', function () {
                    
                    console.log("[Zonas Horarias]");

                    console.log($("#single-default").val());

                    angular.element('body').scope().postZonaHorariaClick(""+$("#single-default").val()+"");

                });

                $(document).on('change', '#profileimg', function () {
                    
                    console.log("[Perfil]");

                    startLoading();
                    $('#FrmProfilePicture').submit();
                });

                $('#js-page-content').smartPanel();
                angular.element('body').scope().getImageEmpresaClick("<?php echo e($user['usr']->id_empresas); ?>");
                angular.element('body').scope().getZonasHorariasClick("<?php echo e($user['usr']->id_zona_horaria); ?>");
                angular.element('body').scope().getEmpresaClick("<?php echo e($user['usr']->id_empresas); ?>");
                getSalidasClick("<?php echo e($user['usr']->id_empresas); ?>");
                
            });
        </script>


    <?php $__env->stopSection(); ?>
<?php echo $__env->make('system.master', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>