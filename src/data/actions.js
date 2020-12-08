export default [
  {
    objectTypes: ['opwm', 'odac', 'var'],
    canBeCopied: ['obin', 'orly', 'obtn', 'ibin', 'ibtn', 'ikey', 'iadc', 'itmp', 'opwm', 'odac', 'var'],
    acts: [
      {
        value: 'set',
        label: 'Установить',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
        ],
      },
      {
        value: 'inv',
        label: 'Инвертировать',
        params: [
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
        ],
      },
      {
        value: 'mod',
        label: 'Изменить',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
        ],
      },
      {
        value: 'change',
        label: 'Плавно изменить',
        params: [
          {
            value: 'value',
            label: 'Значение',
          },
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
        ],
      },
      {
        value: 'copy',
        label: 'Копировать',
        params: [
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
          {
            value: 'source',
            label: 'Объект',
          },
        ],
      },
      {
        value: 'icopy',
        label: 'Копировать с инверсией',
        params: [
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
          {
            value: 'source',
            label: 'Объект',
          },
        ],
      },
    ],
  },
  {
    objectTypes: ['obin', 'orly', 'obtn'],
    canBeCopied: ['obin', 'orly', 'obtn', 'ibin', 'ibtn', 'ikey', 'var'],
    acts: [
      {
        value: 'set',
        label: 'Активировать',
        params: [
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
        ],
      },
      {
        value: 'reset',
        label: 'Деактивировать',
        params: [
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
        ],
      },
      {
        value: 'inv',
        label: 'Инвертировать',
        params: [
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
        ],
      },
      {
        value: 'copy',
        label: 'Копировать',
        params: [
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
          {
            value: 'source',
            label: 'Объект',
          },
        ],
      },
      {
        value: 'icopy',
        label: 'Копировать с инверсией',
        params: [
          {
            value: 'delay',
            label: 'Задержка',
          },
          {
            value: 'time',
            label: 'Время',
          },
          {
            value: 'source',
            label: 'Объект',
          },
        ],
      },
    ],
  },
];
