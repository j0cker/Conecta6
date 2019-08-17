<!DOCTYPE html>
<html lang="<?php echo $__env->yieldContent('lang'); ?>" ng-app="myApp">

<head>

  

  <?php echo e(Cache::forever('js_version_number', time())); ?>


  <title><?php echo $__env->yieldContent('title'); ?></title>

<style>

<?php
$hex = "".$colorHex."";
list($r, $g, $b) = sscanf($colorHex, "#%02x%02x%02x");
?>

:root {
  
  
  --main-bg-color: <?php echo $colorHex; ?> !important;
  --main-bg-color-transparent-5: rgba(<?php echo $r; ?>,<?php echo $g; ?>,<?php echo $b; ?>,0.6) !important;
  --main-bg-color-transparent-1: rgba(<?php echo $r; ?>,<?php echo $g; ?>,<?php echo $b; ?>,0.2) !important;
  

  /*
  --main-bg-color: red !important;
  --main-bg-color-transparent-5: rgba(255,0,0,0.5) !important;
  */

  --main-color-text: #FFFFFF !important;

}
.logoCompany{
  width:150px !important;
  height: 150px !important;
  text-align: center !important;
  display: inline-block !important;
  margin-top: 20px;
}
.card-image{
  width: 200px !important;
  height: 200px !important;
  text-align: center !important;
  display: inline-block !important;

}
.card{
  text-align: center !important;
  display: inline-block !important;
  width: 100%;
  margin-top: 50px !important;
  padding-bottom: 50px;
  overflow: hidden;
  background-color: var(--main-bg-color-transparent-1) !important;
  /*background-image: linear-gradient(135deg,rgba(255,255,255,1) 80%, var(--main-bg-color) 20%);*/
  

}
.resaltar{
  z-index: 1 !important;
}
.wave {
  width: 1000px;
  height: 1025px;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -500px;
  margin-top: -500px;
  border-radius: 35%;
  background: #FFF !important;
  animation: wave 15s infinite linear;
}

@keyframes  wave {
  from { transform: rotate(0deg);}
  from { transform: rotate(360deg);}
}
.bootstrap-normal-input{
  height: 27px !important;
  background-color: #ffffff !important;
  border: 1px solid #cccccc !important;
  padding: 4px 6px !important;
  font-size: 14px !important;
  line-height: 20px !important;
  color: #555555 !important;
  vertical-align: middle !important;
  border-radius: 0px 4px 4px 0px !important;

}
.bootstrap-normal-input:focus{

  border-bottom: 1px solid var(--main-bg-color) !important;
  -webkit-box-shadow: 0 1px 0 0 var(--main-bg-color) !important;
  box-shadow: 0 1px 0 0 var(--main-bg-color) !important;

}
.input-group{
  margin-top: 30px;
}
.btn{
  background-color: var(--main-bg-color) !important;
  color: var(--main-color-text) !important;
  border: 0 !important;
}
.btn:hover{
  background-color: var(--main-bg-color) !important;
  color: var(--main-color-text) !important;
  border: 0 !important;


}

