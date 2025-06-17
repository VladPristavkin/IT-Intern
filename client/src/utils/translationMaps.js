export const translationMaps = {
  experiences: {
    '0': 'Нет опыта',
    '1': 'от 1 года до 3 лет',
    '2': 'от 3 до 6 лет',
    '3': 'более 6 лет'
  },
  employments: {
    '0': 'Полная',
    '1': 'Частичная',
    '2': 'Стажировка',
    '3': 'Проектная'
  },
  schedules: {
    '0': 'Полный день',
    '1': 'Сменный график',
    '2': 'Гибкий график',
    '3': 'Удалённая работа'
  }
};

export const getTranslatedValue = (type, value) => {
  if (typeof value === 'object' && value !== null) {
    return value.name || 'Не указано';
  }
  return translationMaps[type]?.[value] || 'Не указано';
}; 