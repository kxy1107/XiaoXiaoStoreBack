<template>
  <div class="app">
    <transition>
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>
<style scoped>


@import url("/static/common.css");
@import url("/static/css/font-awesome.css");
</style>
