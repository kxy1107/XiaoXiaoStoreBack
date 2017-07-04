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
}

.contain {
  display: flex;
  height: 100%;
}
.main-content{
  padding: 10px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>
