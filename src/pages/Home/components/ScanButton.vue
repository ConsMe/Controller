<template>
  <button @click="isActive = !isActive" class="scan-btn" :class="{ 'is-active': isActive }">
    {{ isActive ? 'Сканирование' : 'Сканировать' }}
    <span v-if="isActive">
      <span class="loader__dot">.</span>
      <span class="loader__dot">.</span>
      <span class="loader__dot">.</span>
    </span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  watch: {
    isActive(isActive) {
      if (isActive) {
        this.$emit('startScan');
      } else {
        this.$emit('stopScan');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scan-btn {
  background: transparent;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid grey;
  font-size: 14px;
  width: 100%;
  transition: all 0.3s ease;
  &:hover {
    background-color: #d3d3d340;
  }
}
.is-active {
  background-color: #d3d3d340;
}
@keyframes blink {50% { color: transparent }}
.loader__dot { animation: 1s blink infinite }
.loader__dot:nth-child(2) { animation-delay: 250ms }
.loader__dot:nth-child(3) { animation-delay: 500ms }
</style>
