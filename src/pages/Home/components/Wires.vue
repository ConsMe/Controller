<template>
  <div class="home__flex table">
    <div class="table__name">{{ name }}</div>
    <div class="table__table table__table_3">
      <div class="table__top-row">
        <div class="table__colum">№ бл.</div>
        <div class="table__colum table__colum_pdd-r">№вх.</div>
        <div class="table__colum">Статус</div>
      </div>
      <div class="table__overflow1">
        <div
          class="table__row"
          v-for="(s, i) in states[type]"
          :key="`${s.device}${i}`"
          @click="$emit('showRenamePopup', type, s.device, s.index, s.label)"
        >
          <div class="table__colum">{{ s.device }}</div>
          <div class="table__colum">
            {{ s.label }}
          </div>
          <div class="table__colum table__colum_btt1 table__colum_btt9">
            <div class="table__colum table__colum_btt1 table__colum_btt9" v-if="type === 'itmp'">
              {{ `${s.value}°C` }}
            </div>
            <status v-else :isActive="s.value" />
          </div>
        </div>
        <div
          class="table__row no-hover"
          v-for="(s, i) in newWires[type]"
          :key="`new${s.device}${i}`"
        >
          <div class="table__colum">{{ s.device }}</div>
          <div class="table__colum">
            {{ s.value }}
          </div>
          <div class="table__colum table__colum_btt1 table__colum_btt9">
            <button
              class="add-btn"
              title="Добавить"
              @click="$emit('addWire', type, s.device, s.value)"
            >
              +
            </button>
          </div>
        </div>
        <div class="table__row no-hover">
          <scan-button
            @startScan="$emit('startScan', type)"
            @stopScan="$emit('stopScan', type)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScanButton from './ScanButton.vue';
import Status from './img/Status.vue';

export default {
  props: ['type', 'states', 'newWires'],
  components: {
    ScanButton,
    Status,
  },
  computed: {
    name() {
      switch (this.type) {
        case 'ikey':
          return 'Ключи доступа 1-Wire-1';
        case 'ibtn':
          return 'Кнопки 1-Wire-2';
        case 'itmp':
          return 'Температура 1-Wire-3';
        default:
          return '';
      }
    },
  },
};
</script>
