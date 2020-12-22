<template>
  <div class="obj-block">
    <custom-select
      @change="type = $event"
      :options="objects"
      :valueInit="type"
      header="Тип объекта"
      class="select1" />
    <custom-select
      v-if="devices.length"
      @change="setDevice"
      :options="devices"
      :valueInit="device"
      header="Блок"
      class="select1 mini" />
    <custom-select
      v-if="devices.length || type === 'var'"
      @change="addr = $event"
      :options="addrs"
      :valueInit="addr"
      :header="addressInputName"
      class="select1 mini" />
  </div>
</template>

<script>
import hasComlplexAddr from '@/data/hasComplexAddr';
import CustomSelect from '../CustomSelect.vue';

export default {
  props: ['init', 'objects', 'allDevices', 'index'],
  components: {
    CustomSelect,
  },
  data() {
    return {
      type: null,
      device: null,
      addr: null,
      hasComlplexAddr,
    };
  },
  computed: {
    objectFull() {
      const obj = this.type
        ? this.objects.find((o) => o.value === this.type) : null;
      return obj ? this.clone(obj) : null;
    },
    devices() {
      return (this.objectFull && this.objectFull.devices) ? this.objectFull.devices : [];
    },
    addrs() {
      if (this.type === 'var') {
        return new Array(33).fill({}).map((_, i) => ({ value: i, label: i + 1 }));
      }
      if (this.device === null) return [];
      const device = this.allDevices.find((d) => d.addr === this.device);
      const { devName } = this.objectFull;
      if (!device || !device[devName]) return [];
      if (this.hasComlplexAddr.includes(devName)) {
        return device[devName].map((d) => ({ label: d.label, value: d.value }));
      }
      return new Array(device[devName]).fill({}).map((_, i) => (
        {
          value: i,
          label: device.label && device.label[this.type] && device.label[this.type][i]
            && device.label[this.type][i].length ? device.label[this.type][i] : i + 1,
        }
      ));
    },
    obj() {
      return {
        type: this.type,
        device: this.device,
        addr: this.addr,
      };
    },
    addressInputName() {
      if (this.type === 'var') return 'Номер';
      if (this.hasComlplexAddr.includes(this.type)) return 'Адрес';
      return 'Вход/выход';
    },
  },
  watch: {
    devices(devices) {
      if (this.device === null) return;
      const device = devices.find((d) => d.value === this.device);
      if (!device) this.device = null;
    },
    obj: {
      handler(obj) {
        this.$emit('change', obj);
      },
      deep: true,
    },
    device(device) {
      if (device === null) this.addr = null;
    },
    init: {
      handler(init) {
        if (init) {
          this.type = init.type;
          this.device = init.device;
          this.addr = init.addr;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    setDevice(e) {
      this.device = e;
      if (this.addr !== null) {
        const addr = this.addrs.find((a) => a.value === this.addr);
        if (!addr) this.addr = null;
      }
    },
  },
};
</script>

<style lang="scss">
.obj-block {
  display: inline-block;
}
</style>
