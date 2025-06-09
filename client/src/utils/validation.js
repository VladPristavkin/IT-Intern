// Регулярные выражения для валидации
const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
  PHONE: /^\+?[1-9]\d{10,14}$/,
  FULL_NAME: /^[А-ЯЁа-яё\s-]{2,50}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  YEAR: /^(19|20)\d{2}$/
};

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  REQUIRED: 'Это поле обязательно для заполнения',
  EMAIL: 'Введите корректный email адрес',
  PASSWORD: 'Пароль должен содержать минимум 8 символов, включая буквы и цифры',
  PASSWORD_MATCH: 'Пароли не совпадают',
  PHONE: 'Введите корректный номер телефона',
  FULL_NAME: 'Введите корректное ФИО (только русские буквы, пробелы и дефис)',
  USERNAME: 'Никнейм должен содержать от 3 до 20 символов (буквы, цифры, _ и -)',
  YEAR: 'Введите корректный год поступления',
  SPECIALIZATION: 'Выберите вашу специальность'
};

// Функции валидации
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return ERROR_MESSAGES.REQUIRED;
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    return PATTERNS.EMAIL.test(value) ? null : ERROR_MESSAGES.EMAIL;
  },

  password: (value) => {
    if (!value) return null;
    return PATTERNS.PASSWORD.test(value) ? null : ERROR_MESSAGES.PASSWORD;
  },

  passwordMatch: (value, compareValue) => {
    if (!value || !compareValue) return null;
    return value === compareValue ? null : ERROR_MESSAGES.PASSWORD_MATCH;
  },

  phone: (value) => {
    if (!value) return null;
    return PATTERNS.PHONE.test(value) ? null : ERROR_MESSAGES.PHONE;
  },

  fullName: (value) => {
    if (!value) return null;
    return PATTERNS.FULL_NAME.test(value) ? null : ERROR_MESSAGES.FULL_NAME;
  },

  username: (value) => {
    if (!value) return null;
    return PATTERNS.USERNAME.test(value) ? null : ERROR_MESSAGES.USERNAME;
  },

  year: (value) => {
    if (!value) return null;
    if (!PATTERNS.YEAR.test(value)) return ERROR_MESSAGES.YEAR;
    
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    return year <= currentYear ? null : ERROR_MESSAGES.YEAR;
  },

  specialization: (value) => {
    if (!value) return null;
    const validSpecializations = ['ПИР', 'АСОИР'];
    return validSpecializations.includes(value.toUpperCase()) ? null : ERROR_MESSAGES.SPECIALIZATION;
  }
};

// Функция для валидации всей формы
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const fieldRules = validationRules[field];
    const value = formData[field];

    for (const rule of fieldRules) {
      const error = rule(value, formData);
      if (error) {
        errors[field] = error;
        isValid = false;
        break;
      }
    }
  });

  return { isValid, errors };
}; 