<!-- Salutation -->
<p style="<?php echo e($style['paragraph']); ?>">
        Gracias.<br /><br />

        Equipo <a href="http://conecta6.com"><?php echo e(Config::get('app.name')); ?></a>
</p>

</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color: #343434;">
<table style="<?php echo e($style['email-footer']); ?>" align="center" width="570" cellpadding="0" cellspacing="0">
<tr>
<td style="<?php echo e($fontFamily); ?> <?php echo e($style['email-footer_cell']); ?>">
<p style="<?php echo e($style['paragraph-sub-footer']); ?>">
    <?php echo app('translator')->getFromJson('messages.Copyright'); ?>
</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>
