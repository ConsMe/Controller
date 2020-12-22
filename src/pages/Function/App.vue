<template>
  <div id="app">
    <left-side-bar />
    <header-comp />
    <functions />
  </div>
</template>

<script>
import '@/assets/reset_new.css';
import '@/assets/style_new.scss';
import '@/assets/tooltip.scss';
import LeftSideBar from '@/components/LeftSideBar.vue';
import HeaderComp from '@/components/Header.vue';
import Functions from './components/Functions/FunctionsList.vue';

export default {
  name: 'App',
  components: {
    LeftSideBar,
    HeaderComp,
    Functions,
  },
};
</script>

<style lang="scss">
</style>
