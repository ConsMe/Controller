<template>
  <div class="function__in">
    <object-block
      :objects="objects"
      :allDevices="allDevices"
      :init="init ? init.object : null"
      :index="index"
      @change="object = $event" />
    <cond
      :init="initCond"
      :object="object"
      @change="change" />
  </div>
</template>

<script>
import ObjectBlock from './Object.vue';
import Cond from './Cond.vue';

export default {
  props: ['objects', 'allDevices', 'init', 'index'],
  components: {
    ObjectBlock,
    Cond,
  },
  data() {
    return {
      object: null,
      cond: null,
      value: null,
      min: null,
      max: null,
      time: null,
      date: null,
      tmsk: null,
      dmsk: null,
      time2: null,
      date2: null,
    };
  },
  computed: {
    condition() {
      const condition = {};
      ['object', 'cond', 'value', 'min', 'max', 'time', 'date', 'tmsk', 'dmsk', 'time2', 'date2']
        .forEach((p) => {
          condition[p] = this[p];
        });
      return condition;
    },
    initCond() {
      if (this.init) {
        return {
          cond: this.init.cond || null,
          value: this.init.value || null,
          min: this.init.min || null,
          max: this.init.max || null,
          time: this.init.time || null,
          date: this.init.date || null,
          tmsk: this.init.tmsk || null,
          dmsk: this.init.dmsk || null,
          time2: this.init.time2 || null,
          date2: this.init.date2 || null,
        };
      }
      return null;
    },
  },
  watch: {
    condition: {
      handler(condition) {
        this.$emit('change', this.clone(condition));
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    change(e) {
      Object.keys(e).forEach((p) => {
        this[p] = e[p];
      });
    },
  },
};
</script>
