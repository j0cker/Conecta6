<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <style type="text/css" rel="stylesheet" media="all">
        /* Media Queries */
        @media  only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
            }
        }
    </style>
</head>

<body style="<?php echo e($style['body']); ?>">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td style="<?php echo e($style['email-wrapper']); ?>" align="center">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <!-- Logo -->
                    <tr>
                        <td style="<?php echo e($style['email-masthead']); ?>">
                            <a style="<?php echo e($fontFamily); ?> <?php echo e($style['email-masthead_name']); ?>" href="<?php echo e(url('/')); ?>" target="_blank">
                                <?php echo e(config('app.name')); ?>

                            </a>
                        </td>
                    </tr>
