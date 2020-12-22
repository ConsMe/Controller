<template>
  <main class="panel">
    <div class="panel__title title">Панель управления</div>
    <nav class="panel__nav nav">
      <div class="nav__btt">
        <div
          class="nav__name nav__btt_active nav__name_1"
          @click="home(1, $event);"
        >
          Выходы
        </div>
        <div class="nav__select">
          <div
            class="nav__option nav__option_top"
            @click="show_table(2, $event)"
          >
            Дискретные выходы
          </div>
          <div class="nav__option nav__option_bott" @click="show_table(1, $event)">
            Аналоговые выходы
          </div>
          <div class="nav__option nav__option_bott" @click="show_table(4, $event)">
            ШИМ выходы
          </div>
        </div>
      </div>
      <div class="nav__btt nav__btt_2" style="display: none">
        <div class="nav__name nav__name_2" @click="home(2, $event);">
          Устройства
        </div>
        <div class="nav__select">
          <div
            class="nav__option nav__option_top nav__option_bott"
            @click="show_table(3, $event)"
          >
            Наименование
          </div>
        </div>
      </div>
    </nav>
    <div class="panel__table panel__table_1 panel__table_active">

      <div class="panel__flex panel__flex_1 table">
        <div class="table__name">Дискретные выходы</div>
        <div class="table__table table__table_2">
          <div class="table__top-row">
            <div class="table__colum">№ бл.</div>
            <div class="table__colum table__colum_ri5 table__colum_flex">
              №вых.
            </div>
            <div class="table__colum table__colum_ri">Состояние</div>
          </div>

          <div class="table__overflow1" id="table_bin">
            <div
              class="table__row table__row_padd"
              v-for="(s, i) in states.obin"
              :key="`${s.device}${i}`">
              <div class="table__colum">{{ s.device }}</div>
              <div class="table__colum">{{ s.label }}</div>
              <div class="table__colum">
                <div class="center">
                  <input
                    type="checkbox"
                    class="cdx"
                    :id="`${s.device}${i}`"
                    style="display: none"
                    :checked="!!s.value"
                  />
                  <label
                    class="toggle"
                    :for="`${s.device}${i}`"
                    @click.prevent.stop="setObin(s.device, s.index, s.value)">
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel__flex panel__flex_2 table">
        <div class="table__name">Аналоговые выходы</div>
        <div class="table__table table__table_1">
          <div class="table__top-row">
            <div class="table__colum table__colum_ri4">№ бл.</div>
            <div class="table__colum table__colum_ri3 table__colum_flex">
              №вых.
            </div>
            <div class="table__colum table__colum_right table__colum_ri2">
              Ввод %
            </div>
          </div>
          <div class="table__overflow1" id="table_dac">
            <div
              class="table__row table__row_padd"
              v-for="(s, i) in states.odac"
              :key="`${s.device}${i}`">
              <div class="table__colum">{{ s.device }}</div>
              <div class="table__colum">{{ s.label }}</div>
              <div class="table__colum table__colum_right">
                <div class="table__edit edit">
                  <input
                    class="edit__input"
                    type="text"
                    name="name"
                    v-model="s.value"
                    @focus="setActiveField(s.device, i, 'odac')"
                    @blur="resetActiveField"
                    @keypress.enter="changeValue(s.device, s.index, 'odac', $event)"
                  />
                  <div
                    class="edit__block"
                    @click="changeValue(s.device, s.index, 'odac', $event)"
                  >
                  <img src="@/assets/confirm.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel__flex panel__flex_2 table">
        <div class="table__name">ШИМ выходы</div>
        <div class="table__table table__table_4">
          <div class="table__top-row">
            <div class="table__colum table__colum_ri4">№ бл.</div>
            <div class="table__colum table__colum_ri3 table__colum_flex">
              №вых.
            </div>
            <div class="table__colum table__colum_right table__colum_ri2">
              Ввод %
            </div>
          </div>
          <div class="table__overflow1" id="table_dac">
            <div
              class="table__row table__row_padd"
              v-for="(s, i) in states.opwm"
              :key="`${s.device}${i}`">
              <div class="table__colum">{{ s.device }}</div>
              <div class="table__colum">{{ s.label }}</div>
              <div class="table__colum table__colum_right">
                <div class="table__edit edit">
                  <input
                    class="edit__input"
                    type="text"
                    name="name"
                    v-model="s.value"
                    @focus="setActiveField(s.device, i, 'opwm')"
                    @blur="resetActiveField"
                    @keypress.enter="changeValue(s.device, i, 'opwm', $event)"
                  />
                  <div
                    class="edit__block"
                    @click="changeValue(s.device, i, 'opwm', $event)"
                  >
                  <img src="@/assets/confirm.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel__table panel__table_2">
      <div class="panel__flex panel__flex_3 table">
        <div class="table__name">Устройства</div>
        <div class="table__table table__table_3">
          <div class="table__top-row">
            <div class="table__colum">№ бл.</div>
            <div class="table__colum table__colum_m1 table__colum_left">
              Наименование
            </div>
          </div>

          <div class="table__overflow1">
            <!-----
          <div class="table__row table__row_padd">
            <div class="table__colum">467</div>
            <div class="table__colum">
              <input type="text" name="name" class="table__input-opac" value="Ввод наименования">
            </div>
          </div>
        ----->
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

