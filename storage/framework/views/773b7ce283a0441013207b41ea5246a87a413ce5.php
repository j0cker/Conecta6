<!DOCTYPE html>
<html lang="<?php echo $__env->yieldContent('lang'); ?>" ng-app="myApp">
        
        <title><?php echo $__env->yieldContent('title'); ?></title>


        <meta http-equiv="Content-Type" content="<?php echo $__env->yieldContent('Content-Type'); ?>">
        <meta http-equiv="x-ua-compatible" content="<?php echo $__env->yieldContent('x-ua-compatible'); ?>">
        <meta name="keywords" content="<?php echo $__env->yieldContent('keywords'); ?>"/>
        <meta name="description" content="<?php echo $__env->yieldContent('description'); ?>">
        <meta name="viewport" content="<?php echo $__env->yieldContent('viewport'); ?>">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
        <meta name="author" content="Manlio Emiliano Terán Ramos">

        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui">
        <!-- Call App Mode on ios devices -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <!-- Remove Tap Highlight on Windows Phone IE -->
        <meta name="msapplication-tap-highlight" content="no">

        <style>
        :root {
        
  
              

                <?php if(in_array("1", $user["permisos"])): ?>

                    <?php
                    $hex = "#ad0a38";
                    list($r, $g, $b) = sscanf($hex, "#%02x%02x%02x");
                    ?>

                    --main-bg-color: <?php echo $hex; ?> !important;
                    --main-bg-color-transparent-5: rgba(<?php echo $r; ?>,<?php echo $g; ?>,<?php echo $b; ?>,0.6) !important;
                    --main-bg-color-transparent-1: rgba(<?php echo $r; ?>,<?php echo $g; ?>,<?php echo $b; ?>,0.2) !important;
    
                <?php endif; ?>
                

                <?php if(in_array("2", $user["permisos"]) || in_array("3", $user["permisos"])): ?>

                    <?php
                    $hex = "".$colorHex."";
                    list($r, $g, $b) = sscanf($hex, "#%02x%02x%02x");
                    ?>

                    --main-bg-color: <?php echo $hex; ?> !important;
                    --main-bg-color-transparent-5: rgba(<?php echo $r; ?>,<?php echo $g; ?>,<?php echo $b; ?>,0.6) !important;
                    --main-bg-color-transparent-1: rgba(<?php echo $r; ?>,<?php echo $g; ?>,<?php echo $b; ?>,0.2) !important;

                <?php endif; ?>
                

                /*
                --main-bg-color: red !important;
                --main-bg-color-transparent-5: rgba(255,0,0,0.5) !important;
                */

                --main-color-text: #FFFFFF !important;

            }
        
        </style>

        <!-- base css -->
        <link rel="stylesheet" media="screen, print" href="<?php echo e(url('css/vendors.bundle.css?v='.cache("js_version_number").'')); ?>">
        <link rel="stylesheet" media="screen, print" href="<?php echo e(url('css/app.bundle.css?v='.cache("js_version_number").'')); ?>">

        <!-- Place favicon.ico in the root directory -->
        <link rel="apple-touch-icon" sizes="180x180" href="https://www.gotbootstrap.com/themes/smartadmin/4.0.1/img/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="https://www.gotbootstrap.com/themes/smartadmin/4.0.1/img/favicon/favicon-32x32.png">
        <link rel="shortcut icon" href="<?php echo e(url('img/icon.ico?v='.cache("js_version_number").'')); ?>" />
        <link id="mytheme" rel="stylesheet" href="<?php echo e(url('css/themes/cust-theme-'.$color.'.css?v='.cache("js_version_number").'')); ?>">

        <link rel="stylesheet" media="screen, print" href="<?php echo e(url('css/datatables.bundle.css?v='.cache("js_version_number").'')); ?>">
        <link rel="stylesheet" media="screen, print" href="<?php echo e(url('fonts/font-awesome-5-pro.css?v='.cache("js_version_number").'')); ?>">

        <link rel="stylesheet" media="screen, print" href="<?php echo e(url('css/reactions.css?v='.cache("js_version_number").'')); ?>">
        <link rel="stylesheet" media="screen, print" href="<?php echo e(url('css/fullcalendar.bundle.css?v='.cache("js_version_number").'')); ?>">
        <link rel="stylesheet" media="screen, print" href="<?php echo e(url('css/jqvmap.bundle.css?v='.cache("js_version_number").'')); ?>">
        <link rel="stylesheet" href="<?php echo e(url('css/loader.css?v='.cache("js_version_number").'')); ?>">
        <link rel="stylesheet" href="<?php echo e(url('css/clock.css?v='.cache("js_version_number").'')); ?>">
        <link href="<?php echo e(url('css/selects.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
        <link href="<?php echo e(url('css/datepicker.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
        <link href="<?php echo e(url('css/daterangepicker.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
        <link href="<?php echo e(url('css/map.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
        <link href="<?php echo e(url('css/slider.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />
        <link href="<?php echo e(url('css/timepicker.css?v='.cache("js_version_number").'')); ?>" rel="stylesheet" />

        <!-- Toastr -->
        <link rel="stylesheet" href="<?php echo e(url('css/toastr.css?v='.cache("js_version_number").'')); ?>">



    </head>
    <body class="mod-bg-1 " ng-controller="<?php echo $__env->yieldContent('controller'); ?>">

        <!-- .page-loader-->
        <div id="loader-wrapper">
            <div id="loader"></div>
            <div class="loader-section"></div>
        </div>
        
        <!-- DOC: script to save and load page settings -->
        <script>
            /**
             *	This script should be placed right after the body tag for fast execution 
             *	Note: the script is written in pure javascript and does not depend on thirdparty library
             **/
            'use strict';

            var classHolder = document.getElementsByTagName("BODY")[0],
                /** 
                 * Load from localstorage
                 **/
                themeSettings = (localStorage.getItem('themeSettings')) ? JSON.parse(localStorage.getItem('themeSettings')) :
                {},
                themeURL = themeSettings.themeURL || '',
                themeOptions = themeSettings.themeOptions || '';
            /** 
             * Load theme options
             **/
            if (themeSettings.themeOptions)
            {
                classHolder.className = themeSettings.themeOptions;
                console.log("%c✔ Theme settings loaded", "color: #148f32");
            }
            else
            {
                console.log("Heads up! Theme settings is empty or does not exist, loading default settings...");
            }
            if (themeSettings.themeURL && !document.getElementById('mytheme'))
            {
                var cssfile = document.createElement('link');
                cssfile.id = 'mytheme';
                cssfile.rel = 'stylesheet';
                cssfile.href = themeURL;
                document.getElementsByTagName('head')[0].appendChild(cssfile);
            }
            /** 
             * Save to localstorage 
             **/
            var saveSettings = function()
            {
                themeSettings.themeOptions = String(classHolder.className).split(/[^\w-]+/).filter(function(item)
                {
                    return /^(nav|header|mod|display)-/i.test(item);
                }).join(' ');
                if (document.getElementById('mytheme'))
                {
                    themeSettings.themeURL = document.getElementById('mytheme').getAttribute("href");
                };
                localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
            }
            /** 
             * Reset settings
             **/
            var resetSettings = function()
            {
                localStorage.setItem("themeSettings", "");
            }

        </script>