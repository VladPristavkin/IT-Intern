import React, { useState } from 'react';
import './TestAccessStep.css';

const TestAccessStep = ({ onSubmit, categories, initialValues }) => {
    const [settings, setSettings] = useState({
        startDate: initialValues?.startDate || '',
        endDate: initialValues?.endDate || '',
        category: initialValues?.category || '',
        subCategory: initialValues?.subCategory || ''
    });
    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(settings);
    };

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            // Add new category logic here
            setNewCategory('');
        }
    };

    const handleAddSubCategory = () => {
        if (newSubCategory.trim()) {
            // Add new subcategory logic here
            setNewSubCategory('');
        }
    };

    return (
        <div className="test-access-step">
            <form onSubmit={handleSubmit}>
                <div className="date-settings">
                    <div className="input-group">
                        <label>Дата начала:</label>
                        <input
                            type="datetime-local"
                            value={settings.startDate}
                            onChange={(e) => setSettings({ ...settings, startDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Дата окончания:</label>
                        <input
                            type="datetime-local"
                            value={settings.endDate}
                            onChange={(e) => setSettings({ ...settings, endDate: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="category-settings">
                    <div className="input-group">
                        <label>Категория:</label>
                        <select
                            value={settings.category}
                            onChange={(e) => setSettings({ ...settings, category: e.target.value })}
                            required
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="add-new">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Новая категория"
                            />
                            <button type="button" onClick={handleAddCategory}>+</button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Подкатегория:</label>
                        <select
                            value={settings.subCategory}
                            onChange={(e) => setSettings({ ...settings, subCategory: e.target.value })}
                            required
                        >
                            <option value="">Выберите подкатегорию</option>
                            {categories
                                .find(cat => cat.name === settings.category)?.subCategories
                                .map(sub => (
                                    <option key={sub.id} value={sub.name}>{sub.name}</option>
                                ))}
                        </select>
                        <div className="add-new">
                            <input
                                type="text"
                                value={newSubCategory}
                                onChange={(e) => setNewSubCategory(e.target.value)}
                                placeholder="Новая подкатегория"
                            />
                            <button type="button" onClick={handleAddSubCategory}>+</button>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="next-button"
                    disabled={!settings.startDate || !settings.endDate || !settings.category || !settings.subCategory}
                >
                    Настроить вопросы и ответы
                </button>
            </form>
        </div>
    );
};

export default TestAccessStep; 