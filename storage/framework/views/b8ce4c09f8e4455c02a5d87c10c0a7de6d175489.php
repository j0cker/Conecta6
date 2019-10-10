  

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

  

  <?php $__env->startSection('controller','recuperarTrabajadores'); ?>

  

  <?php $__env->startSection('content'); ?>


    <!--Main layout-->
    <main>
    
        <section id="signin">

          <div class="row">

            <div class="col-md-3"></div>

            <div class="col-md-6">

              <div class="card">

                <div class="card-image resaltar">
                  <img onerror="this.src='<?php echo e(url('img/logo-example.png')); ?>'" class="profile-image logoCompany text-center" src="<?php echo e(url('img/logo-example.png')); ?>">
                </div>

                <div class="card-content">

                  <div class="col-md-2"></div>

                  <div class="col-md-8 resaltar">

                    <p class="resaltar">Ingresa tu correo para Recuperar tu Contraseña</p>

                    <div class="input-group resaltar">
                      <span class="input-group-addon "><span class="fa fa-user"></span></span>
                      <input id="correo" type="text" placeholder="Correo Electrónico" class="form-control bootstrap-normal-input" aria-label="Amount (to the nearest dollar)">
                    </div>

                    <button ng-click="postRecuperarClick()" id="ingresarButton" style="margin-top: 40px; margin-bottom: 40px;" class="btn waves-effect waves-light resaltar" type="submit" name="action">Recuperar
                      <i class="fa fa-sign-in" aria-hidden="true"></i>
                    </button>

                    <a style="margin-bottom: 40px;" href="#">
                      <p class="resaltar"><a href="<?php echo e(url('/'.$subdominio.'/')); ?>">Iniciar Sesión</a></p>
                    </a>
                    
                  </div>

                </div>

                <div class="col-md-2"></div>

                <div class="wave"></div>

              </div>

            </div>

            <div class="col-md-3"></div>

          </div>

        </section>

    </main>
    <!--Main layout-->

    <script>
        $(document).ready(function(){

          angular.element('body').scope().getImageEmpresaClick("<?php echo e($id_empresas); ?>");
        });
    </script>

    <?php $__env->stopSection(); ?>

<?php echo $__env->make('trabajadores.master', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>