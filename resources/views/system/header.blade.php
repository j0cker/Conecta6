<!DOCTYPE html>
<html lang="@yield('lang')" ng-app="myApp">
        
        <title>@yield('title')</title>


        <meta http-equiv="Content-Type" content="@yield('Content-Type')">
        <meta http-equiv="x-ua-compatible" content="@yield('x-ua-compatible')">
        <meta name="keywords" content="@yield('keywords')"/>
        <meta name="description" content="@yield('description')">
        <meta name="viewport" content="@yield('viewport')">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="author" content="Manlio Emiliano Terán Ramos">

        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui">
        <!-- Call App Mode on ios devices -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <!-- Remove Tap Highlight on Windows Phone IE -->
        <meta name="msapplication-tap-highlight" content="no">

        @php
        $hex = "#ad0a38";
        list($r, $g, $b) = sscanf($hex, "#%02x%02x%02x");
        @endphp

        <style>
        :root {
        
  
              
            
                @if (in_array("1", $user["permisos"]))
                    --main-bg-color: @php echo $hex; @endphp !important;
                    --main-bg-color-transparent-5: rgba(@php echo $r; @endphp,@php echo $g; @endphp,@php echo $b; @endphp,0.6) !important;
                    --main-bg-color-transparent-1: rgba(@php echo $r; @endphp,@php echo $g; @endphp,@php echo $b; @endphp,0.2) !important;
    
                @endif
                @if (in_array("3", $user["permisos"]))
                    --main-bg-color: #433191 !important;
                    --main-bg-color-transparent-5: rgba(67,49,145,0.5) !important;
                    --main-bg-color-transparent-1: rgba(67,49,145,0.1) !important;
                @endif
                

                /*
                --main-bg-color: red !important;
                --main-bg-color-transparent-5: rgba(255,0,0,0.5) !important;
                */

                --main-color-text: #FFFFFF !important;

            }
        
        </style>

        <!-- base css -->
        <link rel="stylesheet" media="screen, print" href="{{ url('css/vendors.bundle.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" media="screen, print" href="{{ url('css/app.bundle.css?v='.cache("js_version_number").'') }}">

        <!-- Place favicon.ico in the root directory -->
        <link rel="apple-touch-icon" sizes="180x180" href="https://www.gotbootstrap.com/themes/smartadmin/4.0.1/img/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="https://www.gotbootstrap.com/themes/smartadmin/4.0.1/img/favicon/favicon-32x32.png">
        <link rel="shortcut icon" href="{{ url('img/icon.ico?v='.cache("js_version_number").'') }}" />
        <link id="mytheme" rel="stylesheet" href="css/themes/cust-theme-1.css">

        <link rel="stylesheet" media="screen, print" href="{{ url('css/datatables.bundle.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" media="screen, print" href="{{ url('fonts/font-awesome-5-pro.css?v='.cache("js_version_number").'') }}">

        <link rel="stylesheet" media="screen, print" href="{{ url('css/reactions.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" media="screen, print" href="{{ url('css/fullcalendar.bundle.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" media="screen, print" href="{{ url('css/jqvmap.bundle.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" href="{{ url('css/loader.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" href="{{ url('css/clock.css?v='.cache("js_version_number").'') }}">
        <link href="{{ url('css/selects.css?v='.cache("js_version_number").'') }}" rel="stylesheet" />
        <link href="{{ url('css/datepicker.css?v='.cache("js_version_number").'') }}" rel="stylesheet" />

        <!-- Toastr -->
        <link rel="stylesheet" href="{{ url('css/toastr.css?v='.cache("js_version_number").'') }}">



    </head>
    <body class="mod-bg-1 " ng-controller="@yield('controller')">

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