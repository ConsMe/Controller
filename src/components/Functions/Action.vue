<template>
  <div class="function__in">
    <object-block
      :objects="objectsForActions"
      :allDevices="allDevices"
      :init="init ? init.object : null"
      :index="index"
      @change="object = $event" />
    <act
      :init="initAct"
      :object="object"
      @change="change" />
    <object-block
      v-if="['copy', 'icopy'].includes(act)"
      style="display: grid;"
      :objects="objectsForCopying"
      :allDevices="allDevices"
      :init="init && init.source ? init.source : null"
      :index="index"
      @change="source = $event" />
  </div>
</template>

<script>
import ObjectBlock from './Object.vue';
import Act from './Act.vue';
import actionsList from '../../data/actions';

export default {
  props: ['objects', 'allDevices', 'init', 'index', 'objectsForActions'],
  components: {
    ObjectBlock,
    Act,
  },
  data() {
    return {
      object: null,
      act: null,
      value: null,
      delay: null,
      time: null,
      source: null,
    };
  },
  computed: {
    action() {
      const action = {};
      ['object', 'act', 'value', 'delay', 'time', 'source'].forEach((p) => {
        action[p] = this[p];
      });
      return action;
    },
    initAct() {
      if (this.init) {
        return {
          act: (this.init.act || this.init.act === 0) ? this.init.act : null,
          value: (this.init.value || this.init.value === 0) ? this.init.value : null,
          delay: (this.init.delay || this.init.delay === 0) ? this.init.delay : null,
          time: (this.init.time || this.init.time === 0) ? this.init.time : null,
          source: this.init.source || null,
        };
      }
      return null;
    },
    objectsForCopying() {
      if (!['copy', 'icopy'].includes(this.act)) return [];
      if (!this.object || !this.object.type) return [];
      const action = actionsList.find((a) => a.objectTypes.includes(this.object.type));
      if (!action) return [];
      return this.objects.filter((o) => action.canBeCopied.includes(o.value));
    },
  },
  watch: {
    action: {
      handler(action) {
        this.$emit('change', this.clone(action));
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
