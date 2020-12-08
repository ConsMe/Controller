<template>
  <div class="function__row2">
    <div class="function__row-name">Действие</div>
    <action
      v-for="(c, i) in actions"
      :key="i"
      :objects="objects"
      :objectsForActions="objectsForActions"
      :allDevices="allDevices"
      :init="init.actions[i]"
      :index="i"
      @change="setAction(i, $event)" />
    <div
      class="function__btt1 button0"
      style="margin-top:15px;padding-top:10px;display:block"
      @click="addAction">
      Добавить действие
    </div>
    <div
      class="function__btt1 button0"
      style="margin-top:15px;padding-top:10px;display:block"
      v-if="actions.length > 1"
      @click="deleteAction">
      Удалить действие
    </div>
  </div>
</template>

<script>
import Action from './Action.vue';
import actionsList from '../../data/actions';

export default {
  props: ['init', 'objects', 'allDevices'],
  components: {
    Action,
  },
  data() {
    return {
      actions: [],
    };
  },
  computed: {
    objectTypes() {
      return actionsList.map((a) => a.objectTypes).reduce((a, b) => a.concat(b), []);
    },
    objectsForActions() {
      return this.objects.filter((o) => this.objectTypes.includes(o.value));
    },
  },
  watch: {
    init: {
      handler(init) {
        if (init.actions.length) {
          this.actions = new Array(init.actions.length).fill({});
        }
      },
      deep: true,
    },
    actions: {
      handler(actions) {
        this.$emit('change', this.clone(actions));
      },
      deep: true,
    },
  },
  methods: {
    addAction() {
      this.actions.push({});
    },
    setAction(i, $event) {
      this.$set(this.actions, i, $event);
    },
    deleteAction() {
      this.actions.pop();
    },
  },
};
</script>
