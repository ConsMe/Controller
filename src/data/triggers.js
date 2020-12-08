export default [
  {
    objectTypes: ['ibin', 'ibtn', 'obin', 'orly', 'obtn', 'ikey'],
    events: [
      {
        value: '>',
        label: 'По переднему фронту',
      },
      {
        value: '<',
        label: 'По заднему фронту',
      },
    ],
  },
  {
    objectTypes: ['iadc', 'opwm', 'odac', 'itmp', 'var'],
    events: [
      {
        value: '>',
        label: 'Превышение порога',
        params: [
          {
            value: 'value',
            label: 'Порог',
          },
        ],
      },
      {
        value: '<',
        label: 'Падение ниже порога',
        params: [
          {
            value: 'value',
            label: 'Порог',
          },
        ],
      },
      {
        value: '><',
        label: 'Вход в диапазон',
        params: [
          {
            value: 'min',
            label: 'Нижняя граница',
          },
          {
            value: 'max',
            label: 'Верхняя граница',
          },
        ],
      },
      {
        value: '<>',
        label: 'Выход из диапазона',
        params: [
          {
            value: 'min',
            label: 'Нижняя граница',
          },
          {
            value: 'max',
            label: 'Верхняя граница',
          },
        ],
      },
      {
        value: '==',
        label: 'По достижении значения',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
        ],
      },
      {
        value: '+-',
        label: 'Любое изменение',
      },
      {
        value: '--',
        label: 'Сохранение значения',
      },
    ],
  },
  {
    objectTypes: ['time'],
    events: [
      {
        value: 'at',
        label: 'В заданное время',
        params: [
          {
            value: 'time',
            label: 'Время',
          },
          {
            value: 'date',
            label: 'Дата',
          },
          {
            value: 'tmsk',
            label: 'Время, маска',
          },
          {
            value: 'dmsk',
            label: 'Дата, маска',
          },
        ],
      },
      {
        value: '><',
        label: 'Вход в интервал',
        params: [
          {
            value: 'time',
            label: 'Время от',
          },
          {
            value: 'date',
            label: 'Дата от',
          },
          {
            value: 'tmsk',
            label: 'Время от, маска',
          },
          {
            value: 'dmsk',
            label: 'Дата от, маска',
          },
          {
            value: 'time2',
            label: 'Время до',
          },
          {
            value: 'date2',
            label: 'Дата до',
          },
        ],
      },
      {
        value: '<>',
        label: 'Выход из интервала',
        params: [
          {
            value: 'time',
            label: 'Время от',
          },
          {
            value: 'date',
            label: 'Дата от',
          },
          {
            value: 'tmsk',
            label: 'Время от, маска',
          },
          {
            value: 'dmsk',
            label: 'Дата от, маска',
          },
          {
            value: 'time2',
            label: 'Время до',
          },
          {
            value: 'date2',
            label: 'Дата до',
          },
        ],
      },
    ],
  },
];