export default {
  data() {
    return {
      ext: process.env.VUE_APP_IS_TEST === '1' ? '.php' : '',
      devices: [],
      allStates: {},
      states: {},
      hasNoFloat,
      activeField: {},
      activeFieldTimeout: null,
      disabled: false,
    };
  },
  computed: {
    computedStates() {
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
  watch: {
    computedStates(computedStates) {
      const states = this.clone(computedStates);
      if ('device' in this.activeField) {
        const { device, type, index } = this.activeField;
        const index2 = states[type].findIndex((s) => s.device === device && s.index === index);
        states[type][index2].value = this.states[type][index2].value;
      }
      this.states = states;
    },
  },
  created() {
    const allStates = {};
    ['obin', 'opwm', 'odac'].forEach((p) => {
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
        $('.panel__table').removeClass('panel__table_active');
        $(`.panel__table_${id}`).addClass('panel__table_active');
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
              this.getDevList();
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
              Object.keys(labels).forEach((k) => {
                if (k === 'device') return;
                label[k] = labels[k];
              });
              const index = this.devices.findIndex((d) => d.addr === device.addr);
              this.$set(this.devices[index], 'label', label);
              this.$set(this.devices[index], 'wAddresses', addrs);
            });
        });
    },
    setActiveField(device, index, type) {
      if (this.activeFieldTimeout) clearTimeout(this.activeFieldTimeout);
      this.activeField = { device, index, type };
      this.activeFieldTimeout = setTimeout(() => {
        this.activeField = {};
      }, 20000);
    },
    resetActiveField() {
      if (this.activeFieldTimeout) clearTimeout(this.activeFieldTimeout);
      this.activeField = {};
    },
    changeValue(device, addr, type, e) {
      if (this.disabled) return;
      const output = this.states[type].find((s) => s.device === device && s.index === addr);
      const value = parseInt(output.value, 10);
      if (Number.isNaN(value)) {
        this.$toasted.error('Проверьте введенные данные', { duration: 3000 });
        return;
      }
      const params = {
        device,
        addr,
        value: value * 100,
      };
      this.disabled = true;
      axios.post(`/api/set_${type}${this.ext}`, params)
        .then(() => {
          this.$toasted.success('Данные успешно сохранены', { duration: 3000 });
        })
        .catch(() => {
          this.$toasted.error('Ошибка!', { duration: 3000 });
        })
        .finally(() => {
          this.disabled = false;
          e.target.blur();
        });
    },
    setObin(device, addr, value) {
      const params = {
        device,
        addr,
        value: +!value,
      };
      this.disabled = true;
      axios.post(`/api/set_obin${this.ext}`, params)
        .then(() => {
          this.$toasted.success('Данные успешно сохранены', { duration: 3000 });
          const index = this.states.obin.findIndex((o) => o.device === device && o.index === addr);
          this.$set(this.states.obin[index], 'value', +!value);
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
.toasted-container.top-right {
  top: 0 !important;
  max-width: 300px !important;
  @media (min-width: 600px) {
    right: 20px !important;
  }
}
</style>
