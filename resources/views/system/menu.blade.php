
        <aside class="page-sidebar">
            <div class="page-logo">
                <a href="#" class="page-logo-link press-scale-down d-flex align-items-center position-relative" data-toggle="modal" data-target="#modal-shortcut">
                    <img src="{{ url('img/logo.png') }}" alt="SmartAdmin WebApp" aria-roledescription="logo">
                    <span class="page-logo-text mr-1">{{ Config::get('app.name') }}</span>
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
                    <a href="{{ url('/perfil') }}'">
                        <img src="{{ url('img/avatar-admin.png') }}" class="profile-image rounded-circle" alt="Dr. Codex Lantern">
                    </a>
                    <div class="info-card-text">
                        <a href="{{ url('/perfil') }}" class="d-flex align-items-center text-white">
                            <span class="text-truncate text-truncate-sm d-inline-block">
                                {{ $user["usr"]->nombre }} {{ $user["usr"]->apellido }}
                            </span>
                        </a>
                        <span class="d-inline-block text-truncate text-truncate-sm">Toronto, Canada</span>
                    </div>
                    <img src="{{ url('img/cover-2-lg.png') }}" class="cover" alt="cover">
                    <a href="#" onclick="return false;" class="pull-trigger-btn" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar" data-focus="nav_filter_input">
                        <i class="fal fa-angle-down"></i>
                    </a>
                </div>
                
                <ul id="js-nav-menu" class="nav-menu">
                                @if ($__env->yieldContent('menuActive')=="inicio"  ||
                                     $__env->yieldContent('menuActive')=="perfil" ||
                                     $__env->yieldContent('menuActive')=="marketing" ||
                                     $__env->yieldContent('menuActive')=="introduction" ||
                                     $__env->yieldContent('menuActive')=="registros")
                                    <li class="active open">
                                @else
                                    <li class="">
                                @endif
                                <a href="#" title="Application Intel" data-filter-tags="application intel">
                                    <i class="fal fa-info-circle"></i>
                                    <span class="nav-link-text" data-i18n="nav.application_intel">Trabajadores</span>
                                </a>
                                <ul>
                                @if ($__env->yieldContent('menuActive')=="inicio")
                                    <li class="active">
                                @else
                                    <li class="">
                                @endif
                                        <a href="{{ url('/inicio') }}" title="Analytics Dashboard" data-filter-tags="application intel analytics dashboard">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Analytics Dashboard</span>
                                        </a>
                                    </li>
                                @if ($__env->yieldContent('menuActive')=="perfil")
                                    <li class="active">
                                @else
                                    <li class="">
                                @endif
                                        <a href="{{ url('/perfil') }}" title="Perfil" data-filter-tags="perfil">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Perfil</span>
                                        </a>
                                    </li>
                                @if ($__env->yieldContent('menuActive')=="marketing")
                                    <li class="active">
                                @else
                                    <li class="">
                                @endif
                                        <a href="{{ url('/marketing') }}" title="Marketing Dashboard" data-filter-tags="application intel marketing dashboard">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_marketing_dashboard">Marketing Dashboard</span>
                                        </a>
                                    </li>
                                @if ($__env->yieldContent('menuActive')=="registros")
                                    <li class="active">
                                @else
                                    <li class="">
                                @endif
                                        <a href="{{ url('/registros') }}" title="Registros" data-filter-tags="registros">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Entradas y Salidas</span>
                                        </a>
                                    </li>
                                @if ($__env->yieldContent('menuActive')=="introduction")
                                    <li class="active">
                                @else
                                    <li class="">
                                @endif
                                        <a href="{{ url('/introduction') }}" title="Introduction" data-filter-tags="application intel introduction">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Terminos</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" ng-click="logout()" title="Salir" data-filter-tags="salir">
                                            <span class="nav-link-text" data-i18n="nav.pages_chat">Salir</span>
                                        </a>
                                    </li>
                            </li>

                        </ul>

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