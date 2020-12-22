<template>
  <main class="home">
    <div class="popup1" v-show="popupIsShown" @click="!disabled ? popupIsShown = false : ''">
      <div class="popup__modal1" @click.stop>
        <div class="popup__hed1">Переименовать вход/выход</div>
        <div class="popup__flex1">
          <input
            type="text"
            maxlength="20"
            placeholder="Введите название входа/выхода"
            class="popup__input1 input"
            v-model="newLabel"
            ref="label"
            @keypress.enter="rename">
          <div
            class="popup__butt1 button1" @click="rename" :class="{ 'dsbl-btn': disabled }">
            Сохранить
          </div>
          <div
            class="popup__butt1 button1"
            :class="{ 'dsbl-btn': disabled }"
            style="margin-left: 5px; background-color: red;"
            @click="!disabled ? popupIsShown = false : ''">
            Отмена
          </div>
          <div
            class="popup__butt1 button1"
            :class="{ 'dsbl-btn': disabled }"
            style="margin-left: 5px; background-color: darkred;"
            v-if="hasComplexAddr.includes(renameParams.type)"
            @click="!disabled ? showPopupDelTrigger = Math.random() : ''">
            Удалить
          </div>
        </div>
        </div>
    </div>
    <popup-delete
      :showPopupDelTrigger="showPopupDelTrigger"
      :label="renameParams.label"
      @delete="deleteWire" />
    <div class="home__title title">Информационная панель</div>
    <nav class="home__nav nav">
      <div class="nav__btt">
        <div
          class="nav__name nav__btt_active nav__name_1"
          @click="home(1,$event);"
        >
          Входы
        </div>
        <div class="nav__select">
          <div class="nav__option nav__option_top" @click="show_table(1,$event)">
            Аналоговые входы
          </div>
          <div class="nav__option" @click="show_table(2, $event)">
            Дискретные входы
          </div>
          <div class="nav__option" @click="show_table(3, $event)">
            Ключи доступа 1-Wire-1
          </div>
          <div class="nav__option" @click="show_table(4, $event)">
            Кнопки 1-Wire-2
          </div>
          <div
            class="nav__option nav__option_bott"
            @click="show_table(5,$event)"
          >
            Температура 1-Wire-3
          </div>
        </div>
      </div>
      <div class="nav__btt">
        <div class="nav__name nav__name_2" @click="home(2,$event);">Выходы</div>
        <div class="nav__select">
          <div class="nav__option nav__option_top" @click="show_table(6,$event)">
            Дискретные выходы
          </div>
          <div
            class="nav__option"
            @click="show_table(7, $event)"
          >
            Аналоговые выходы
          </div>
          <div
            class="nav__option nav__option_bott"
            @click="show_table(9, $event)"
          >
            ШИМ выходы
          </div>
        </div>
      </div>
      <div class="nav__btt">
        <div class="nav__name nav__name_3" @click="home(3,$event);">
          Устройства
        </div>
        <div class="nav__select">
          <div
            class="nav__option nav__option_top nav__option_bott"
            @click="show_table(8,$event)"
          >
            Список устройств
          </div>
        </div>
      </div>
    </nav>
    <div class="home__table home__table_1 home__table_active">
      <div class="home__flex table">
        <div class="table__name">Аналоговые входы</div>
        <div class="table__table table__table_1">
          <div class="table__top-row">
            <div class="table__colum">№ бл.</div>
            <div class="table__colum">№вх.</div>
            <div class="table__colum">Статус</div>
          </div>
          <div class="table__overflow1" id="table_adc_input">
            <div
              class="table__row"
              v-for="(s, i) in states.iadc"
              :key="`${s.device}${i}`"
              @click="showRenamePopup('iadc', s.device, s.index, s.label)">
              <div class="table__colum">{{ s.device }}</div>
              <div class="table__colum">{{ s.label }}</div>
              <div class="table__colum table__colum_btt1 table__colum_btt9">
                {{ `${s.value}%` }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="home__flex table">
        <div class="table__name">Дискретные входы</div>
        <div class="table__table table__table_2">
          <div class="table__top-row">
            <div class="table__colum">№ бл.</div>
            <div class="table__colum">№вх.</div>
            <div class="table__colum">Статус</div>
          </div>

          <div class="table__overflow1" id="table_bin_input">
            <div
              class="table__row"
              v-for="(s, i) in states.ibin"
              :key="`${s.device}${i}`"
              @click="showRenamePopup('ibin', s.device, s.index, s.label)">
              <div class="table__colum">{{ s.device }}</div>
              <div class="table__colum">{{ s.label }}</div>
              <div class="table__colum table__colum_btt1 table__colum_btt9">
                <status :isActive="s.value" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <wires
        v-for="type in ['ikey', 'ibtn', 'itmp']"
        :key="type"
        :type="type"
        :states="states"
        :newWires="newWires"
        @showRenamePopup="showRenamePopup"
        @addWire="addWire"
        @startScan="startScan"
        @stopScan="stopScan" />
    </div>

    <div class="home__table home__table_2">
      <div class="home__flex home__flex_1 table">
        <div class="table__name">Дискретные выходы</div>
        <div class="table__table table__table_6">
          <div class="table__top-row">
            <div class="table__colum">№ бл.</div>
            <div class="table__colum">№вх.</div>
            <div class="table__colum table__colum_btt4">Статус</div>
          </div>

          <div class="table__overflow1">
            <div
              class="table__row"
              v-for="(s, i) in states.obin"
              :key="`${s.device}${i}`"
              @click="showRenamePopup('obin', s.device, s.index, s.label)">
              <div class="table__colum">{{ s.device }}</div>
              <div class="table__colum">{{ s.label }}</div>
              <div class="table__colum table__colum_btt1 table__colum_btt9">
                <status :isActive="s.value" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="home__flex home__flex_1 table">
        <div class="table__name">Аналоговые выходы</div>
        <div class="table__table table__table_7">
          <div class="table__top-row">
            <div class="table__colum">№ бл.</div>
            <div class="table__colum table__colum_pdd-r3">№вх.</div>
            <div class="table__colum table__colum_btt5">Статус</div>
          </div>

          <div class="table__overflow1">
            <div
              class="table__row"
              v-for="(s, i) in states.odac"
              :key="`${s.device}${i}`"
              @click="showRenamePopup('odac', s.device, s.index, s.label)">
              <div class="table__colum">{{ s.device }}</div>
              <div class="table__colum">{{ s.label }}</div>
              <div class="table__colum table__colum_btt1 table__colum_btt9">
                {{ `${s.value}%` }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="home__flex home__flex_1 table">
        <div class="table__name">ШИМ выходы</div>
        <div class="table__table table__table_9">
          <div class="table__top-row">
            <div class="table__colum">№ бл.</div>
            <div class="table__colum table__colum_pdd-r3">№вх.</div>
            <div class="table__colum table__colum_btt5">Статус</div>
          </div>

          <div class="table__overflow1">
            <div
              class="table__row"
              v-for="(s, i) in states.opwm"
              :key="`${s.device}${i}`"
              @click="showRenamePopup('opwm', s.device, s.index, s.label)">
              <div class="table__colum">{{ s.device }}</div>
              <div class="table__colum">{{ s.label }}</div>
              <div class="table__colum table__colum_btt1 table__colum_btt9">
                {{ `${s.value}%` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home__table home__table_3">
      <div class="home__flex home__flex_3 table devices-list">
        <div class="table__name">Дискретные выходы</div>
        <div class="table__table table__table_8">
          <div class="table__top-row">
            <div class="table__colum">№ бл.</div>
            <div class="table__colum table__colum_3 table__colum_mob">
              Наименование
            </div>
            <div class="table__colum">Статус</div>
          </div>
          <div class="table__overflow1" id="devices_tab">
            <div class="table__row no-hover"
              v-for="d in devices"
              :key="d.addr"
              v-show="d.addr">
              <div class="table__colum">{{ d.addr }}</div>
              <div class="table__colum table__colum_3">Без названия</div>
              <div class="table__colum table__colum_btt1 table__colum_btt8">
                <status :isActive="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import hasNoFloat from '@/data/hasNoFloat';
import hasComplexAddr from '@/data/hasComplexAddr';
import Status from './img/Status.vue';
import Wires from './Wires.vue';
import PopupDelete from './PopupDelete.vue';

export default {
  components: {
    Status,
    Wires,
    PopupDelete,
  },
  data() {
    return {
      ext: process.env.VUE_APP_IS_TEST === '1' ? '.php' : '',
      devices: [],
      allStates: {},
      hasNoFloat,
      hasComplexAddr,
      popupIsShown: false,
      renameParams: {},
      newLabel: '',
      scan: [],
      scanInterval: null,
      newWires: { ikey: [], ibtn: [], itmp: [] },
      showPopupDelTrigger: null,
      disabled: false,
      lastQuery: 'states',
    };
  },
  computed: {
    states() {
      const states = this.clone(this.allStates);
      const devices = this.clone(this.devices).sort((a, b) => a.addr - b.addr);
      Object.keys(states).forEach((k) => {
        devices.forEach((d) => {
          if (k in d.state) {
            d.state[k].forEach((s, i) => {
              states[k].push({
                device: d.addr,
                index: i,
                value: this.hasNoFloat.includes(k) ? s / 100 : s,
                label: d.label[k] && d.label[k][i]
                  ? d.label[k][i] : i + 1,
              });
            });
          }
        });
      });
      return states;
    },
  },
  created() {
    const allStates = {};
    ['ibin', 'obin', 'iadc', 'opwm', 'odac', 'ibtn', 'ikey', 'itmp', 'obtn'].forEach((p) => {
      allStates[p] = [];
    });
    this.allStates = allStates;
    this.getDevList();
  },
  methods: {
    home(id, e) {
      const width = $(window).width();
      if (width < 1314) {
        const ln = e.target;
        $(ln).next('.nav__select').addClass('nav__select_open');
      } else {
        $('.home__table').removeClass('home__table_active');
        $(`.home__table_${id}`).addClass('home__table_active');
        $('.nav__name').removeClass('nav__btt_active');
        $(`.nav__name_${id}`).addClass('nav__btt_active');
      }
    },
    show_table(id, e) {
      const ln = e.target;
      $('.nav__option').removeClass('nav__option_active');
      $(ln).addClass('nav__option_active');
      $('.table__table').removeClass('table__table_active');
      $(`.table__table_${id}`).addClass('table__table_active');
    },
    getDevList() {
      this.lastQuery = 'states';
      axios.post(`/api/devlist${this.ext}`)
        .then((r) => {
          if (!r.data.devices || !Array.isArray(r.data.devices)) return;
          const addrs = r.data.devices.map((d) => d.addr);
          this.devices.forEach((d, i) => {
            if (!addrs.includes(d.addr)) this.devices.splice(i, 1);
          });
          const promises = [];
          r.data.devices.forEach(async (d) => {
            const promise = new Promise((resolve) => {
              this.getDevice(d, resolve);
            });
            promise.then((state) => {
              let index = this.devices.findIndex((dev) => d.addr === dev.addr);
              if (index < 0) {
                index = this.devices.length;
                this.devices.push({ addr: d.addr, label: {} });
                this.getLabels(d);
              }
              this.$set(this.devices[index], 'state', state);
            });
            promises.push(promise);
          });
          Promise.all(promises).then(() => {
            setTimeout(() => {
              if (this.scan.length) {
                this.scanning();
              } else {
                this.getDevList();
              }
            }, 1000);
          });
        });
    },
    getDevice(device, resolve) {
      axios.post(`/api/state${this.ext}`, { device: device.addr })
        .then((r) => {
          if (typeof r.data !== 'object' || r.data === null) {
            resolve({});
          } else {
            resolve(r.data);
          }
        })
        .catch(() => {
          resolve({});
        });
    },
    getLabels(device) {
      axios.post(`/api/get_wlist${this.ext}`, { device: device.addr })
        .then((r) => {
          const addrs = r.data;
          axios.post(`/api/get_label${this.ext}`, { device: device.addr })
            .then((r2) => {
              const labels = r2.data;
              const label = {};
              this.hasComplexAddr.forEach((k) => {
                if (addrs[k] && addrs[k].length) {
                  label[k] = addrs[k].map((a, i) => (
                    labels[k] && labels[k][i] && labels[k][i].length ? labels[k][i] : a
                  ));
                }
              });
              Object.keys(labels).forEach((k) => {
                if (this.hasComplexAddr.includes(k) || k === 'device') return;
                label[k] = labels[k];
              });
              const index = this.devices.findIndex((d) => d.addr === device.addr);
              this.$set(this.devices[index], 'label', label);
              this.$set(this.devices[index], 'wAddresses', addrs);
              // this.newWires.ikey = [{ device: 0, value: '010063A21B0001' }];
            });
        });
    },
    showRenamePopup(type, device, index, label) {
      this.renameParams = {
        type, device, index, label,
      };
      this.newLabel = label;
      this.popupIsShown = true;
      setTimeout(() => {
        this.$refs.label.focus();
      }, 0);
    },
    rename() {
      if (!this.newLabel.length || this.disabled) return;
      const { type, device, index } = this.renameParams;
      const index2 = this.devices.findIndex((d) => d.addr === device);
      const label = Object.keys(this.devices[index2].label).length
        ? this.clone(this.devices[index2].label) : {};
      if (type in label) {
        if (label[type].length <= index) {
          label[type] = [...label[type], ...new Array(index - label[type].length).fill('')];
        }
      } else {
        label[type] = new Array(index).fill('');
      }
      label[type][index] = this.newLabel;
      const params = {
        device,
        ...label,
      };
      this.disabled = true;
      axios.post(`/api/set_label${this.ext}`, params)
        .then(() => {
          this.$toasted.success('Данные успешно сохранены', { duration: 3000 });
          this.$set(this.devices[index2], 'label', label);
        })
        .catch(() => {
          this.$toasted.error('Ошибка!', { duration: 3000 });
        })
        .finally(() => {
          this.popupIsShown = false;
          this.disabled = false;
        });
    },
    addWire(type, device, value) {
      const params = {
        device,
        ...this.clone(this.devices.find((d) => d.addr === device).wAddresses),
      };
      params[type].push(value);
      this.disabled = true;
      axios.post(`/api/set_wlist${this.ext}`, params)
        .then(() => {
          this.$toasted.success('Данные успешно сохранены', { duration: 3000 });
          const index = this.newWires[type].find((w) => (
            w.device === device && w.value === value
          ));
          this.newWires[type].splice(index, 1);
          const index2 = this.devices.findIndex((d) => d.addr === device);
          this.devices[index2].label[type].push(value);
          this.devices[index2].wAddresses[type].push(value);
        })
        .catch(() => {
          this.$toasted.error('Ошибка!', { duration: 3000 });
        })
        .finally(() => {
          this.disabled = false;
        });
    },
    startScan(type) {
      if (!this.scan.includes(type)) {
        // if (!this.scan.length && !this.scanInterval) this.scanning();
        this.scan.push(type);
      }
    },
    stopScan(type) {
      const index = this.scan.findIndex((s) => s === type);
      if (index >= 0) {
        this.scan.splice(index, 1);
      }
    },
    scanning() {
      this.scanInterval = setTimeout(() => {
        const promises = [];
        this.devices.forEach((d, i) => {
          const promise = new Promise((resolve) => {
            axios.post(`/api/upd_wlist${this.ext}`, { device: d.addr })
              .then((r) => {
                resolve(r.data);
              })
              .catch(() => {
                resolve({});
              });
          });
          promise.then((wlist) => {
            Object.keys(wlist).forEach((k) => {
              if (!this.scan.includes(k)) return;
              wlist[k].forEach((w) => {
                if (!w || !w.length) return;
                if (this.newWires[k].find((nw) => nw.value === w && nw.device === d.addr)) {
                  return;
                }
                if (!this.devices[i].wAddresses[k].includes(w)) {
                  this.newWires[k].push({ device: d.addr, value: w });
                }
              });
            });
          });
          promises.push(promise);
        });
        Promise.all(promises).then(() => {
          // if (this.scan.length) {
          //   this.scanning();
          // } else {
          //   this.scanInterval = null;
          //   this.getDevList();
          // }
          // if (!this.scan.length) this.scanInterval = null;
          this.getDevList();
        });
      }, 500);
    },
    deleteWire() {
      const { device, type, index } = this.renameParams;
      const params = {
        device,
        ...this.clone(this.devices.find((d) => d.addr === device).wAddresses),
      };
      params[type].splice(index, 1);
      this.disabled = true;
      axios.post(`/api/set_wlist${this.ext}`, params)
        .then(() => {
          this.$toasted.success('Данные успешно сохранены', { duration: 3000 });
          const index2 = this.devices.findIndex((d) => d.addr === device);
          this.devices[index2].wAddresses[type].splice(index, 1);
          this.devices[index2].label[type].splice(index, 1);
          this.devices[index2].state[type].splice(index, 1);
          this.showPopupDelTrigger = null;
          this.popupIsShown = false;
          const params2 = {
            device,
            ...this.devices[index2].label,
          };
          this.disabled = true;
          axios.post(`/api/set_label${this.ext}`, params2);
        })
        .catch(() => {
          this.$toasted.error('Ошибка!', { duration: 3000 });
        })
        .finally(() => {
          this.disabled = false;
        });
    },
    clone(a) { return JSON.parse(JSON.stringify(a)); },
  },
};
</script>

<style lang="scss">
.table__colum_btt4, .table__colum_btt5 {
  width: inherit;
}
@media (max-width: 1315px) {
  .table__colum {
      // width: 33%;
      text-align: center;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
  }
}
.table__colum:nth-child(2) {
  max-width: 50%;
  text-align: center;
}
@media (min-width: 1315px) {
  .devices-list .table__colum {
      width: 60%;
      &:first-child, &:last-child {
        width: 20%;
      }
      &:last-child {
        text-align: center;
      }
  }
}
.table__row:not(.no-hover) {
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: aliceblue;
  }
}
.toasted-container.top-right {
  top: 0 !important;
  right: 20px !important;
  max-width: 300px !important;
}
.dsbl-btn {
  opacity: 0.5;
}
.add-btn {
  font-weight: bold;
  color: limegreen;
  border: 1px solid limegreen;
  background: transparent;
  transition: all 0.3s ease;
  &:hover {
    color: white;
    background: limegreen;
  }
}
</style>
