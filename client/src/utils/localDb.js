        class LocalDB {
            constructor() {
                this.collections = {};
                this.loadFromStorage();
                this.initializeDefaultData();
            }
            
            // Инициализация базовых данных
            initializeDefaultData() {
                const users = this.getCollection('users');
                
                // Проверяем, есть ли уже админ в системе
                const adminExists = users.data.some(user => user.role === 'admin' && user.userId ==='admin_default_id');
                
                // Если админа нет, создаем его
                if (!users.data.length || adminExists.adminExists) {
                    const adminUser = {
                        id: 1,
                        userId: "admin_default_id", // Фиксированный userId для админа
                        username: 'admin',
                        email: 'admin@example.com',
                        password: 'Admin123',
                        name: 'Кутузов Виктор Владимирович',
                        role: 'teacher',
                        speciality: 'ADMIN',
                        year: '2025',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    
                    // Добавляем админа в коллекцию, минуя стандартный insert для сохранения userId
                    users.data.push(adminUser);
                    // Устанавливаем lastId коллекции
                    users.lastId = 1;
                    this.saveToStorage();
                }
            }
            
            // Создать коллекцию
            createCollection(name) {
                if (!this.collections[name]) {
                    this.collections[name] = {
                        data: [],
                        lastId: 0
                    };
                    this.saveToStorage();
                }
                return this.collections[name];
            }
            
            // Получить коллекцию
            getCollection(name) {
                return this.collections[name] || this.createCollection(name);
            }
            
            // Добавить документ в коллекцию
            insert(collectionName, document) {
                const collection = this.getCollection(collectionName);
                collection.lastId++;
                
                const newDocument = {
                    id: collection.lastId,
                    ...document,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                
                collection.data.push(newDocument);
                this.saveToStorage();
                return newDocument;
            }
            
            // Получить все документы из коллекции
            getAll(collectionName) {
                const collection = this.getCollection(collectionName);
                return [...collection.data];
            }
            
            // Получить документ по ID
            getById(collectionName, id) {
                const collection = this.getCollection(collectionName);
                return collection.data.find(doc => doc.id === parseInt(id));
            }
            
            // Обновить документ
            update(collectionName, id, updates) {
                const collection = this.getCollection(collectionName);
                const index = collection.data.findIndex(doc => doc.id === parseInt(id));
                
                if (index !== -1) {
                    collection.data[index] = {
                        ...collection.data[index],
                        ...updates,
                        updatedAt: new Date().toISOString()
                    };
                    this.saveToStorage();
                    return collection.data[index];
                }
                return null;
            }
            
            // Удалить документ
            delete(collectionName, id) {
                const collection = this.getCollection(collectionName);
                const initialLength = collection.data.length;
                collection.data = collection.data.filter(doc => doc.id !== parseInt(id));
                
                if (collection.data.length < initialLength) {
                    this.saveToStorage();
                    return true;
                }
                return false;
            }
            
            // Поиск документов по условию
            find(collectionName, condition) {
                const collection = this.getCollection(collectionName);
                return collection.data.filter(condition);
            }
            
            // Подсчет документов
            count(collectionName) {
                const collection = this.getCollection(collectionName);
                return collection.data.length;
            }
            
            // Сохранить в localStorage
            saveToStorage() {
                try {
                    localStorage.setItem('localDB', JSON.stringify(this.collections));
                } catch (error) {
                    console.error('Ошибка сохранения в localStorage:', error);
                }
            }
            
            // Загрузить из localStorage
            loadFromStorage() {
                try {
                    const stored = localStorage.getItem('localDB');
                    if (stored) {
                        this.collections = JSON.parse(stored);
                    }
                } catch (error) {
                    console.error('Ошибка загрузки из localStorage:', error);
                    this.collections = {};
                }
            }
            
            // Очистить всю базу данных
            clear() {
                this.collections = {};
                localStorage.removeItem('localDB');
                // После очистки пересоздаем базовые данные
                this.initializeDefaultData();
            }
            
            // Экспорт данных
            export() {
                return JSON.stringify(this.collections, null, 2);
            }
            
        }
        
        // Инициализация базы данных
        const db = new LocalDB();
        
    export default db;