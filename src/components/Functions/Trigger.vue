<template>
  <div class="function__row2">
    <div class="function__row-name">Триггер и тип события</div>
    <div class="function__in">
      <object-block
        :objects="objects"
        :allDevices="allDevices"
        :init="init ? init.trigger.object : null"
        @change="trigger.object = $event" />
      <event-block
        :init="init"
        :object="trigger.object"
        @change="change" />
    </div>
  </div>
</template>

<script>
import ObjectBlock from './Object.vue';
import EventBlock from './Event.vue';

export default {
  props: ['init', 'objects', 'allDevices'],
  components: {
    ObjectBlock,
    EventBlock,
  },
  data() {
    return {
      trigger: {
        object: null,
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
  watch: {
    trigger: {
      handler(trigger) {
        this.$emit('change', this.clone(trigger));
      },
      deep: true,
    },
  },
  methods: {
    change(e) {
      Object.keys(e).forEach((p) => {
        this.trigger[p] = e[p];
      });
    },
  },
};
</script>
