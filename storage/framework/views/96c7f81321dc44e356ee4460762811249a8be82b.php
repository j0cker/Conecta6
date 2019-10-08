
        <aside class="page-sidebar">
            <div class="page-logo">
                <a href="#" class="page-logo-link press-scale-down d-flex align-items-center position-relative" data-toggle="modal" data-target="#modal-shortcut">
                    <img src="<?php echo e(url('img/logo.png')); ?>" alt="Conecta6" aria-roledescription="logo">
                    <span class="page-logo-text mr-1"><?php echo e(Config::get('app.name')); ?></span>
                    <span class="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
                    <i class="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
                </a>
            </div>
            <!-- BEGIN PRIMARY NAVIGATION -->
            <nav id="js-primary-nav" style="box-shadow: none !important;" class="primary-nav" role="navigation">
                <div class="nav-filter">
                    <div class="position-relative">
                        <input type="text" id="nav_filter_input" placeholder="Filter menu" class="form-control" tabindex="0">
                        <a href="#" onclick="return false;" class="btn-primary btn-search-close js-waves-off" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar">
                            <i class="fal fa-chevron-up"></i>
                        </a>
                    </div>
                </div>
                <div class="info-card">

                    <?php if(in_array("3", $user["permisos"]) || in_array("1", $user["permisos"])): ?>

                        <a href="<?php echo e(url('/perfilTrabajadores')); ?>'">
                            <img onerror="this.src='<?php echo e(url('img/profile-image.png')); ?>'" style="width: 50px; height: 50px;" src="<?php echo e(url('img/profile-image.png')); ?>" class="profile-image rounded-circle" alt='<?php echo e($user["usr"]->nombre); ?> <?php echo e($user["usr"]->apellido); ?>'>
                        </a>
                        <div class="info-card-text">
                            <a href="<?php echo e(url('/perfilTrabajadores')); ?>" class="d-flex align-items-center text-white">
                                <span class="text-truncate text-truncate-sm d-inline-block">
                                    <?php echo e($user["usr"]->nombre); ?> <?php echo e($user["usr"]->apellido); ?>

                                </span>
                            </a>
                            <span class="d-inline-block text-truncate text-truncate-sm"><?php echo e($user["usr"]->correo); ?></span>
                        </div>
                        
                    <?php endif; ?>

                    <?php if(in_array("2", $user["permisos"])): ?>

                        <a href="<?php echo e(url('/perfilEmpresas')); ?>'">
                            <img onerror="this.src='<?php echo e(url('img/logo-example.png')); ?>'" style="width: 50px; height: 50px;" src="<?php echo e(url('img/logo-example.png')); ?>" class="profile-image rounded-circle" alt='<?php echo e($user["usr"]->nombre_empresa); ?>'>
                        </a>
                        <div class="info-card-text">
                            <a href="<?php echo e(url('/perfilEmpresas')); ?>" class="d-flex align-items-center text-white">
                                <span class="text-truncate text-truncate-sm d-inline-block">
                                    <?php echo e($user["usr"]->nombre_empresa); ?>

                                </span>
                            </a>
                            <span class="d-inline-block text-truncate text-truncate-sm"><?php echo e($user["usr"]->correo); ?></span>
                        </div>

                    <?php endif; ?>

                    <img src="<?php echo e(url('img/cover-2-lg.png')); ?>" class="cover" alt="cover">
                    <a href="#" onclick="return false;" class="pull-trigger-btn" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar" data-focus="nav_filter_input">
                        <i class="fal fa-angle-down"></i>
                    </a>
                </div>
                
                
                <!--Administradores-->

                <?php if(in_array("1", $user["permisos"])): ?>

                <ul id="js-nav-menu" class="nav-menu">
                                <?php if($__env->yieldContent('menuActive')=="inicioAdmin"  ||
                                     $__env->yieldContent('menuActive')=="perfilAdministradores" ||
                                     $__env->yieldContent('menuActive')=="empresas" ||
                                     $__env->yieldContent('menuActive')=="idiomas" ||
                                     $__env->yieldContent('menuActive')=="planes" ||
                                     $__env->yieldContent('menuActive')=="administradores" ||
                                     $__env->yieldContent('menuActive')=="historial de pagos"): ?>
                                    <li class="active open">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                <a href="#" title="Application Intel" data-filter-tags="application intel">
                                    <i class="fal fa-info-circle"></i>
                                    <span class="nav-link-text" data-i18n="nav.application_intel">Administradores</span>
                                </a>
                                <ul>
                                <?php if($__env->yieldContent('menuActive')=="inicioAdmin"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/inicioAdmin')); ?>" title="Analytics Dashboard" data-filter-tags="application intel analytics dashboard">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Inicio</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="perfilAdministradores"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/perfilAdministradores')); ?>" title="Perfil" data-filter-tags="perfil">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Perfil</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="empresas"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/empresas')); ?>" title="Empresas" data-filter-tags="empresas">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Empresas</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="idiomas"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/idiomas')); ?>" title="Idiomas" data-filter-tags="idiomas">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Idiomas</span>
                                        </a>
                                    </li>
                                <!--
                                <?php if($__env->yieldContent('menuActive')=="planes"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/planes')); ?>" title="Planes" data-filter-tags="planes">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Planes</span>
                                        </a>
                                    </li>
                                -->
                                <?php if($__env->yieldContent('menuActive')=="administradores"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/administradores')); ?>" title="Administradores" data-filter-tags="administradores">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Administradores</span>
                                        </a>
                                    </li>
                                <!--
                                <?php if($__env->yieldContent('menuActive')=="historial de pagos"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/hitsorialDePagos')); ?>" title="Historial de Pagos" data-filter-tags="historial de pagos">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Historial de Pagos</span>
                                        </a>
                                    </li>
                                -->
                                    <li>
                                        <a href="#" ng-click="logout()" title="Salir" data-filter-tags="salir">
                                            <span class="nav-link-text" data-i18n="nav.pages_chat">Salir</span>
                                        </a>
                                    </li>
                            </li>

                </ul>
                <?php endif; ?>
                
                
                <!--Empresas-->

                <?php if(in_array("2", $user["permisos"])): ?>

                <ul id="js-nav-menu" class="nav-menu">
                                <?php if($__env->yieldContent('menuActive')=="inicioEmpresa" ||
                                     $__env->yieldContent('menuActive')=="perfilEmpresas" ||
                                     $__env->yieldContent('menuActive')=="trabajadores" ||
                                     $__env->yieldContent('menuActive')=="consultaDeInformes" ||
                                     $__env->yieldContent('menuActive')=="historialEntradasYSalidasPorEmpresa" ||
                                     $__env->yieldContent('menuActive')=="configuraciones"): ?>
                                    <li class="active open">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                <a href="#" title="Application Intel" data-filter-tags="application intel">
                                    <i class="fal fa-info-circle"></i>
                                    <span class="nav-link-text" data-i18n="nav.application_intel">Empresas Administración</span>
                                </a>
                                <ul>
                                <?php if($__env->yieldContent('menuActive')=="inicioEmpresa"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/inicioEmpresa')); ?>" title="inicio Analytics Dashboard" data-filter-tags="application intel inicio analytics dashboard">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Inicio</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="perfilEmpresas"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/perfilEmpresas')); ?>" title="Perfil" data-filter-tags="perfil">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Perfil</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="trabajadores"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/trabajadores')); ?>" title="Trabajadores" data-filter-tags="Trabajadores">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Trabajadores</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="consultaDeInformes"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/informes')); ?>" title="Consulta de Informes" data-filter-tags="Consulta de Informes">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Consulta de Informes</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="historialEntradasYSalidasPorEmpresa"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/historialEntradasEmpresa')); ?>" title="Historial de Entradas y Salidas" data-filter-tags="Historial de Entradas y Salidas">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Historial de Entradas y Salidas</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="configuraciones"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/configuraciones')); ?>" title="Configuraciones" data-filter-tags="Configuraciones">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Configuraciones</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" ng-click="logout()" title="Salir" data-filter-tags="salir">
                                            <span class="nav-link-text" data-i18n="nav.pages_chat">Salir</span>
                                        </a>
                                    </li>
                            </li>

                </ul>
                <?php endif; ?>
                
                
                <!--Trabajadores-->

                <?php if(in_array("3", $user["permisos"])): ?>

                <ul id="js-nav-menu" class="nav-menu">
                                <?php if($__env->yieldContent('menuActive')=="inicio"  ||
                                     $__env->yieldContent('menuActive')=="perfilTrabajadores" ||
                                     $__env->yieldContent('menuActive')=="historialRegistros" ||
                                     $__env->yieldContent('menuActive')=="registros"): ?>
                                    <li class="active open">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                <a href="#" title="Application Intel" data-filter-tags="application intel">
                                    <i class="fal fa-info-circle"></i>
                                    <span class="nav-link-text" data-i18n="nav.application_intel">Trabajadores</span>
                                </a>
                                <ul>
                                <?php if($__env->yieldContent('menuActive')=="inicio"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/inicio')); ?>" title="inicio Analytics Dashboard" data-filter-tags="application intel inicio analytics dashboard">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Inicio</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="perfilTrabajadores"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/perfilTrabajadores')); ?>" title="Perfil" data-filter-tags="perfil">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Perfil</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="registros"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/registros')); ?>" title="Registros" data-filter-tags="registros">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Entradas y Salidas</span>
                                        </a>
                                    </li>
                                <?php if($__env->yieldContent('menuActive')=="historialRegistros"): ?>
                                    <li class="active">
                                <?php else: ?>
                                    <li class="">
                                <?php endif; ?>
                                        <a href="<?php echo e(url('/historial')); ?>" title="historial de entradas y salidas" data-filter-tags="historial de entradas y salidas">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Historial de Entradas y Salidas</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" ng-click="logout()" title="Salir" data-filter-tags="salir">
                                            <span class="nav-link-text" data-i18n="nav.pages_chat">Salir</span>
                                        </a>
                                    </li>
                            </li>

                </ul>
                <?php endif; ?>

                <div class="filter-message js-filter-message bg-success-600"></div>
            </nav>
                        
                <!-- END PRIMARY NAVIGATION -->
                <!-- NAV FOOTER -->
                <div class="nav-footer shadow-top">
                    <a href="#" onclick="return false;" data-action="toggle" data-class="nav-function-minify" class="hidden-md-down">
                        <i class="ni ni-chevron-right"></i>
                        <i class="ni ni-chevron-right"></i>
                    </a>
                    <ul class="list-table m-auto nav-footer-buttons">
                        <li>
                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Chat logs">
                                <i class="fal fa-comments"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Support Chat">
                                <i class="fal fa-life-ring"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Make a call">
                                <i class="fal fa-phone"></i>
                            </a>
                        </li>
                    </ul>
                </div> <!-- END NAV FOOTER -->
            </aside>