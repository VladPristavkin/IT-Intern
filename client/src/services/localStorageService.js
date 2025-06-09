/**
 * Сервис для работы с localStorage
 */
class LocalStorageService {
  /**
   * Сохранить данные в localStorage
   * @param {string} key - Ключ для сохранения
   * @param {any} data - Данные для сохранения
   */
  static setItem(key, data) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Получить данные из localStorage
   * @param {string} key - Ключ для получения данных
   * @param {any} defaultValue - Значение по умолчанию, если данные не найдены
   * @returns {any} Данные из localStorage или значение по умолчанию
   */
  static getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  /**
   * Удалить данные из localStorage
   * @param {string} key - Ключ для удаления
   */
  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  /**
   * Очистить все данные из localStorage
   */
  static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Проверить наличие данных в localStorage
   * @param {string} key - Ключ для проверки
   * @returns {boolean} Существуют ли данные
   */
  static hasItem(key) {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Обновить существующие данные в localStorage
   * @param {string} key - Ключ для обновления
   * @param {Function} updateFn - Функция обновления, получает текущие данные и возвращает обновленные
   * @returns {any} Обновленные данные
   */
  static updateItem(key, updateFn) {
    try {
      const currentData = this.getItem(key);
      const updatedData = updateFn(currentData);
      this.setItem(key, updatedData);
      return updatedData;
    } catch (error) {
      console.error('Error updating localStorage:', error);
      return null;
    }
  }
}

// Константы для ключей localStorage
export const STORAGE_KEYS = {
  USER_DATA: 'userData',
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  TEACHER_APPLICATIONS: 'teacherApplications',
  REGISTERED_STUDENTS: 'registeredStudents',
  TESTS: 'tests',
  TEST_RESULTS: 'testResults'
};

export default LocalStorageService; 