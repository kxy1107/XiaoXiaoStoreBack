<template>
    <header>
      <img src="../assets/logo.png" alt="logo" class="header-logo">
      <div class="header-operations">
        <span >老王</span>
        <span class="exit-sys">退出系统</span>
      </div>
      </header>
</template>
<script>
  export default {
    
  };
</script>
<style>
  header {
    background-color: #20a0ff;
    height: 60px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

  }
  .header-logo {
    display: inline-block;
    vertical-align: middle;
    height: 60px;
    width: 60px;
  }
  .header-operations {
    display: inline-block;
    float: right;
    padding-right: 30px;
    height: 100%;
  }
  .header-operations span {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
    line-height: 60px;
  }
  .exit-sys{
    cursor: pointer
  }

  .header-operations:after, header:after {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
</style>