</style>

  <meta http-equiv="Content-Type" content="<?php echo $__env->yieldContent('Content-Type'); ?>">
  <meta http-equiv="x-ua-compatible" content="<?php echo $__env->yieldContent('x-ua-compatible'); ?>">
  <meta name="keywords" content="<?php echo $__env->yieldContent('keywords'); ?>"/>
  <meta name="description" content="<?php echo $__env->yieldContent('description'); ?>">
  <meta name="viewport" content="<?php echo $__env->yieldContent('viewport'); ?>">
  <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
  <meta name="author" content="Manlio Emiliano Terán Ramos">

  <!-- css -->
  <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,400italic,700|Open+Sans:300,400,600,700" rel="stylesheet">
  <link href="<?php echo e(url('css/bootstrap.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
  <link href="<?php echo e(url('css/bootstrap-responsive.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
  <link href="<?php echo e(url('css/bootstrap-complement.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
  <link href="<?php echo e(url('css/fancybox/jquery.fancybox.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet">
  <link href="<?php echo e(url('css/jcarousel.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
  <link href="<?php echo e(url('css/flexslider.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
  <link href="<?php echo e(url('css/style.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
  <link href="<?php echo e(url('css/gradient.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />

  <!-- Fav and touch icons -->
  <link rel="shortcut icon" href="<?php echo e(url('img/icon.ico?v='.cache("js_version_number").'')); ?>" />
  <link rel="stylesheet" type="text/css" href="<?php echo e(url('css/materialize.css?v='.cache("js_version_number").'')); ?>">

  <link rel="alternate" hreflang="<?php echo $__env->yieldContent('idiomaLang'); ?>" href="<?php echo $__env->yieldContent('urlLang'); ?>" />

  <link rel="stylesheet" href="<?php echo e(url('css/animate.min.css?v='.cache("js_version_number").'')); ?>">

  <!--Animation Hover -->
  <link rel="stylesheet" href="<?php echo e(url('css/hover.css?v='.cache("js_version_number").'')); ?>">
  <link rel="stylesheet" href="<?php echo e(url('css/loader.css?v='.cache("js_version_number").'')); ?>">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

  <!-- Slider -->
  <link rel="stylesheet" type="text/css" href="<?php echo e(url('css/slider/slick.css?v='.cache("js_version_number").'')); ?>">
  <link rel="stylesheet" type="text/css" href="<?php echo e(url('css/slider/slider.css?v='.cache("js_version_number").'')); ?>">
  <link rel="stylesheet" type="text/css" href="<?php echo e(url('css/slider/normalize.css?v='.cache("js_version_number").'')); ?>">

  <!-- javascript
    ================================================== -->
  <!-- Placed at the end of the document so the pages load faster -->
  <script src="<?php echo e(url('js/jquery.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/jquery-ui.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/jquery.easing.1.3.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/bootstrap.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/jcarousel/jquery.jcarousel.min.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/jquery.fancybox.pack.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/jquery.fancybox-media.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/google-code-prettify/prettify.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/portfolio/jquery.quicksand.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/portfolio/setting.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/jquery.flexslider.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/jquery.nivo.slider.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/modernizr.custom.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/jquery.ba-cond.min.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/jquery.slitslider.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/animate.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/materialize.js?v='.cache("js_version_number").'')); ?>"></script>

  <!-- Toastr -->
  <link rel="stylesheet" href="<?php echo e(url('css/toastr.css?v='.cache("js_version_number").'')); ?>">
  <script src="<?php echo e(url('js/toastr.js?v='.cache("js_version_number").'')); ?>"></script>

  <script src="<?php echo e(url('js/functions.js?v='.cache("js_version_number").'')); ?>"></script>

  <!--Angular-->
  
  <script src="<?php echo e(url('js/angular.min.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/sanitize.min.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/module.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/controllers.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/factory.js?v='.cache("js_version_number").'')); ?>"></script>

  <!-- Template Custom JavaScript File -->
  <script src="<?php echo e(url('js/custom.js?v='.cache("js_version_number").'')); ?>"></script>

  <!-- Menu 
  <link rel="stylesheet" href="<?php echo $__env->yieldContent('menuCSS'); ?>">
  <script src="<?php echo e(url('js/menu/global-functions-menu.js?v='.cache("js_version_number").'')); ?>"></script>
  <script src="<?php echo e(url('js/menu/custom-menu.js?v='.cache("js_version_number").'')); ?>"></script>
  -->

  <!--AOS Animation Scrolling -->
  <link rel="stylesheet" href="<?php echo e(url('css/aos.css?v='.cache("js_version_number").'')); ?>">
  <script src="<?php echo e(url('js/aos.js?v='.cache("js_version_number").'')); ?>"></script>
  <script>
    $( document ).ready(function() {
      AOS.init({
        easing: 'ease-in-out-sine'
      });
    });
  </script>


</head>

<body style="padding: 0; margin: 0; overflow-x: hidden;" ng-controller="<?php echo $__env->yieldContent('controller'); ?>">

<!-- .page-loader-->
<div id="loader-wrapper">
    <div id="loader"></div>
    <div class="loader-section"></div>
</div>

<div style="overflow-x: hidden; background-color: var(--main-bg-color-transparent-5); height: 100vh;" id="wrapper">