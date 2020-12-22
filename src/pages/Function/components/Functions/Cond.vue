<template>
  <div class="cond-block">
    <custom-select
      v-if="conds.length"
      @change="change"
      :options="conds"
      :valueInit="cond.cond"
      header="Тип проверки"
      class="select1" />
    <input
      v-for="(param, i) in params"
      :key="i"
      type="text"
      class="inputs__inp input"
      :placeholder="param.label"
      v-tooltip="param.label"
      v-model="cond[param.value]">
    <!-- <template v-if="cond.cond">
      <span class="preposition1" v-if="cond.cond !== '--'">на</span>
      <span class="preposition2" v-else>в течение</span>
      <input
        type="text"
        class="inputs__inp input time"
        placeholder="Время, мс"
        v-model="event.time">
    </template> -->
  </div>
</template>

<script>
import conditions from '@/data/conditions';
import CustomSelect from '../CustomSelect.vue';

export default {
  props: ['init', 'object'],
  components: {
    CustomSelect,
  },
  data() {
    return {
      cond: {
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
      },
    };
  },
  computed: {
    condition() {
      return this.object && this.object.type
        ? conditions.find((t) => t.objectTypes.includes(this.object.type))
        : null;
    },
    conds() {
      return this.condition ? this.condition.conds : [];
    },
    params() {
      if (this.cond.cond === null) return [];
      const cond = this.conds.find((e) => e.value === this.cond.cond);
      return cond && cond.params ? cond.params : [];
    },
  },
  watch: {
    cond: {
      handler() {
        if (this.cond.cond === null) {
          Object.keys(this.cond).forEach((c) => {
            this.cond[c] = null;
          });
        }
        const cond = this.clone(this.cond);
        Object.keys(cond).forEach((e) => {
          if (!['cond', 'tmsk', 'dmsk'].includes(e) && cond[e] !== null) {
            cond[e] = parseFloat(cond[e]);
          }
        });
        this.$emit('change', cond);
      },
      deep: true,
    },
    conds(conds) {
      if (this.cond.cond !== null) {
        const cond = conds.find((c) => c.value === this.cond.cond);
        if (!cond || cond.value !== this.cond.cond) this.cond.cond = null;
      }
    },
    init: {
      handler(init) {
        Object.assign(this.cond, init);
      },
      immediate: true,
    },
  },
  methods: {
    change(c) {
      this.cond.cond = c;
      Object.keys(this.cond).forEach((p) => {
        if (p !== 'cond') {
          this.cond[p] = null;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.cond-block {
  display: inline-block;
  .preposition1 {
    margin: 0 10px 0 7px;
  }
  .preposition2 {
    margin: 0 10px 0 0px;
  }
  @media (max-width: 1315px) {
    .preposition1, .preposition2, .time {
      margin-top: 13px;
    }
  }
}
</style>
