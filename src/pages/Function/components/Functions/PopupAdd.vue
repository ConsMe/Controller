<template>
  <div class="popup1" v-show="isShown" @click="isShown = false">
    <div class="popup__modal1">
      <div class="popup__hed1">Добавить функцию</div>
      <div class="popup__flex1" @click.stop>
        <input
          type="text"
          class="popup__input1 input"
          v-model="funcName"
          placeholder="Введите название функции"
        />
        <div class="popup__butt1 button1" @click="add">
          Добавить
        </div>
        <div
          class="popup__butt1 button1"
          @click="isShown = false"
          style="margin-left: 5px; background-color: red"
        >
          Отмена
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showPopupAddTrigger'],
  data() {
    return {
      isShown: false,
      funcName: '',
    };
  },
  watch: {
    showPopupAddTrigger() { this.isShown = true; },
  },
  methods: {
    add() {
      if (this.funcName.length) {
        this.$emit('newFunc', this.funcName);
        this.isShown = false;
        this.funcName = '';
      }
    },
  },
};
</script>
