import { v4 as uuidv4 } from 'uuid';

class LocalDB {
    constructor() {
        this.collections = {};
        this.loadFromStorage();
        this.initializeDefaultData();
    }
    
    // Инициализация базовых данных
    initializeDefaultData() {
        const users = this.getCollection('users');
        const categories = this.getCollection('categories');
        const subcategories = this.getCollection('subcategories');
        const waysOfLearning = this.getCollection('waysOfLearning');
        
        let hasChanges = false;
        
        // Initialize ways of learning if empty
        if (!waysOfLearning.data.length) {
            const defaultWays = [
                { id: uuidv4(), name: 'Лекции' },
                { id: uuidv4(), name: 'Практические занятия' },
                { id: uuidv4(), name: 'Лабораторные работы' },
                { id: uuidv4(), name: 'Самостоятельное обучение' }
            ];

            defaultWays.forEach(way => {
                waysOfLearning.data.push({
                    ...way,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            });

            waysOfLearning.lastId = defaultWays.length;
            hasChanges = true;
        }
        
        // Создаем ID для категорий только если они не существуют
        let categoryIds = [];
        if (!categories.data.length) {
            categoryIds = [uuidv4(), uuidv4(), uuidv4()];
        } else {
            // Используем существующие ID категорий
            categoryIds = categories.data.map(cat => cat.id);
        }
        
        const CATEGORIES = [
            { id: categoryIds[0], name: 'Программирование' },
            { id: categoryIds[1], name: 'Базы данных' },
            { id: categoryIds[2], name: 'Web-разработка' }
        ];
        
        const SUBCATEGORIES = {
            [categoryIds[0]]: [
                { name: 'Java' },
                { name: 'Python' },
                { name: 'JavaScript' }
            ],
            [categoryIds[1]]: [
                { name: 'SQL' },
                { name: 'NoSQL' },
                { name: 'ORM' }
            ],
            [categoryIds[2]]: [
                { name: 'Frontend' },
                { name: 'Backend' },
                { name: 'Full-stack' }
            ]
        };
        
        // Проверяем существование пользователей более точно
        const adminExists = users.data.some(user => user.userId === 'admin_default_id');
        const studentExists = users.data.some(user => user.userId === 'student_default_id');
        
        // Создаем админа только если его точно нет
        if (!adminExists) {
            const adminUser = {
                userId: "admin_default_id",
                username: 'admin',
                email: 'admin@example.com',
                password: 'Admin123',
                name: 'Кутузов Виктор Владимирович',
                department: 'ПОИТ',
                role: 'teacher',
                isAdmin: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            users.data.push(adminUser);
            users.lastId = Math.max(users.lastId, 1);
            hasChanges = true;
        }

        // Создаем студента только если его точно нет
        if (!studentExists) {
            const studentUser = {
                userId: "student_default_id",
                username: 'student',
                email: 'student@example.com',
                password: 'Student123',
                name: 'Приставкин Владислав Александрович',
                speciality: 'ПОИТ-211',
                role: 'student',
                isAdmin: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            users.data.push(studentUser);
            users.lastId = Math.max(users.lastId, 2);
            hasChanges = true;
        }

        // Создаем категории только если их нет
        if (!categories.data.length) {
            CATEGORIES.forEach(category => {
                categories.data.push({
                    id: category.id, 
                    name: category.name,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            });
            
            categories.lastId = CATEGORIES.length;
            hasChanges = true;
        }
        
        // Создаем подкатегории только если их нет, с проверкой дубликатов
        if (!subcategories.data.length) {
            Object.entries(SUBCATEGORIES).forEach(([categoryId, subcats]) => {
                subcats.forEach(subcat => {
                    // Проверяем, нет ли уже такой подкатегории в этой категории
                    const exists = subcategories.data.some(existing => 
                        existing.name === subcat.name && existing.categoryId === categoryId
                    );
                    
                    if (!exists) {
                        subcategories.data.push({
                            id: uuidv4(),
                            name: subcat.name,
                            categoryId,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        });
                    }
                });
            });
            
            subcategories.lastId = subcategories.data.length;
            hasChanges = true;
        }
        
        // Сохраняем только если были изменения
        if (hasChanges) {
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
        }
        return this.collections[name];
    }
    
    // Получить коллекцию
    getCollection(name) {
        return this.collections[name] || this.createCollection(name);
    }
    
    // Добавить документ в коллекцию с проверкой дубликатов
    insert(collectionName, document) {
        const collection = this.getCollection(collectionName);
        
        // Проверка на дубликаты для пользователей
        if (collectionName === 'users') {
            const existingUser = collection.data.find(doc => 
                doc.userId === document.userId || 
                doc.username === document.username || 
                doc.email === document.email
            );
            if (existingUser) {
                throw new Error('Пользователь с таким ID, именем или email уже существует');
            }
        }
        
        // Проверка на дубликаты для других коллекций по ID
        if (document.id && collection.data.find(doc => doc.id === document.id)) {
            throw new Error(`Документ с ID ${document.id} уже существует в коллекции ${collectionName}`);
        }
        
        // Генерируем ID если его нет
        if (!document.id && collectionName !== 'users') {
            document.id = uuidv4();
        }
        
        collection.lastId++;
        
        const newDocument = {
            ...document,
            createdAt: document.createdAt || new Date().toISOString(),
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
        return collection.data.find(doc => doc.id === id);
    }

    getUserById(id) {
        const collection = this.getCollection('users');
        return collection.data.find(doc => doc.userId === id);
    }
    
    // Обновить документ
    update(collectionName, document) {
        const collection = this.getCollection(collectionName);
        let index;
        
        if (collectionName === 'users') {
            index = collection.data.findIndex(doc => doc.userId === document.userId);
        } else {
            index = collection.data.findIndex(doc => doc.id === document.id);
        }
        
        if (index !== -1) {
            // Сохраняем оригинальные даты создания
            const originalCreatedAt = collection.data[index].createdAt;
            
            collection.data[index] = {
                ...collection.data[index],
                ...document,
                createdAt: originalCreatedAt, // Сохраняем оригинальную дату создания
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
        
        if (collectionName === 'users') {
            collection.data = collection.data.filter(doc => doc.userId !== id);
        } else {
            collection.data = collection.data.filter(doc => doc.id !== id);
        }
        
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
    
    // Метод для удаления дубликатов (утилита)
    removeDuplicates(collectionName, keyField = 'id') {
        const collection = this.getCollection(collectionName);
        const seen = new Set();
        const uniqueData = [];
        
        collection.data.forEach(item => {
            const key = collectionName === 'users' ? item.userId : item[keyField];
            if (!seen.has(key)) {
                seen.add(key);
                uniqueData.push(item);
            }
        });
        
        collection.data = uniqueData;
        this.saveToStorage();
        
        return collection.data.length;
    }
}

// Инициализация базы данных
const db = new LocalDB();

export default db;