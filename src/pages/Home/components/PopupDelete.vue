<template>
  <div class="popup" v-show="isShown" @click="!disabled ? isShown = false : ''">
    <div class="popup__modal" @click.stop>
      <div class="popup__hed">Удалить {{ label }}?</div>
      <div class="popup__flex">
        <div
          class="popup__button1"
          :class="{ 'dsbl-btn': disabled }"
          @click="disabled ? '' : isShown = false">
          Нет
        </div>
        <div class="popup__button2" :class="{ 'dsbl-btn': disabled }" @click="del">Да</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showPopupDelTrigger', 'label'],
  data() {
    return {
      isShown: false,
      disabled: false,
    };
  },
  watch: {
    showPopupDelTrigger(showPopupDelTrigger) {
      this.disabled = false;
      this.isShown = !!showPopupDelTrigger;
    },
  },
  methods: {
    del() {
      if (this.disabled) return;
      this.disabled = true;
      this.$emit('delete');
      this.isShown = false;
    },
  },
};
</script>
