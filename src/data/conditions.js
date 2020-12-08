export default [
  {
    objectTypes: ['ibin', 'ibtn', 'obin', 'orly', 'obtn', 'ikey'],
    conds: [
      {
        value: '1',
        label: 'Активен',
      },
      {
        value: '0',
        label: 'Неактивен',
      },
    ],
  },
  {
    objectTypes: ['iadc', 'opwm', 'odac', 'itmp', 'var'],
    conds: [
      {
        value: '>',
        label: 'Больше',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
        ],
      },
      {
        value: '<',
        label: 'Меньше',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
        ],
      },
      {
        value: '>=',
        label: 'Больше или равно',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
        ],
      },
      {
        value: '<=',
        label: 'Меньше или равно',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
        ],
      },
      {
        value: '==',
        label: 'Равно',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
        ],
      },
      {
        value: '!=',
        label: 'Не равно',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
        ],
      },
      {
        value: '><',
        label: 'В диапазоне',
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
        label: 'Вне диапазона',
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
    ],
  },
  {
    objectTypes: ['time'],
    conds: [
      {
        value: '><',
        label: 'В интервале',
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
        label: 'Вне интервала',
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
