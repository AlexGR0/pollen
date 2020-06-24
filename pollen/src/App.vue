<template>
  <div>
    <transition
      :duration="{ enter: 250, leave: 250 }"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  watch: {
    $route: function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>