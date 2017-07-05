<template>
  <div class="app">
    <HeadBar></HeadBar>
    <div class="contain">
      <NavMenu></NavMenu>
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import NavMenu from '@/components/NavMenu'
export default {
  name: 'app',
  components: {
    HeadBar,
    NavMenu
  }
}
</script>
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.contain {
  display: flex;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.main-content{
  padding: 10px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@import url("/static/common.css");
</style>
