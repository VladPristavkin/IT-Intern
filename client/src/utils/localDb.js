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
                savedVacancies: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            users.data.push(adminUser);
            users.lastId = Math.max(users.lastId, 1);
            hasChanges = true;
        }

        // Создаем преподавателя из mockTeacher если его нет
        const teacherExists = users.data.some(user => user.userId === 'teacher_default_id');
        if (!teacherExists) {
            const teacherUser = {
                userId: "teacher_default_id",
                username: 'teacher',
                email: 'teacher@example.com',
                password: 'Teacher123',
                name: 'Сергиенко Ольга Валерьевна',
                position: 'Старший преподаватель',
                department: 'ПОИТ',
                role: 'teacher',
                isAdmin: false,
                createdTests: [1, 2, 3],
                savedVacancies: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            users.data.push(teacherUser);
            users.lastId = Math.max(users.lastId, 3);
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
                savedVacancies: [],
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

        // Initialize empty tests if they don't exist
        const tests = this.getCollection('testTemplates');
        if (!tests.data.length) {
            // Create 20 empty tests from Кутузов
            const currentDate = new Date();
            for (let i = 1; i <= 20; i++) {
                const testTemplate = {
                    id: uuidv4(),
                    title: `Тест ${i}`,
                    description: `Пустой тест ${i} от Кутузова В.В.`,
                    categoryId: categoryIds[0], // Using "Программирование" category by default
                    subCategoryId: null,
                    startDate: currentDate.toISOString(),
                    endDate: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 days
                    timeLimit: 60, // 60 minutes by default
                    questions: [],
                    teacherId: 'admin_default_id', // Кутузов's ID
                    teacherName: 'Кутузов Виктор Владимирович',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    deletedAt: null,
                    isDeleted: false
                };
                
                tests.data.push(testTemplate);
            }
            
            tests.lastId = 20;
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
    update(collectionName, id, document) {
        try {
            // Проверяем входные параметры
            if (!collectionName || typeof collectionName !== 'string') {
                console.error('Valid collection name is required');
                return null;
            }
            
            if (!id) {
                console.error('ID is required for document update');
                return null;
            }
            
            if (!document || typeof document !== 'object' || Array.isArray(document)) {
                console.error('Valid document object is required');
                return null;
            }
    
            const collection = this.getCollection(collectionName);
    
            // Проверяем существование коллекции
            if (!collection || !collection.data || !Array.isArray(collection.data)) {
                console.error(`Collection '${collectionName}' not found or invalid`);
                return null;
            }
    
            let index = -1;
    
            // Находим индекс документа для обновления
            if (collectionName === 'users') {
                index = collection.data.findIndex(doc => doc && doc.userId === id);
            } else {
                index = collection.data.findIndex(doc => doc && doc.id === id);
            }
    
            console.log(`Searching for document with ID: ${id} in collection: ${collectionName}`);
            console.log('Found document at index:', index);
    
            if (index !== -1) {
                // Сохраняем оригинальные данные
                const existingDocument = collection.data[index];
                const originalCreatedAt = existingDocument.createdAt;
                
                // Определяем оригинальный ID
                const originalId = collectionName === 'users' ? existingDocument.userId : existingDocument.id;
    
                // Создаем обновленный документ
                const updatedDocument = {
                    ...existingDocument,  // Сохраняем все существующие поля
                    ...document,          // Применяем обновления
                    createdAt: originalCreatedAt || new Date().toISOString(), // Сохраняем или создаем дату создания
                    updatedAt: new Date().toISOString()
                };
    
                // Убеждаемся, что ID не изменился
                if (collectionName === 'users') {
                    updatedDocument.userId = originalId;
                } else {
                    updatedDocument.id = originalId;
                }
    
                // Обновляем документ в коллекции
                collection.data[index] = updatedDocument;
    
                // Сохраняем изменения
                if (typeof this.saveToStorage === 'function') {
                    this.saveToStorage();
                } else {
                    console.warn('saveToStorage method not found');
                }
    
                console.log('Document updated successfully:', {
                    collection: collectionName,
                    id: originalId,
                    updatedFields: Object.keys(document)
                });
                
                return updatedDocument;
            } else {
                console.warn(`Document with ID '${id}' not found in collection '${collectionName}'`);
                console.log('Available documents:', collection.data.map(doc => ({
                    id: collectionName === 'users' ? doc.userId : doc.id,
                    preview: Object.keys(doc).slice(0, 3)
                })));
                return null;
            }
        } catch (error) {
            console.error('Error updating document:', {
                error: error.message,
                collection: collectionName,
                id: id,
                stack: error.stack
            });
            return null;
        }
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