<?php echo $__env->make('admin.header', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
  <?php echo $__env->yieldContent('content'); ?>
<?php echo $__env->make('admin.footer', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
