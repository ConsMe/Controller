<template>
  <div class="event-block">
    <custom-select
      v-if="events.length"
      @change="change"
      :options="events"
      :valueInit="event.event"
      header="Тип события"
      class="select1" />
    <input
      v-for="(param, i) in params"
      :key="i"
      type="text"
      class="inputs__inp input"
      :placeholder="param.label"
      v-tooltip="param.label"
      v-model="event[param.value]">
    <!-- <template v-if="event.event">
      <span class="preposition1" v-if="event.event !== '--'">на</span>
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
import triggers from '../../data/triggers';
import CustomSelect from '../CustomSelect.vue';

export default {
  props: ['init', 'object'],
  components: {
    CustomSelect,
  },
  data() {
    return {
      event: {
        event: null,
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
    trigger() {
      return this.object && this.object.type
        ? triggers.find((t) => t.objectTypes.includes(this.object.type))
        : null;
    },
    events() {
      return this.trigger ? this.trigger.events : [];
    },
    params() {
      if (this.event.event === null) return [];
      const event = this.events.find((e) => e.value === this.event.event);
      return event && event.params ? event.params : [];
    },
  },
  watch: {
    event: {
      handler() {
        const event = this.clone(this.event);
        Object.keys(event).forEach((e) => {
          if (!['event', 'tmsk', 'dmsk'].includes(e) && event[e] !== null) {
            event[e] = parseFloat(event[e]);
          }
        });
        this.$emit('change', event);
      },
      deep: true,
    },
    events(events) {
      if (this.event.event !== null) {
        const event = events.find((e) => e.value === this.event.event);
        if (!event || event.label !== this.event.event) this.event.event = null;
      }
    },
    init(init) {
      if (init) {
        if (!('event' in init.trigger) || !init.trigger.event.length) return;
        this.event.event = init.trigger.event;
        ['value', 'min', 'max', 'time', 'date', 'tmsk', 'dmsk', 'time2', 'date2'].forEach((p) => {
          if (p in init.trigger) this.event[p] = init.trigger[p];
        });
      }
    },
  },
  methods: {
    change(e) {
      this.event.event = e;
      Object.keys(this.event).forEach((p) => {
        if (p !== 'event') this.event[p] = null;
      });
    },
  },
};
</script>

<style lang="scss">
.event-block {
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
