<?php
return [

    //footer
    'Copyright' => "Copyright &copy; ".date('Y')." ".Config::get('app.name').". All Rights Reserved.",

    //General Tables
    'tableSearch' => 'Buscar',
    'tableColumnasVisibles' => 'Columnas Visibles',
    'tableCopiar' => 'Copiar',
    'tableBuscar' => 'Buscar',
    'tableRenglones' => 'Renglones',

    //Header Menu
    'headerMenuIrAPerfil' => 'Ir al perfil',
    'headerMenuSalir' => 'Salir',

    //verification
    'notVerified' => "El número de verificación no existe",
    'verified' => "Tu cuenta ha sido verificada",
    'wasVerified' => "Tu cuenta ya ha sido verificada con anterioridad",

    //idiomas
    'yaExisteEseCodigo' => "Ya Existe ese Código, por favor cambia el código del nuevo Idioma",

    //emails
    'emailVerification' => "Se requiere verificación de correo electrónico",
    'emailReset' => "Nueva Contraseña",
    'emailWelcome' => "Bienvenido a ".Config::get('app.name')."",
    'selectFormRequired' => "Por favor ingresa un valor correcto",
    'emailSubscribeSubject' => "Tiene un nuevo subscriptor.",
    'emailSubscribeBody' => "Tienes un nuevo subscriptor. Correo: ",

    //email reset password
    'emailResetText1' => "You are receiving this email because we received a password reset request for your account.",
    'emailResetText2' => "Reset Password",
    'emailResetText3' => "If you did not request a password reset, no further action is required.",
    'emailResetText4' => "If you’re having trouble clicking the button, copy and paste the URL below into your web browser:",

    //email Administration
    'emailAdminTitle' => "Email's Personalizados",
    'emailAdminTarget' => "Objetivo de alcance",
    'emailAdminSelect' => "Selecciona tu objetivo",
    'emailPrioritySelect' => "Selecciona tu prioridad",
    'emailAdminAllUsers' => "Todos los usuarios",
    'emailAdminSubscribers' => "Todos los suscriptores",
    'emailAdminSubject' => "Asunto",
    'emailAdminPrioridad' => "Prioridad",
    'emailAdminIdioma' => "Idioma",
    'emailAdminBody' => "Cuerpo del mensaje (incluye cabezera, pie, saludos y despedida)",
    'emailAdminAllTipo1' => "Todos los usuarios",
    'emailAdminAllTipo2' => "",
    'subjectFormRequired' => "Por favor ingresa un correcto asunto",
    'bodyFormRequired' => "Por favor ingresa un correcto cuerpo de mensaje",
    'emailPrioridad1' => "Alta",
    'emailPrioridad3' => "Media",
    'emailPrioridad5' => "Baja",

    /******************/
    /* EMPRESAS */
    /*****************/

    //Login Empresas
    'TextoEmpresasLoginBienvenida' => 'Bienvenido a :nombre por favor ingrese su usuario y contraseña',
    'textoEmpresasLoginCorreoElectronico' => 'Correo Electrónico',
    'textoEmpresasLoginContrasena' => 'Contraseña',
    'textoEmpresasLoginIngresar' => 'INGRESAR',
    'textoEmpresasLoginOlvidaste' => '¿Olvidaste tu Contraseña?',

    //olvidaste contraseña Empresas
    'textoEmpresasOlvidasteBienvenida' => 'Ingresa tu correo para Recuperar tu Contraseña',
    'textoEmpresasOlvidasteCorreoElectronico' => 'Correo Electrónico',
    'textoEmpresasOlvidasteRecuperar' => 'RECUPERAR',
    'textoEmpresasOlvidasteIniciarSesion' => 'Iniciar Sesión',

    //Inicio Empresas
    'textoEmpresasInicioInicioDashboard' => 'Inicio <span class="fw-300">Dashboard</span>',
    'textoEmpresasInicioTrabajadoresConActividad' => 'Trabajadores con Actividad',
    'textoEmpresasInicioTrabajadoresSinActividad' => 'Trabajadores sin Actividad',
    'textoEmpresasInicioPlanProximoAVencer' => 'Plan Próximo a Vencer (días)',
    'textoEmpresasInicioTotalDeTrabajadores' => 'Total de Trabajadores',
    'textoEmpresasInicioEntradasTotales' => 'Entradas Totales',
    'textoEmpresasInicioSalidasTotales' => 'Salidas Totales',
    'textoEmpresasInicioResumenDelMesActual' => 'Resumen del Mes Actual',
    'textoEmpresasInicioLosMasImpuntualesDelMes' => 'Los Más Impuntuales del Mes',
    'textoEmpresasInicioNumDeImpuntualidades' => '# de <br />Impuntualidades',
    'textoEmpresasInicioNumDeAsistentesTotales' => '# de  <br />Asistencias Totales',
    'textoEmpresasInicioNombre' => 'Nombre',
    'textoEmpresasInicioApellido' => 'Apellido',
    'textoEmpresasInicioNoHayDatos' => 'No Hay Datos',
    'textoEmpresasInicioTrabajadoresConMasFaltas' => 'Trabajadores con Más Faltas de Asistencias del Mes',
    'textoEmpresasInicioNumDeFaltas' => '# de <br />Faltas',
    'textoEmpresasInicioAsistenciasFueraDePlantilla' => 'Asistencias Fuera<br />de Plantilla',
    'textoEmpresasInicioLosMasPuntualesDelMes' => 'Los Más Puntuales del Mes',
    'textoEmpresasInicioNumDePuntualidades' => '# de <br />Puntualidades',
    'textoEmpresasInicioAsistenciasDentroDePlantilla' => 'Asistencias dentro <br/>de Plantilla',

    //Menu Empresas
    'textoEmpresasMenuLateralTitulo' => 'Empresas Administración',
    'textoEmpresasMenuLateralInicio' => 'Inicio',
    'textoEmpresasMenuLateralPerfil' => 'Perfil',
    'textoEmpresasMenuLateralTrabajadores' => 'Trabajadores',
    'textoEmpresasMenuLateralConsultaDeInformes' => 'Consulta de Informes',
    'textoEmpresasMenuLateralHistorialDeEntradasYSalidas' => 'Historial de Entradas y Salidas',
    'textoEmpresasMenuLateralConfiguraciones' => 'Configuraciones',
    'textoEmpresasMenuLateralSalir' => 'Salir',

    //Perfil y cambio de pass Empresas
    'textoEmpresasPerfilPerfil' => 'Perfil',
    'textoEmpresasPerfilNombreDeLaEmpresa' => 'Nombre de la Empresa:',
    'textoEmpresasPerfilNoEspecificado' => 'No Especificado',
    'textoEmpresasPerfilNombreEmpresa' => 'Nombre Empresa',
    'textoEmpresasPerfilCorreo' => 'Correo:',
    'textoEmpresasPerfilCorreoElectronicos' => 'Correo Elctrónicos',
    'textoEmpresasPerfilSolicitante' => 'Solicitante:',
    'textoEmpresasPerfilVigenciaDeLaLicencia' => 'Vigencia de la Licencia (mm/dd/YYYY):',
    'textoEmpresasPerfilTrabajadoresPermitidos' => 'Trabajadores Permitidos:',
    'textoEmpresasPerfilTelefonoFijo' => 'Teléfono Fijo:',
    'textoEmpresasPerfilCelular' => 'Celular:',
    'textoEmpresasPerfilFechaDeCreacion' => 'Fecha de Creación:',
    'textoEmpresasPerfilEditar' => 'Editar',
    'textoEmpresasPerfilGuardar' => 'Guardar',
    'textoEmpresasPerfilCambiarContrasena' => 'Cambiar Contraseña',
    'textoEmpresasPerfilModificarContrasena' => 'Modificar Contraseña',
    'textoEmpresasPerfilContrasenaActual' => 'Contraseña Actual',
    'textoEmpresasPerfilContrasenaNueva' => 'Contraseña Nueva',
    'textoEmpresasPerfilNuevaContrasena' => 'Nueva Contraseña',
    'textoEmpresasPerfilConfirmarContrasenaNueva' => 'Confirmar Contraseña Nueva',
    'textoEmpresasPerfilConfirmarNuevaContrasena' => 'Confirmar Nueva Contraseña',
    'textoEmpresasPerfilModificar' => 'Modificar',

    //Trabajadores Empresas Consultas, Altas, Modificaciones
    'textoEmpresasTrabajadoresTitulo' => 'Trabajadores <span class="fw-300">Dashboard</span>',
    'textoEmpresasTrabajadoresTrabajadores' => 'Trabajadores',
    'textoEmpresasTrabajadoresAlta' => 'Alta',
    'textoEmpresasTrabajadoresID' => 'ID',
    'textoEmpresasTrabajadoresNombre' => 'Nombre',
    'textoEmpresasTrabajadoresApellido' => 'Apellido',
    'textoEmpresasTrabajadoresCorreo' => 'Correo',
    'textoEmpresasTrabajadoresTelefono' => 'Teléfono',
    'textoEmpresasTrabajadoresOpciones' => 'Opciones',
    'textoEmpresasTrabajadoresNuevoTrabajador' => 'Nuevo Trabajador',
    'textoEmpresasTrabajadoresNombre2' => 'Nombre',
    'textoEmpresasTrabajadoresApellido2' => 'Apellido',
    'textoEmpresasTrabajadoresCorreoElectronico' => 'Correo Electrónico',
    'textoEmpresasTrabajadoresTelefonoFijo' => 'Teléfono Fijo',
    'textoEmpresasTrabajadoresCelular' => 'Celular',
    'textoEmpresasTrabajadoresCargo' => 'Cargo',
    'textoEmpresasTrabajadoresNumeroDNI' => 'Número DNI',
    'textoEmpresasTrabajadoresNSeguroSocial' => 'Nº Seguro Social',
    'textoEmpresasTrabajadoresConfiguracionPlantillaHorarios' => 'Configuración de la plantilla de Horarios',
    'textoEmpresasTrabajadoresAgregarNuevaPlantilla' => 'Agregar Nueva Plantilla',
    'textoEmpresasTrabajadoresGeolocalizacion' => 'Geolocalización',
    'textoEmpresasTrabajadoresActivarGeolocalizacion' => '¿Activar Geolocalización?',
    'textoEmpresasTrabajadoresAgregarDireccionDeLaEmpresa' => 'Agregar dirección de la Empresa',
    'textoEmpresasTrabajadoresMetrosPermitidosALaRedonda' => 'Metros permitidos a la redonda',
    'textoEmpresasTrabajadoresActivarRegistroAutomaticoPorApps' => '¿Activar registro automático por APPS?',
    'textoEmpresasTrabajadoresAgregarIp' => 'Agregar IP',
    'textoEmpresasTrabajadoresActivarYPersonalizarIP' => '¿Activar y personalizar IP?',
    'textoEmpresasTrabajadoresTiposDeDispositivos' => 'Tipos de Dispositivos',
    'textoEmpresasTrabajadoresPcMacLaptop' => 'PC/MAC/Laptop',
    'textoEmpresasTrabajadoresTabletas' => 'Tabletas',
    'textoEmpresasTrabajadoresMoviles' => 'Móviles',
    'textoEmpresasTrabajadoresContrasena' => 'Contraseña',
    'textoEmpresasTrabajadoresComprobarContrasena' => 'Comprobar Contraseña',
    'textoEmpresasTrabajadoresAgregar' => 'Agregar',
    'textoEmpresasTrabajadoresModificarTrabajador' => 'Modificar Trabajador',
    'textoEmpresasTrabajadoresModificar' => 'Modificar',

    //Consulta de Informes
    'textoEmpresasConsultaDeInformesInformesDashboard' => 'Informes <span class="fw-300">Dashboard</span>',
    'textoEmpresasConsultaDeInformesInformes' => 'Informes',
    'textoEmpresasConsultaDeInformesID' => 'ID',
    'textoEmpresasConsultaDeInformesNombre' => 'Nombre',
    'textoEmpresasConsultaDeInformesApellido' => 'Apellido',
    'textoEmpresasConsultaDeInformesTotalHorasTrabajadores' => 'Total Horas Trabajadas',
    'textoEmpresasConsultaDeInformesFaltas' => 'Faltas',
    'textoEmpresasConsultaDeInformesHorasExtras' => 'Horas Extras',
    'textoEmpresasConsultaDeInformesDescanzosTotales' => 'Descanzos Totales',
    'textoEmpresasConsultaDeInformesSalidas' => 'Salidas',
    'textoEmpresasConsultaDeInformesAsistenciasTotales' => 'Asistencias Totales',
    'textoEmpresasConsultaDeInformesAsistenciasFueraDePlantilla' => 'Asistencias Fuera de Plantilla',
    'textoEmpresasConsultaDeInformesAsistenciasDentroDePlantilla' => 'Asistencias Dentro de Plantilla',
    'textoEmpresasConsultaDeInformesPuntualidades' => 'Puntualidades',
    'textoEmpresasConsultaDeInformesImpuntualidades' => 'Impuntualidades',
    'textoEmpresasConsultaDeInformesDiasNoLaborales' => 'Días no Laborales',
    'textoEmpresasConsultaDeInformesSeleccionaUnaFecha' => 'Selecciona Una Fecha',

    //Historial de Entradas y Salidas
    'textoEmpresasHistorialDeEntradasYSalidasTitle' => 'Historial Entradas y Salidas <span class="fw-300">Dashboard</span>',
    'textoEmpresasHistorialDeEntradasYSalidasHistorial' => 'Historial Entradas y Salidas',
    'textoEmpresasHistorialDeEntradasYSalidasImportar' => 'Importar',
    'textoEmpresasHistorialDeEntradasYSalidasSeleccionaUnaFecha' => 'Selecciona Una Fecha',
    'textoEmpresasHistorialDeEntradasYSalidasID' => 'ID',
    'textoEmpresasHistorialDeEntradasYSalidasNombre' => 'Nombre',
    'textoEmpresasHistorialDeEntradasYSalidasApellido' => 'Apellido',
    'textoEmpresasHistorialDeEntradasYSalidasFechaYHora' => 'Fecha y Hora',
    'textoEmpresasHistorialDeEntradasYSalidasEntradaSalida' => 'Entrada/Salida',
    'textoEmpresasHistorialDeEntradasYSalidasComentarios' => 'Comentarios',

    //Configuraciones
    'textoEmpresasConfiguracionesTitle' => 'Configuraciones <span class="fw-300">Dashboard</span>',
    'textoEmpresasConfiguracionesConfiguraciones' => 'Configuraciones',
    'textoEmpresasConfiguracionesConfiguracionesDeLasOpcionesDeSalida' => 'Configuración de las opciones de salida',
    'textoEmpresasConfiguracionesNuevaSalida' => 'Nueva Salida',
    'textoEmpresasConfiguracionesAgregar' => 'Agregar',
    'textoEmpresasConfiguracionesIDSalida' => 'ID',
    'textoEmpresasConfiguracionesNombreDeLaSalida' => 'Nombre de la Salida',
    'textoEmpresasConfiguracionesDescansoComputable' => 'Descanso Computable',
    'textoEmpresasConfiguracionesOpcionesSalida' => 'Opciones',
    'textoEmpresasConfiguracionesSeleccionaElIdiomaQueVeranTusUsuarios' => 'Selecciona el idioma que verán tus usuarios',
    'textoEmpresasConfiguracionesNombreDeLaEmpresa' => 'Nombre de la Empresa',
    'textoEmpresasConfiguracionesModificar' => 'Modificar',
    'textoEmpresasConfiguracionesDominio' => 'Dominio',
    'textoEmpresasConfiguracionesDominio2' => 'dominio.com',
    'textoEmpresasConfiguracionesSubdominio' => 'Subdominio',
    'textoEmpresasConfiguracionesSubdominio2' => 'Nombre de la Empresa',
    'textoEmpresasConfiguracionesModificarSubdominio' => 'Modificar subdominio',
    'textoEmpresasConfiguracionesLogotipoQueVeranTusUsuarios' => 'Logotipo que verán tus usuarios',
    'textoEmpresasConfiguracionesConfiguracionDeLaZonaHoraria' => 'Configuración de la Zona Horaria',
    'textoEmpresasConfiguracionesConfiguracionDeLasPlantillas' => 'Configuración de las Plantillas',
    'textoEmpresasConfiguracionesAgregarNuevaPlantilla' => 'Agregar Nueva Plantilla',
    'textoEmpresasConfiguracionesPlantillaID' => 'ID',
    'textoEmpresasConfiguracionesPlantillaNombreDeLaPlantilla' => 'Nombre de la Plantilla',
    'textoEmpresasConfiguracionesPlantillaLunes' => 'Lunes',
    'textoEmpresasConfiguracionesPlantillaMartes' => 'Martes',
    'textoEmpresasConfiguracionesPlantillaMiercoles' => 'Miercoles',
    'textoEmpresasConfiguracionesPlantillaJueves' => 'Jueves',
    'textoEmpresasConfiguracionesPlantillaViernes' => 'Viernes',
    'textoEmpresasConfiguracionesPlantillaSabado' => 'Sábado',
    'textoEmpresasConfiguracionesPlantillaDomingo' => 'Domingo',
    'textoEmpresasConfiguracionesPlantillaOpciones' => 'Opciones',
    'textoEmpresasConfiguracionesSalidasModificarSalidaTitle' => 'Modificar Salida',
    'textoEmpresasConfiguracionesSalidasModificarSalida' => 'Modificar Salida',
    'textoEmpresasConfiguracionesSalidasNombreSalida' => 'Nombre Salida',
    'textoEmpresasConfiguracionesSalidasNombreDeLaSalida' => 'Nombre de la Salida',
    'textoEmpresasConfiguracionesSalidasDescanzoComputable' => '¿Descanzo Computable?',
    'textoEmpresasConfiguracionesSalidasComputarizar' => 'Computarizar',
    'textoEmpresasConfiguracionesSalidasModificar' => 'Modificar',
    'textoEmpresasConfiguracionesNuevaPlantillaPlantillaDeHorariosNueva' => 'Plantilla de Horarios Nueva',
    'textoEmpresasConfiguracionesNuevaPlantillaNombrePlantilla' => 'Nombre Plantilla',
    'textoEmpresasConfiguracionesNuevaPlantillaNombreDeLaPlantilla' => 'Nombre de la Plantilla',
    'textoEmpresasConfiguracionesNuevaPlantillaDiasLaboralesYHorasLaborales' => 'Días Laborales y Horas Laborales (formato 12Hrs)',
    'textoEmpresasConfiguracionesNuevaPlantillaLunes' => 'Lunes',
    'textoEmpresasConfiguracionesNuevaPlantillaMartes' => 'Martes',
    'textoEmpresasConfiguracionesNuevaPlantillaMiercoles' => 'Miercoles',
    'textoEmpresasConfiguracionesNuevaPlantillaJueves' => 'Jueves',
    'textoEmpresasConfiguracionesNuevaPlantillaViernes' => 'Viernes',
    'textoEmpresasConfiguracionesNuevaPlantillaSabado' => 'Sábado',
    'textoEmpresasConfiguracionesNuevaPlantillaDomingo' => 'Domingo',
    'textoEmpresasConfiguracionesNuevaPlantillaDe' => 'De',
    'textoEmpresasConfiguracionesNuevaPlantillaA' => 'a',
    'textoEmpresasConfiguracionesNuevaPlantillaY' => 'Y',
    'textoEmpresasConfiguracionesNuevaPlantillaHora1' => '10:30AM',
    'textoEmpresasConfiguracionesNuevaPlantillaHora2' => '1:00PM',
    'textoEmpresasConfiguracionesNuevaPlantillaHora3' => '4:00PM',
    'textoEmpresasConfiguracionesNuevaPlantillaHora4' => '7:00PM',
    'textoEmpresasConfiguracionesNuevaPlantillaAgregar' => 'Agregar',
    'textoEmpresasConfiguracionesNuevaPlantillaModificarplantillaDeHorarios' => 'Modificar Plantilla de Horarios',


    /******************/
    /* FIN EMPRESAS */
    /*****************/

    /******************/
    /* TRABAJADORES */
    /*****************/

    //Login Empresas
    'TextoTrabajadoresLoginBienvenida' => 'Bienvenido a :nombre por favor ingrese su usuario y contraseña',
    'textoTrabajadoresLoginCorreoElectronico' => 'Correo Electrónico',
    'textoTrabajadoresLoginContrasena' => 'Contraseña',
    'textoTrabajadoresLoginIngresar' => 'INGRESAR',
    'textoTrabajadoresLoginOlvidaste' => '¿Olvidaste tu Contraseña?',

    //olvidaste contraseña Empresas
    'textoTrabajadoresOlvidasteBienvenida' => 'Ingresa tu correo para Recuperar tu Contraseña',
    'textoTrabajadoresOlvidasteCorreoElectronico' => 'Correo Electrónico',
    'textoTrabajadoresOlvidasteRecuperar' => 'RECUPERAR',
    'textoTrabajadoresOlvidasteIniciarSesion' => 'Iniciar Sesión',

    //inicio trabajadores
    'textoTrabajadoresInicioTitle' => 'Inicio <span class="fw-300">Dashboard</span>',
    'textoTrabajadoresInicioTotalEntradas' => 'Total Entradas',
    'textoTrabajadoresInicioTotalSalidas' => 'Total Salidas',
    'textoTrabajadoresInicioResumenDelMesActual' => 'Resumen del Mes Actual',
    'textoTrabajadoresInicioPeriodo' => 'Periodo',
    'textoTrabajadoresInicioHorasTrabajadas' => 'Horas Trabajadas',
    'textoTrabajadoresInicioHorasExtras' => 'Horas Extras',
    'textoTrabajadoresInicioDiario' => 'Diario',
    'textoTrabajadoresInicioSemanal' => 'Semanal',
    'textoTrabajadoresInicioMensual' => 'Mensual',
    'textoTrabajadoresInicioEstadisticaDeTuTrabajo' => 'Estadísticas de tu Trabajo',
    'textoTrabajadoresInicioNoHayDatos' => 'No hay Datos',
    'textoTrabajadoresInicioTotalDeEntradasYSalidas' => 'Total de Entradas y Salidas',
    'textoTrabajadoresInicioTotalEntradas2' => 'Total Entradas',
    'textoTrabajadoresInicioTotalSalidas2' => 'Total Salidas',
    'textoTrabajadoresInicioTotalEntradasEfectivas' => 'Total Entradas Efectivas',
    'textoTrabajadoresInicioTotalSalidasEfectivas' => 'Total Salidas Efectivas',
    'textoTrabajadoresInicioEntradas' => 'Entradas',
    'textoTrabajadoresInicioSalidas' => 'Salidas',

    //Perfil Trabajadores
    'textoTrabajadoresPerfilTitle' => 'Perfil',
    'textoTrabajadoresPerfilPerfil' => 'Perfil',
    'textoTrabajadoresPerfilNombre' => 'Nombre',
    'textoTrabajadoresPerfilNoEspecificado' => 'No Especificado',
    'textoTrabajadoresPerfilApellido' => 'Apellido',
    'textoTrabajadoresPerfilCorreo' => 'Correo',
    'textoTrabajadoresPerfilCargo' => 'Cargo',
    'textoTrabajadoresPerfilTelefonoFijo' => 'Teléfono Fijo',
    'textoTrabajadoresPerfilCelular' => 'Celular',
    'textoTrabajadoresPerfilFechaDeCreacion' => 'Fecha de Creación',
    'textoTrabajadoresPerfilDNI' => 'DNI',
    'textoTrabajadoresPerfilSeguroSocial' => 'Seguro Social',
    'textoTrabajadoresPerfilEditar' => 'Editar',
    'textoTrabajadoresPerfilGuardar' => 'Guardar',
    'textoTrabajadoresPerfilCambiarContrasena' => 'Cambiar Contraseña',
    'textoTrabajadoresPerfilPassTitle' => 'Modificar Contraseña',
    'textoTrabajadoresPerfilModificarContrasena' => 'Modificar Contraseña',
    'textoTrabajadoresPerfilContrasenaActual' => 'Contraseña Actual',
    'textoTrabajadoresPerfilContrasenaNueva' => 'Contraseña Nueva',
    'textoTrabajadoresPerfilNuevaContrasena' => 'Nueva Contraseña',
    'textoTrabajadoresPerfilConfirmarContrasenaNueva' => 'Confirmar Contraseña Nueva',
    'textoTrabajadoresPerfilConfirmarNuevaContrasena' => 'Confirmar Nueva Contraseña',
    'textoTrabajadoresPerfilModificar' => 'Modificar',

    //Registros Trabajadores
    'textoTrabajadoresRegistrosTitle' => 'Entradas y Salidas <span class="fw-300">Dashboard</span>',
    'textoTrabajadoresRegistrosReloj' => 'Reloj',
    'textoTrabajadoresRegistrosDe' => 'de',
    'textoTrabajadoresRegistrosDel' => 'del',
    'textoTrabajadoresRegistrosRegistrar' => 'Registrar',
    'textoTrabajadoresRegistrosEntrada' => 'Entrada',
    'textoTrabajadoresRegistrosRegistrar' => 'Registrar',
    'textoTrabajadoresRegistrosAgregarComentario' => 'Agregar Comentario',
    'textoTrabajadoresRegistrosSalida' => 'Salida',
    'textoTrabajadoresRegistrosAgregarComentario2' => 'Agregar Comentario',
    'textoTrabajadoresRegistrosRegistrar2' => 'Registrar',

    //Historial Trabajadores

    'textoTrabajadoresHistorialTitle' => 'Historial Entradas y Salidas <span class="fw-300">Dashboard</span>',
    'textoTrabajadoresHistorialHistorial' => 'Historial Entradas y Salidas',
    'textoTrabajadoresHistorialID' => 'ID',
    'textoTrabajadoresHistorialFechaYHora' => 'Fecha y Hora',
    'textoTrabajadoresHistorialEntradaSalida' => 'Entrada/Salida',
    'textoTrabajadoresHistorialComentarios' => 'Comentarios',


    /******************/
    /* FIN TRABAJADORES */
    /*****************/

    //textos responses
    'subdominioyaexistente' => 'El subdominio ya existe.',
    'ipnocoincide' => 'La IP No coincide.',
    'geonocoincide' => 'Te encuentres en un zona fuera de tolerancia del lugar de registro de asistencia.',
    'geonohabilitado' => 'Favor de habilitar la geolocalización.',
    'devicenotavailable' => 'Utiliza un Dispositivo Aprobado por la Empresa.',
    'entradaSeguidaDeEntrada' => 'Una entrada no puede ir seguida de otra entrada en el mismo día.',
    'salidaseguidaDeSalida' => 'Una salida no puede ir seguida de otra salida en el mismo día.',
    'salidaComoPrimero' => 'Registre una Entrada primero.',

    //libraries
    'successTrue' => "TRUE",
    'successFalse' => "FALSE",
    'admin' => "ADMIN",
    'prioridadWelcome' => '3',
    'prioridadReset' => '1',
    'prioridadVerificationCompare' => '3',
    'prioridadPswd' => '3',
    'prioridadCustom' => '5',

    //BD Messages and Errors
    'BDempty' => "Base de datos vacía",
    'BDdataCheck' => "Todo se revisó correctamente",
    'BDdata' => "Hay datos en la base de datos",
    'BDnoData' => "No hay datos iguales en la base de datos",
    'BDsuccess' => "La información se actualizó correctamente",
    'errorsBD' => "Hubo un error por favor contacte al administrador o revise su conexión a internet",
    'errorsBDFail' => "Correo o Contraseña incorrecta",
    'errorsBDMailFail' => "Correo o Contraseña incorrecta",
    'errorsBDRepeat' => "Estos datos ya existen",
    'errorsBDRepeatMail' => "Ese correo electrónica ya existe. Intenta recuperar tu contraseña.",
    'errorFormat' => "El archivo que desea cargar tiene un formato no válido.",
    'BDsentMail' => "Te hemos enviado un correo electrónico con tu nueva contraseña..",
    'noHayTrabajadores' => "No Hay Trabajadores Agregados.",

    //contraseñas
    'NotFoundMail' => "No encontramos el correo electrónico",
    'SentEmail' => "Le Hemos enviado un correo electrónico con su nueva contraseña",

];

?>
