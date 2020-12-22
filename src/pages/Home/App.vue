<template>
  <div id="app">
    <left-side-bar />
    <header-comp />
    <panel />
  </div>
</template>

<script>
import '@/assets/reset_new.css';
import '@/assets/style_new.scss';
import '@/assets/tooltip.scss';
import LeftSideBar from '@/components/LeftSideBar.vue';
import HeaderComp from '@/components/Header.vue';
import Panel from './components/Panel.vue';

export default {
  name: 'App',
  components: {
    LeftSideBar,
    HeaderComp,
    Panel,
  },
};
</script>

<style lang="scss">
</style>
