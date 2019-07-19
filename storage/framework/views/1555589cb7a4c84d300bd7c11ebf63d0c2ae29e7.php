<?php echo $__env->make('sign.header', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
  <?php echo $__env->yieldContent('content'); ?>
<?php echo $__env->make('sign.footer', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
