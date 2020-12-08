<template>
  <div class="act-block">
    <custom-select
      v-if="acts.length"
      @change="change"
      :options="acts"
      :valueInit="act.act"
      header="Тип действия"
      class="select1" />
    <input
      v-for="(param, i) in params"
      :key="i"
      type="text"
      class="inputs__inp input"
      :placeholder="param.label"
      v-tooltip="param.label"
      v-model="act[param.value]">
    <!-- <template v-if="act.act">
      <span class="preposition1" v-if="act.act !== '--'">на</span>
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
import actions from '../../data/actions';
import CustomSelect from '../CustomSelect.vue';

export default {
  props: ['init', 'object'],
  components: {
    CustomSelect,
  },
  data() {
    return {
      act: {
        act: null,
        value: null,
        delay: null,
        time: null,
        source: null,
      },
      hasInput: ['value', 'delay', 'time'],
    };
  },
  computed: {
    action() {
      return this.object && this.object.type
        ? actions.find((t) => t.objectTypes.includes(this.object.type))
        : null;
    },
    acts() {
      return this.action ? this.action.acts : [];
    },
    params() {
      if (this.act.act === null) return [];
      const act = this.acts.find((e) => e.value === this.act.act);
      return act && act.params ? act.params.filter((p) => this.hasInput.includes(p.value)) : [];
    },
  },
  watch: {
    act: {
      handler() {
        if (this.act.act === null) {
          Object.keys(this.act).forEach((c) => {
            this.act[c] = null;
          });
        }
        const act = this.clone(this.act);
        Object.keys(act).forEach((e) => {
          if (!['act', 'source'].includes(e) && act[e] !== null) act[e] = parseFloat(act[e]);
        });
        this.$emit('change', act);
      },
      deep: true,
    },
    acts(acts) {
      if (this.act.act !== null) {
        const act = acts.find((c) => c.value === this.act.act);
        if (!act || act.value !== this.act.act) this.act.act = null;
      }
    },
    init: {
      handler(init) {
        Object.assign(this.act, init);
      },
      immediate: true,
    },
  },
  methods: {
    change(c) {
      this.act.act = c;
      Object.keys(this.act).forEach((p) => {
        if (p !== 'act') {
          this.act[p] = null;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.act-block {
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
