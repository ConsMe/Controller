<template>
  <!-- eslint-disable max-len -->
  <main class="function">
    <popup-add :showPopupAddTrigger="showPopupAddTrigger" @newFunc="addFunc" />
    <popup-delete
      :showPopupDelTrigger="showPopupDelTrigger"
      :index="deleteFuncIndex"
      @del="delFunc" />
    <div class="function__top">
      <div class="function__title title">Функции</div>
      <div class="function__button button1" @click="openAddPopup">
        Добавить
      </div>
    </div>
    <div
      class="function__content">
      <div
        v-for="(init, i) in funcsInit"
        :key="i"
        v-show="init && !init.isDeleted"
        class="function__row">
        <div class="function__hed" @click="toggleVisibility(init)">
          <div class="function__name">
            {{ funcsNames[i] }}
          </div>
          <input
            type="text"
            name="name"
            class="function__rename"
            v-model="funcsNames[i]">
          <div class="function__btt">
            <div class="function__svg function__svg_dis">
              <edit-img />
            </div>
            <div class="function__svg" @click.stop="showPopupDel(i)">
              <delete-img />
            </div>
            <div class="function__svg">
              <expand-img />
            </div>
          </div>
        </div>
        <div>
          <function
            :init="canApply ? init : null"
            :objects="objects"
            :allDevices="allDevices"
            :isVisible="init ? visibility[init.fname] : false"
            :name="init ? init.fname : ''"
            :index="i"
            :hasNoFloat="hasNoFloat"
            :ext="ext" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import allObjects from '@/data/objects';
import hasComplexAddr from '@/data/hasComplexAddr';
import hasNoFloat from '@/data/hasNoFloat';
import EditImg from '../img/EditImg.vue';
import DeleteImg from '../img/DeleteImg.vue';
import ExpandImg from '../img/ExpandImg.vue';
import Function from './Function.vue';
import PopupAdd from './PopupAdd.vue';
import PopupDelete from './PopupDelete.vue';

export default {
  components: {
    EditImg,
    DeleteImg,
    ExpandImg,
    Function,
    PopupAdd,
    PopupDelete,
  },
  data() {
    return {
      funcsNames: [],
      funcsInit: [],
      objects: [],
      allDevices: [],
      canApply: false,
      hasComplexAddr,
      visibility: {},
      showPopupAddTrigger: null,
      showPopupDelTrigger: null,
      deleteFuncIndex: null,
      hasNoFloat,
      ext: process.env.VUE_APP_IS_TEST === '1' ? '.php' : '',
    };
  },
  created() {
    axios.post(`/api/get_flist${this.ext}`)
      .then((r) => {
        this.funcsNames = r.data.func_names;
        this.funcsInit = new Array(r.data.func_names.length).fill(null);
        this.getAllFuncs();
      });
    axios.post(`/api/devlist${this.ext}`)
      .then((r) => {
        const objects = this.clone(allObjects);
        r.data.devices.forEach((d) => {
          const device = this.clone(d);
          objects.forEach((t, i) => {
            if (t.devName in d && d[t.devName] > 0) {
              if (!('devices' in t)) objects[i].devices = [];
              objects[i].devices.push({ value: d.addr, label: d.addr });
            }
          });
          this.hasComplexAddr.forEach((h) => {
            delete device[h];
          });
          this.getDevice(device);
        });
        this.objects = objects.filter((t) => t.devices || ['var', 'time'].includes(t.value));
        this.canApply = true;
      });
  },
  methods: {
    getAllFuncs() {
      this.funcsNames.forEach((f, i) => {
        this.getFunc(i);
      });
    },
    getFunc(index) {
      axios.post(`/api/get_func${this.ext}`, { function: index })
        .then((r) => {
          const func = this.transformData(r.data);
          this.$set(this.funcsInit, index, func);
        });
    },
    getDevice(device) {
      // axios.post(`/api/state${this.ext}`, { device: device.addr })
      //   .then((r) => {
      //     const addrs = {};
      //     this.hasComplexAddr.forEach((a) => {
      //       if (!r.data[a]) return;
      //       r.data[a].forEach((addr) => {
      //         if (!(a in addrs)) addrs[a] = [];
      //         if (typeof addr === 'string') {
      //           addrs[a].push(addr);
      //         } else {
      //           addrs[a].push(...Object.keys(addr));
      //         }
      //       });
      //     });
      //     Object.assign(device, addrs);
      //   });
      this.allDevices.push(device);
      this.getWireAddresses(device, this.allDevices.length - 1);
    },
    getWireAddresses(device, index) {
      axios.post(`/api/get_wlist${this.ext}`, { device: device.addr })
        .then((r) => {
          const addrs = r.data;
          axios.post(`/api/get_label${this.ext}`, { device: device.addr })
            .then((r2) => {
              const labels = r2.data;
              this.hasComplexAddr.forEach((k) => {
                if (addrs[k] && addrs[k].length) {
                  const addrsLabels = addrs[k].map((a, i) => (
                    {
                      value: a,
                      label: labels[k] && labels[k][i] && labels[k][i].length ? labels[k][i] : a,
                    }
                  ));
                  this.$set(this.allDevices[index], k, addrsLabels);
                } else {
                  this.$set(this.allDevices[index], k, []);
                }
              });
              const otherLabels = {};
              Object.keys(labels).forEach((k) => {
                if (this.hasComplexAddr.includes(k) || k === 'device') return;
                otherLabels[k] = labels[k];
              });
              this.$set(this.allDevices[index], 'label', otherLabels);
            });
        });
    },
    toggleVisibility(func) {
      const name = func.fname;
      if (name in this.visibility) {
        this.visibility[name] = !this.visibility[name];
      } else {
        this.$set(this.visibility, name, true);
      }
    },
    openAddPopup() {
      this.showPopupAddTrigger = Math.random();
    },
    addFunc(name) {
      this.funcsNames.push(name);
      this.funcsInit.push({
        fname: name,
        trigger: {},
        logic: null,
        conditions: [],
        actions: [],
      });
      setTimeout(() => {
        this.funcsInit[this.funcsInit.length - 1].actions.push({});
        this.visibility = { [name]: true };
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 0);
      }, 0);
    },
    showPopupDel(index) {
      this.deleteFuncIndex = index;
      this.showPopupDelTrigger = Math.random();
    },
    delFunc(index) {
      axios.post(`/api/get_flist${this.ext}`, { function: index })
        .then((r) => {
          const i = r.data.func_names.findIndex((f) => f === this.funcsNames[index]);
          axios.post(`/api/del_func${this.ext}`, { function: i })
            .then(() => {
              this.$set(this.funcsInit[index], 'isDeleted', true);
            });
        });
    },
    transformData(f) {
      const func = f;
      func.trigger = this.intToFloat(func.trigger);
      func.conditions = func.conditions.map((c) => this.intToFloat(c));
      func.actions = func.actions.map((a) => this.intToFloat(a));
      return func;
    },
    intToFloat(d) {
      const data = d;
      if (this.hasNoFloat.includes(d.object.type)) {
        ['value', 'min', 'max'].forEach((p) => {
          if (p in d && d[p]) data[p] /= 100;
        });
      }
      return data;
    },
  },
};
</script>
