<template>
  <div>
    <div
      v-if="isMobile"
      style="width: 100%;"
      class="select-native">
      <select
        v-model="value"
        :class="{ 'not-in-list': !optionsHaveValue }"
        @change="$emit('change', value)">
        <option
          v-for="(option, i) in allOptions"
          :key="i"
          :disabled="option.value === null"
          :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="custom-select" v-else>
      <div
        @click.stop="showHide"
        class="select-selected select-arrow-active"
        :class="{ 'not-in-list': !optionsHaveValue }"
        :title="!optionsHaveValue ? notInListMessage : null">
        {{ selectedLabel }}
      </div>
      <div class="select-items" v-show="isShown">
        <div
          v-for="(option, i) in allOptions"
          :key="i"
          :class="{ selected: value === option.value, disabled: option.value === null }"
          @click.stop="option.value === null ? '' : setValue(option)">
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'valueInit', 'header'],
  data() {
    return {
      isMobile: window.innerWidth < 670,
      value: null,
      isShown: false,
      dopOption: null,
      notInListMessage: 'Данный параметр уже устарел, из-за чего эта функция может не работать',
    };
  },
  computed: {
    optionsHaveValue() {
      if (this.value !== null) {
        const option = this.options.find((o) => o.value === this.value);
        if (!option) return false;
      }
      return true;
    },
    allOptions() {
      const options = this.header
        ? [{ value: null, label: this.header }, ...this.options] : this.options;
      if (!this.optionsHaveValue) {
        return [...options, { value: this.value, label: this.value }];
      }
      return options;
    },
    selectedLabel() {
      const option = this.allOptions.find((o) => o.value === this.value);
      return option ? option.label : null;
    },
  },
  watch: {
    valueInit: {
      handler(value) {
        this.value = value;
      },
      immediate: true,
    },
  },
  created() {
    document.addEventListener('click', () => {
      this.isShown = false;
    });
  },
  methods: {
    setValue(option) {
      this.value = option.value;
      this.isShown = false;
      this.$emit('change', option.value);
    },
    showHide() {
      this.isShown = !this.isShown;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-select, select, .select-native {
  position: relative;
}

.custom-select, .select-selected, select {
  width: inherit;
}

/* Style the arrow inside the select element: */
.select-selected::after, .select-native::after {
  content: "";
  background: url(../assets/patch.svg);
  width: 9px;
  height: 5px;
  position: absolute;
  right: 13px;
  top: 14px;
}

/* style the items (options), including the selected item: */
.select-selected, select {
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  border: 1px solid rgb(49, 79, 87);
  box-sizing: border-box;
  border-radius: 6px;
  padding: 9px 12px;
  height: 32px;
  background: rgb(255, 244, 150);
  position: relative;
  cursor: pointer;
  margin-right: 12px;
}

.select-items div {
  height: 32px;
  padding: 9px 11px;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  &.disabled {
    cursor: default;
    color: grey;
  }
}

/* Style items (options): */
.select-items {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: rgb(255, 255, 255);
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid rgb(186, 209, 215);
  overflow-y: auto;
  max-height: 128px;
}

.select-items div:not(.disabled) {
  &:hover, &.selected {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.not-in-list {
  background-color: lightcoral;
}
</style>
