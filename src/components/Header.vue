<template>
  <header class="header">
    <div class="header__left">
      <div class="header__date-time">
        <div class="header__time">
          <div class="header__border-numb" id="hour_div">
            {{ hours }}
          </div>
          <div class="header__second">:</div>
          <div class="header__border-numb" id="minute_div">{{ minutes }}</div>
        </div>

        <div class="header__date-bl">
          <div class="header__date header__date_weekday" id="day_name">{{ day }}</div>
          <div class="header__date " id="date_day_month">{{ date }}</div>
        </div>
      </div>

      <div class="header__controller">
        <div id="controller_id">ID контроллера: {{ id }}</div>
        <div class="header__vercion" id="firmware_version">Версия прошивки: v {{ ver }}</div>
      </div>
    </div>
    <div class="header__right">
    </div>
  </header>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      id: null,
      name: null,
      time: null,
      hours: null,
      minutes: null,
      day: null,
      date: null,
      ver: null,
      moment,
    };
  },
  created() {
    this.moment.locale('ru');
    axios.post('/api/info.php')
      .then((r) => {
        this.id = r.data.id;
        this.name = r.data.name;
        const t = r.data.time;
        const formattedTime = `${t.year}-${t.mon}-${t.day} ${t.hour}:${t.min}`;
        const parsed = this.moment(formattedTime, 'YYYY-M-D H:m');
        // console.log(parsed);
        this.hours = parsed.format('HH');
        this.minutes = parsed.format('mm');
        const day = parsed.format('dddd');
        this.day = `${day.slice(0, 1).toUpperCase()}${day.slice(1)}`;
        const date = parsed.format('DD MMMM').split(' ');
        this.date = `${date[0]} ${date[1].slice(0, 1).toUpperCase()}${date[1].slice(1)}`;
        // this.date = date;
        this.ver = r.data.ver;
      });
  },
};
</script>
