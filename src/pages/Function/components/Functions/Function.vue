<template>
  <div class="function__seting" style="display: block" v-show="isVisible">
    <trigger
      :objects="objects"
      :allDevices="allDevices"
      :init="init"
      @change="$set(func, 'trigger', $event)"
    />
    <conditions
      :objects="objects"
      :allDevices="allDevices"
      :init="init"
      @change="$set(func, 'conditions', $event)"
      @changeLogic="$set(func, 'logic', $event)"
    />
    <actions
      :objects="objects"
      :allDevices="allDevices"
      :init="init"
      @change="$set(func, 'actions', $event)"
    />
    <div class="function__bottom">
      <div class="function__btt1 button0" @click="loadJSON">
        Экспорт в JSON
      </div>
      <div
        class="function__btt2 button1"
        :class="{ 'dsbl-btn': disabled }"
        @click="save">
        Сохранить параметры
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Trigger from './Trigger.vue';
import Conditions from './Conditions.vue';
import Actions from './Actions.vue';

export default {
  props: [
    'init',
    'objects',
    'allDevices',
    'isVisible',
    'name',
    'index',
    'hasNoFloat',
    'ext',
  ],
  components: {
    Trigger,
    Conditions,
    Actions,
  },
  data() {
    return {
      func: {
        trigger: null,
        conditions: [],
        actions: [],
        logic: null,
      },
      err: 'Произошла ошибка при попытке сохранить данную функцию, проверьте пожалуйста свой ввод и попробуйте еще раз!',
      disabled: false,
    };
  },
  watch: {
    shrinkTrigger() {},
  },
  methods: {
    save() {
      if (this.disabled) return;
      const func = this.prepareFunc();
      if (!func) return;
      axios.post(`/api/add_func${this.ext}`, func)
        .then((r) => {
          if (r.data.status === 'error') {
            this.$toasted.error(this.err, { duration: 5000 });
            // alert(this.err);
            return;
          }
          this.$toasted.success('Данные успешно сохранены', { duration: 3000 });
          // alert('Данные успешно сохранены');
        })
        .catch(() => {
          this.$toasted.error(this.err, { duration: 5000 });
          // alert(this.err);
        })
        .finally(() => {
          this.disabled = false;
        });
    },
    loadJSON() {
      if (this.disabled) return;
      const func = this.prepareFunc();
      if (!func) return;
      this.disabled = false;
      const a = document.createElement('a');
      const data = JSON.stringify(func, null, 4);
      const file = new Blob([data], { type: 'application/octet-stream' });
      a.href = URL.createObjectURL(file);
      a.download = 'function.json';
      a.click();
    },
    prepareFunc() {
      this.disabled = true;
      const cleanFunc = this.getClean();
      if (!cleanFunc) {
        this.$toasted.error(this.err, { duration: 5000 });
        this.disabled = false;
        return false;
      }
      const transformedFunc = this.transformData(cleanFunc);
      return transformedFunc;
    },
    getClean() {
      const func = this.clone(this.func);
      if (func.logic === null) func.logic = '';
      func.fname = this.name;
      try {
        func.conditions.forEach((c, i) => {
          Object.keys(c).forEach((p) => {
            if (c[p] === null) delete func.conditions[i][p];
          });
          Object.keys(c.object).forEach((p) => {
            if (c.object[p] === null) delete func.conditions[i].object[p];
          });
        });
        func.actions.forEach((c, i) => {
          Object.keys(c).forEach((p) => {
            if (c[p] === null) delete func.actions[i][p];
          });
          Object.keys(c.object).forEach((p) => {
            if (c.object[p] === null) delete func.actions[i].object[p];
          });
        });
        Object.keys(func.trigger).forEach((p) => {
          if (func.trigger[p] === null) delete func.trigger[p];
        });
        Object.keys(func.trigger.object).forEach((p) => {
          if (func.trigger.object[p] === null) delete func.trigger.object[p];
        });
        return func;
      } catch (error) {
        this.disabled = false;
        return false;
      }
    },
    transformData(f) {
      const func = f;
      func.trigger = this.floatToInt(func.trigger);
      func.conditions = func.conditions.map((c) => this.floatToInt(c));
      func.actions = func.actions.map((a) => this.floatToInt(a));
      return func;
    },
    floatToInt(d) {
      const data = d;
      if (this.hasNoFloat.includes(d.object.type)) {
        ['value', 'min', 'max'].forEach((p) => {
          if (p in d && d[p]) data[p] *= 100;
        });
      }
      return data;
    },
  },
};
</script>

<style lang="scss">
.toasted-container.top-right {
  top: 0 !important;
  right: 20px !important;
  max-width: 300px !important;
}
.dsbl-btn {
  opacity: 0.5;
}
</style>
