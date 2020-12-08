<template>
  <div class="function__row2">
    <div class="function__row-name">Условие</div>
    <div class="function__in">
      <custom-select
        @change="logic = $event"
        :options="logics"
        :valueInit="logic"
        class="select1" />
    </div>
    <template v-if="logic !== null">
      <condition
        v-for="(c, i) in conditions"
        :key="i"
        :objects="objects"
        :allDevices="allDevices"
        :init="init.conditions[i]"
        :index="i"
        @change="setCondition(i, $event)" />
      <div
        class="function__btt1 button0"
        style="margin-top:15px;padding-top:10px;display:block"
        @click="addCondition">
        Добавить условие
      </div>
      <div
        class="function__btt1 button0"
        style="margin-top:15px;padding-top:10px;display:block"
        v-if="conditions.length"
        @click="deleteCondition">
        Удалить условие
      </div>
    </template>
  </div>
</template>

<script>
import CustomSelect from '../CustomSelect.vue';
import Condition from './Condition.vue';

export default {
  props: ['init', 'objects', 'allDevices'],
  components: {
    CustomSelect,
    Condition,
  },
  data() {
    return {
      logics: [
        { value: null, label: 'Нет условий' },
        { value: 'or', label: 'Любое из условий' },
        { value: 'and', label: 'Весь список условий' },
      ],
      logic: null,
      conditions: [],
    };
  },
  watch: {
    init(init) {
      if (init && ['or', 'and'].includes(init.logic)) {
        this.logic = init.logic;
        if (init.conditions.length) {
          this.conditions = new Array(init.conditions.length).fill({});
        }
      }
    },
    conditions: {
      handler(conditions) {
        this.$emit('change', this.clone(conditions));
      },
      deep: true,
    },
    logic(logic) {
      if (!logic) this.conditions = [];
      this.$emit('changeLogic', logic);
    },
  },
  methods: {
    addCondition() {
      this.conditions.push({});
    },
    setCondition(i, $event) {
      this.$set(this.conditions, i, $event);
    },
    deleteCondition() {
      this.conditions.pop();
      if (!this.conditions.length) this.logic = null;
    },
  },
};
</script>
