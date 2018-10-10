<?php
  function sqlDate() {
    return date('Y-m-d H:i:s');
  }

  function sqlUid($prefix = '') {
    return uniqid($prefix, true);
  }
?>