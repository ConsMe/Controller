<template>
  <div class="popup" v-show="isShown">
    <!--Выполнить действие?-->
    <div class="popup__modal">
      <div class="popup__hed">Удалить данную функцию?</div>
      <div class="popup__flex">
        <div class="popup__button1" @click="isShown = false">Нет</div>
        <div class="popup__button2" @click="del">Да</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showPopupDelTrigger', 'index'],
  data() {
    return {
      isShown: false,
    };
  },
  watch: {
    showPopupDelTrigger() {
      this.isShown = true;
    },
  },
  methods: {
    del() {
      this.$emit('del', this.index);
      this.isShown = false;
    },
  },
};
</script>
